import { useMemo, useState } from 'react';
import { PRICING, DAY_HIRE_PACKAGES, type DayHirePackageId } from '../config/pricing';
import {
  buildWhatsAppUrl,
  buildQuoteMessage,
  buildStaffTransportMessage,
  formatRange,
} from '../lib/whatsapp';

type TabId = 'airport' | 'private' | 'dayhire' | 'staff' | 'liftclub';

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'airport', label: 'Airport Transfer' },
  { id: 'private', label: 'Private Trip' },
  { id: 'dayhire', label: 'Day Hire' },
  { id: 'staff', label: 'Staff Transport' },
  { id: 'liftclub', label: 'Lift Club' },
];

type Range = { low: number; high: number };

function withRangeMargin(estimate: number): Range {
  const m = PRICING.rangeMargin;
  return { low: estimate * (1 - m), high: estimate * (1 + m) };
}

/** Best-effort lead capture to Netlify Forms. Never blocks WhatsApp. */
function captureLead(formName: string, data: Record<string, string>) {
  try {
    const body = new URLSearchParams({ 'form-name': formName, ...data }).toString();
    const utm =
      (typeof window !== 'undefined' && (window as any).__riseedgeUTM) || {};
    const merged = new URLSearchParams(body);
    merged.set('utm_source', utm.utm_source || '');
    merged.set('utm_medium', utm.utm_medium || '');
    merged.set('utm_campaign', utm.utm_campaign || '');
    merged.set('source_page', utm.source_page || '/quote');
    void fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: merged.toString(),
    }).catch(() => {});
  } catch {
    /* lead capture must never block conversion */
  }
}

