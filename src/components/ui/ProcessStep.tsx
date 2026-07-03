import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export interface ProcessStepProps {
  step?: number;
  title: ReactNode;
  description?: ReactNode;
  icon?: IconName;
  connector?: boolean;
  layout?: "row" | "column";
  className?: string;
}

/** ProcessStep — numbered step for the Consultation → Implementation → Growth flow. */
export function ProcessStep({ step, title, description, icon, connector = false, layout = "row", className = "" }: ProcessStepProps) {
  return (
    <div className={`aol-processstep ${layout === "row" ? "aol-processstep--row" : ""} ${className}`.trim()}>
      {connector && <span className="aol-processstep__connector" aria-hidden="true" />}
      <div className="aol-processstep__top">
        <span className="aol-processstep__num">{icon ? <Icon name={icon} size={24} /> : step}</span>
        {step != null && <span className="aol-processstep__kicker">Step {step}</span>}
      </div>
      <h3 className="aol-processstep__title">{title}</h3>
      <p className="aol-processstep__desc">{description}</p>
    </div>
  );
}
