// Tiny pub-sub so any "Book a Free Consultation" button (server-rendered
// sections included) can open the single modal without lifting state through
// the whole tree.
export const OPEN_CONSULTATION_EVENT = "aol:open-consultation";

export function openConsultation() {
  window.dispatchEvent(new Event(OPEN_CONSULTATION_EVENT));
}