// ---------- small presentational helpers ----------

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? 'sm:col-span-2' : ''}`}>
      <span className="t-small text-silver">{label}</span>
      {children}
    </label>
  );
}

const inputCls = 'ff-input';

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-lg border border-bordergrey bg-white px-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-[#2b83ff]"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}

export default function QuoteCalculator() {
  const [tab, setTab] = useState<TabId>('airport');

  // shared
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // airport
  const [aPickup, setAPickup] = useState('');
  const [aDropoff, setADropoff] = useState('');
  const [aDirection, setADirection] = useState('To airport');
  const [aPassengers, setAPassengers] = useState('');
  const [aLuggage, setALuggage] = useState('');
  const [aKm, setAKm] = useState('');
  const [aWaiting, setAWaiting] = useState('');
  const [aDate, setADate] = useState('');
  const [aTime, setATime] = useState('');

  // private
  const [pPickup, setPPickup] = useState('');
  const [pDropoff, setPDropoff] = useState('');
  const [pKm, setPKm] = useState('');
  const [pPassengers, setPPassengers] = useState('');
  const [pDate, setPDate] = useState('');
  const [pTime, setPTime] = useState('');
  const [pReturn, setPReturn] = useState(false);
  const [pAfterHours, setPAfterHours] = useState(false);
  const [pWeekend, setPWeekend] = useState(false);
  const [pStops, setPStops] = useState('');

  // day hire
  const [dPackage, setDPackage] = useState<DayHirePackageId>('full');
  const [dDate, setDDate] = useState('');
  const [dPassengers, setDPassengers] = useState('');
  const [dPickup, setDPickup] = useState('');
  const [dNotes, setDNotes] = useState('');

  // staff
  const [sCompany, setSCompany] = useState('');
  const [sPickup, setSPickup] = useState('');
  const [sDest, setSDest] = useState('');
  const [sPassengers, setSPassengers] = useState('');
  const [sDays, setSDays] = useState('');
  const [sKm, setSKm] = useState('');
  const [sShift, setSShift] = useState('');

  // lift club
  const [lRoute, setLRoute] = useState('');
  const [lWork, setLWork] = useState('');
  const [lTimes, setLTimes] = useState('');
  const [lPassengers, setLPassengers] = useState('');

  // ---------- estimates ----------

  const airportRange: Range | null = useMemo(() => {
    const km = parseFloat(aKm);
    if (!km || km <= 0) return null;
    let est = Math.max(km * PRICING.perKm, PRICING.minFare);
    const lug = parseInt(aLuggage || '0', 10);
    if (lug > 0) est += PRICING.airportExtraLuggageFee;
    const waitMin = parseInt(aWaiting || '0', 10);
    if (waitMin > 0) est += Math.ceil(waitMin / 30) * PRICING.airportWaitingFeePer30;
    return withRangeMargin(est);
  }, [aKm, aLuggage, aWaiting]);

  const privateRange: Range | null = useMemo(() => {
    const km = parseFloat(pKm);
    if (!km || km <= 0) return null;
    const stops = parseInt(pStops || '0', 10);
    let est = PRICING.privateBaseFee + km * PRICING.perKm + stops * PRICING.extraStopFee;
    if (pAfterHours) est *= 1 + PRICING.afterHoursSurcharge;
    if (pWeekend) est *= 1 + PRICING.weekendSurcharge;
    if (pReturn) est *= 1 - PRICING.returnTripDiscount;
    est = Math.max(est, PRICING.minFare);
    return withRangeMargin(est);
  }, [pKm, pStops, pAfterHours, pWeekend, pReturn]);

  const dayHire = useMemo(
    () => DAY_HIRE_PACKAGES.find((p) => p.id === dPackage)!,
    [dPackage]
  );
  const dayHireRange: Range = { low: dayHire.low, high: dayHire.high };

  const staffRange: Range | null = useMemo(() => {
    const km = parseFloat(sKm);
    const days = parseFloat(sDays);
    if (!km || km <= 0 || !days || days <= 0) return null;
    const raw = km * 2 * days * PRICING.perKm;
    const withMargin = raw * (1 + PRICING.staffMargin);
    return withRangeMargin(withMargin);
  }, [sKm, sDays]);

  // ---------- WhatsApp links ----------

  const airportHref = useMemo(() => {
    const msg = buildQuoteMessage({
      service: `Airport Transfer (${aDirection})`,
      name,
      phone,
      pickup: aPickup,
      dropoff: aDropoff,
      date: aDate,
      time: aTime,
      passengers: aPassengers,
      estimatedRange: airportRange
        ? formatRange(airportRange.low, airportRange.high)
        : 'To confirm on WhatsApp',
      notes: [
        aLuggage ? `Luggage: ${aLuggage}` : '',
        aWaiting ? `Waiting: ${aWaiting} min` : '',
        aKm ? `Approx km: ${aKm}` : 'No km supplied — please confirm final price',
      ]
        .filter(Boolean)
        .join(' · '),
    });
    return buildWhatsAppUrl(msg);
  }, [aDirection, name, phone, aPickup, aDropoff, aDate, aTime, aPassengers, airportRange, aLuggage, aWaiting, aKm]);

  const privateHref = useMemo(() => {
    const msg = buildQuoteMessage({
      service: 'Private Trip',
      name,
      phone,
      pickup: pPickup,
      dropoff: pDropoff,
      date: pDate,
      time: pTime,
      passengers: pPassengers,
      estimatedRange: privateRange
        ? formatRange(privateRange.low, privateRange.high)
        : 'To confirm on WhatsApp',
      notes: [
        pKm ? `Approx km: ${pKm}` : '',
        pStops ? `Extra stops: ${pStops}` : '',
        pReturn ? 'Return trip' : '',
        pAfterHours ? 'After-hours' : '',
        pWeekend ? 'Weekend' : '',
      ]
        .filter(Boolean)
        .join(' · '),
    });
    return buildWhatsAppUrl(msg);
  }, [name, phone, pPickup, pDropoff, pDate, pTime, pPassengers, privateRange, pKm, pStops, pReturn, pAfterHours, pWeekend]);

  const dayHireHref = useMemo(() => {
    const msg = buildQuoteMessage({
      service: `Day Hire — ${dayHire.name} (${dayHire.hours}h, ${dayHire.kmIncluded}km incl.)`,
      name,
      phone,
      pickup: dPickup,
      date: dDate,
      passengers: dPassengers,
      estimatedRange: formatRange(dayHire.low, dayHire.high),
      notes: dNotes,
    });
    return buildWhatsAppUrl(msg);
  }, [dayHire, name, phone, dPickup, dDate, dPassengers, dNotes]);

  const staffHref = useMemo(() => {
    const msg = buildStaffTransportMessage({
      company: sCompany || name,
      phone,
      pickupArea: sPickup,
      destination: sDest,
      passengers: sPassengers,
      daysPerMonth: sDays,
      oneWayKm: sKm,
      shiftTime: sShift,
      estimatedRange: staffRange
        ? `${formatRange(staffRange.low, staffRange.high)} / month`
        : 'To confirm after route assessment',
    });
    return buildWhatsAppUrl(msg);
  }, [sCompany, name, phone, sPickup, sDest, sPassengers, sDays, sKm, sShift, staffRange]);

  const liftClubHref = useMemo(() => {
    const msg = buildQuoteMessage({
      service: 'Lift Club',
      name,
      phone,
      pickup: lRoute,
      dropoff: lWork,
      time: lTimes,
      passengers: lPassengers,
      estimatedRange: 'Availability to confirm on WhatsApp',
    });
    return buildWhatsAppUrl(msg);
  }, [name, phone, lRoute, lWork, lTimes, lPassengers]);

  // ---------- lead capture on WhatsApp click ----------

  function onConvert(service: string, range: Range | null, extra: Record<string, string>) {
    captureLead('quote-lead', {
      name,
      phone,
      service_type: service,
      quote_low: range ? String(Math.round(range.low)) : '',
      quote_high: range ? String(Math.round(range.high)) : '',
      ...extra,
    });
  }

  // ---------- shared name/phone block ----------
  const ContactBlock = (
    <>
      <Field label="Name">
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
      </Field>
      <Field label="Phone / WhatsApp">
        <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="081 234 5678" inputMode="tel" autoComplete="tel" />
      </Field>
    </>
  );

  return (
    <div className="card p-5 sm:p-7">
      {/* Tabs */}
      <div role="tablist" aria-label="Quote types" className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-[44px] rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
              tab === t.id
                ? 'bg-electric text-white'
                : 'border border-bordergrey text-silver hover:text-graphite'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* ---------------- AIRPORT ---------------- */}
        {tab === 'airport' && (
          <>
            {ContactBlock}
            <Field label="Direction">
              <select className={inputCls} value={aDirection} onChange={(e) => setADirection(e.target.value)}>
                <option>To airport</option>
                <option>From airport</option>
              </select>
            </Field>
            <Field label="Passengers">
              <input className={inputCls} value={aPassengers} onChange={(e) => setAPassengers(e.target.value)} inputMode="numeric" placeholder="e.g. 3" />
            </Field>
            <Field label="Pickup area">
              <input className={inputCls} value={aPickup} onChange={(e) => setAPickup(e.target.value)} placeholder="e.g. Umhlanga" />
            </Field>
            <Field label="Drop-off area">
              <input className={inputCls} value={aDropoff} onChange={(e) => setADropoff(e.target.value)} placeholder="e.g. King Shaka Airport" />
            </Field>
            <Field label="Approx. distance (km) — optional">
              <input className={inputCls} value={aKm} onChange={(e) => setAKm(e.target.value)} inputMode="decimal" placeholder="e.g. 28" />
            </Field>
            <Field label="Luggage pieces (extra)">
              <input className={inputCls} value={aLuggage} onChange={(e) => setALuggage(e.target.value)} inputMode="numeric" placeholder="e.g. 2" />
            </Field>
            <Field label="Waiting time (minutes)">
              <input className={inputCls} value={aWaiting} onChange={(e) => setAWaiting(e.target.value)} inputMode="numeric" placeholder="e.g. 30" />
            </Field>
            <Field label="Date">
              <input className={inputCls} type="date" value={aDate} onChange={(e) => setADate(e.target.value)} />
            </Field>
            <Field label="Time">
              <input className={inputCls} type="time" value={aTime} onChange={(e) => setATime(e.target.value)} />
            </Field>

            <ResultBlock
              range={airportRange}
              emptyHint="Add an approximate distance for a price range, or continue on WhatsApp for a final price."
              href={airportHref}
              ctaLabel="Get Airport Quote on WhatsApp"
              onConvert={() =>
                onConvert('Airport Transfer', airportRange, {
                  pickup: aPickup,
                  dropoff: aDropoff,
                  date: aDate,
                  time: aTime,
                  passengers: aPassengers,
                })
              }
            />
          </>
        )}

        {/* ---------------- PRIVATE ---------------- */}
        {tab === 'private' && (
          <>
            {ContactBlock}
            <Field label="Pickup">
              <input className={inputCls} value={pPickup} onChange={(e) => setPPickup(e.target.value)} placeholder="e.g. Berea" />
            </Field>
            <Field label="Drop-off">
              <input className={inputCls} value={pDropoff} onChange={(e) => setPDropoff(e.target.value)} placeholder="e.g. Gateway" />
            </Field>
            <Field label="Approx. distance (km)">
              <input className={inputCls} value={pKm} onChange={(e) => setPKm(e.target.value)} inputMode="decimal" placeholder="e.g. 15" />
            </Field>
            <Field label="Passengers">
              <input className={inputCls} value={pPassengers} onChange={(e) => setPPassengers(e.target.value)} inputMode="numeric" placeholder="e.g. 4" />
            </Field>
            <Field label="Date">
              <input className={inputCls} type="date" value={pDate} onChange={(e) => setPDate(e.target.value)} />
            </Field>
            <Field label="Time">
              <input className={inputCls} type="time" value={pTime} onChange={(e) => setPTime(e.target.value)} />
            </Field>
            <Field label="Extra stops">
              <input className={inputCls} value={pStops} onChange={(e) => setPStops(e.target.value)} inputMode="numeric" placeholder="e.g. 1" />
            </Field>
            <div className="grid grid-cols-1 gap-2 sm:col-span-2 sm:grid-cols-3">
              <Toggle label="Return trip (−10%)" checked={pReturn} onChange={setPReturn} />
              <Toggle label="After-hours (20:00–06:00)" checked={pAfterHours} onChange={setPAfterHours} />
              <Toggle label="Weekend" checked={pWeekend} onChange={setPWeekend} />
            </div>

            <ResultBlock
              range={privateRange}
              emptyHint="Add an approximate distance to see your estimated range."
              href={privateHref}
              ctaLabel="Get Private Trip Quote on WhatsApp"
              onConvert={() =>
                onConvert('Private Trip', privateRange, {
                  pickup: pPickup,
                  dropoff: pDropoff,
                  date: pDate,
                  time: pTime,
                  passengers: pPassengers,
                  return_trip: pReturn ? 'Yes' : 'No',
                  after_hours: pAfterHours ? 'Yes' : 'No',
                  weekend: pWeekend ? 'Yes' : 'No',
                })
              }
            />
          </>
        )}

        {/* ---------------- DAY HIRE ---------------- */}
        {tab === 'dayhire' && (
          <>
            <div className="sm:col-span-2">
              <span className="t-small text-silver">Choose a package</span>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {DAY_HIRE_PACKAGES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setDPackage(p.id)}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      dPackage === p.id ? 'border-electric bg-electric/10' : 'border-bordergrey hover:border-electric/50'
                    }`}
                  >
                    <span className="block font-display font-bold">{p.name}</span>
                    <span className="block t-small text-silver">
                      {p.hours}h · {p.kmIncluded}km incl.
                    </span>
                    <span className="mt-1 block text-sm text-electric">{formatRange(p.low, p.high)}</span>
                  </button>
                ))}
              </div>
            </div>
            {ContactBlock}
            <Field label="Pickup area">
              <input className={inputCls} value={dPickup} onChange={(e) => setDPickup(e.target.value)} placeholder="e.g. La Lucia" />
            </Field>
            <Field label="Date">
              <input className={inputCls} type="date" value={dDate} onChange={(e) => setDDate(e.target.value)} />
            </Field>
            <Field label="Passengers">
              <input className={inputCls} value={dPassengers} onChange={(e) => setDPassengers(e.target.value)} inputMode="numeric" placeholder="e.g. 5" />
            </Field>
            <Field label="Notes" full>
              <input className={inputCls} value={dNotes} onChange={(e) => setDNotes(e.target.value)} placeholder="Where you're going, any stops" />
            </Field>

            <ResultBlock
              range={dayHireRange}
              href={dayHireHref}
              ctaLabel="Book Day Hire on WhatsApp"
              onConvert={() =>
                onConvert(`Day Hire — ${dayHire.name}`, dayHireRange, {
                  pickup: dPickup,
                  date: dDate,
                  passengers: dPassengers,
                })
              }
            />
          </>
        )}

        {/* ---------------- STAFF ---------------- */}
        {tab === 'staff' && (
          <>
            <Field label="Company / Name">
              <input className={inputCls} value={sCompany} onChange={(e) => setSCompany(e.target.value)} placeholder="e.g. Acme Logistics" />
            </Field>
            <Field label="Phone / WhatsApp">
              <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="081 234 5678" />
            </Field>
            <Field label="Pickup area">
              <input className={inputCls} value={sPickup} onChange={(e) => setSPickup(e.target.value)} placeholder="e.g. Phoenix" />
            </Field>
            <Field label="Work destination">
              <input className={inputCls} value={sDest} onChange={(e) => setSDest(e.target.value)} placeholder="e.g. Jacobs" />
            </Field>
            <Field label="Passengers">
              <input className={inputCls} value={sPassengers} onChange={(e) => setSPassengers(e.target.value)} inputMode="numeric" placeholder="e.g. 6" />
            </Field>
            <Field label="Days per month">
              <input className={inputCls} value={sDays} onChange={(e) => setSDays(e.target.value)} inputMode="numeric" placeholder="e.g. 22" />
            </Field>
            <Field label="One-way distance (km)">
              <input className={inputCls} value={sKm} onChange={(e) => setSKm(e.target.value)} inputMode="decimal" placeholder="e.g. 18" />
            </Field>
            <Field label="Shift time">
              <input className={inputCls} value={sShift} onChange={(e) => setSShift(e.target.value)} placeholder="e.g. 05:30 in, 17:00 out" />
            </Field>

            <ResultBlock
              range={staffRange}
              rangeSuffix=" / month"
              emptyHint="Add one-way km and days per month to see an estimated monthly range."
              href={staffHref}
              ctaLabel="Request Route Assessment on WhatsApp"
              onConvert={() =>
                onConvert('Staff Transport', staffRange, {
                  pickup: sPickup,
                  dropoff: sDest,
                  passengers: sPassengers,
                })
              }
            />
          </>
        )}

        {/* ---------------- LIFT CLUB ---------------- */}
        {tab === 'liftclub' && (
          <>
            {ContactBlock}
            <Field label="Home / route area">
              <input className={inputCls} value={lRoute} onChange={(e) => setLRoute(e.target.value)} placeholder="e.g. Montclair" />
            </Field>
            <Field label="Work area">
              <input className={inputCls} value={lWork} onChange={(e) => setLWork(e.target.value)} placeholder="e.g. Durban CBD" />
            </Field>
            <Field label="Times">
              <input className={inputCls} value={lTimes} onChange={(e) => setLTimes(e.target.value)} placeholder="e.g. 06:00 in, 16:30 out" />
            </Field>
            <Field label="Passengers / seats needed">
              <input className={inputCls} value={lPassengers} onChange={(e) => setLPassengers(e.target.value)} inputMode="numeric" placeholder="e.g. 1" />
            </Field>

            <div className="sm:col-span-2">
              <p className="rounded-xl border border-bordergrey bg-lightgrey p-4 text-silver t-small">
                Lift club runs on shared daily routes. Availability depends on seats open on your route — we confirm directly on WhatsApp.
              </p>
              <a
                href={liftClubHref}
                target="_blank"
                rel="noopener"
                onClick={() =>
                  onConvert('Lift Club', null, { pickup: lRoute, dropoff: lWork })
                }
                className="btn btn-primary mt-3 w-full sm:w-auto"
              >
                Check Lift Club Availability on WhatsApp
              </a>
            </div>
          </>
        )}
      </div>

      <p className="mt-5 t-small text-silver">
        Estimates are indicative ranges based on distance and time. Final price is confirmed on WhatsApp before any booking.
      </p>
    </div>
  );
}

function ResultBlock({
  range,
  rangeSuffix = '',
  emptyHint,
  href,
  ctaLabel,
  onConvert,
}: {
  range: Range | null;
  rangeSuffix?: string;
  emptyHint?: string;
  href: string;
  ctaLabel: string;
  onConvert: () => void;
}) {
  return (
    <div className="sm:col-span-2 rounded-2xl border border-electric/30 bg-electric/5 p-5">
      <div className="flex flex-col gap-1">
        <span className="t-small uppercase tracking-wider text-silver">Estimated range</span>
        {range ? (
          <span className="font-display text-2xl font-bold text-graphite">
            {formatRange(range.low, range.high)}
            <span className="text-base font-medium text-silver">{rangeSuffix}</span>
          </span>
        ) : (
          <span className="text-silver">{emptyHint}</span>
        )}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        onClick={onConvert}
        className="btn btn-primary mt-4 w-full"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z" />
        </svg>
        {ctaLabel}
      </a>
    </div>
  );
}
