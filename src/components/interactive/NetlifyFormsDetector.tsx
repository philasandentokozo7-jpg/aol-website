import { ENQUIRY_FIELD_NAMES, NETLIFY_FORM_NAME, NETLIFY_HONEYPOT_FIELD } from "@/content/enquiry-form";

/**
 * Static HTML form Netlify’s deploy parser can detect.
 * Hidden from visitors — not a second visible form.
 * Field names must match the interactive consultation form exactly.
 */
const NETLIFY_FORM_ATTRS = {
  "data-netlify": "true",
  "netlify-honeypot": NETLIFY_HONEYPOT_FIELD,
} as const;

export function NetlifyFormsDetector() {
  return (
    <form
      name={NETLIFY_FORM_NAME}
      method="POST"
      {...NETLIFY_FORM_ATTRS}
      className="netlify-form-detector"
      aria-hidden="true"
      tabIndex={-1}
      hidden
    >
      <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
      <label>
        Do not fill this out if you are human
        <input type="text" name={NETLIFY_HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </label>
      {ENQUIRY_FIELD_NAMES.map((field) =>
        field === "message" ? (
          <textarea key={field} name={field} tabIndex={-1} defaultValue="" readOnly />
        ) : field === "marketing_consent" ? (
          <input key={field} type="checkbox" name={field} value="yes" tabIndex={-1} />
        ) : (
          <input key={field} type="text" name={field} tabIndex={-1} defaultValue="" readOnly />
        )
      )}
    </form>
  );
}
