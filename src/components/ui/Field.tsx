import type { ReactNode } from "react";

export interface FieldProps {
  label?: ReactNode;
  htmlFor?: string;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  onDark?: boolean;
  children: ReactNode;
  className?: string;
}

/** Field — label + control wrapper with optional hint and error text. */
export function Field({ label, htmlFor, hint, error, required = false, onDark = false, children, className = "" }: FieldProps) {
  return (
    <div className={`aol-field ${onDark ? "aol-field--onDark" : ""} ${className}`.trim()}>
      {label && (
        <label className="aol-field__label" htmlFor={htmlFor}>
          {label}
          {required && (
            <span className="aol-field__req" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error ? <span className="aol-field__error">{error}</span> : hint && <span className="aol-field__hint">{hint}</span>}
    </div>
  );
}
