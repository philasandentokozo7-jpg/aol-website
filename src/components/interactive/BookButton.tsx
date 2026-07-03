"use client";

import { Button, type ButtonProps } from "../ui/Button";
import { openConsultation } from "./consultation-events";

/** A Button that opens the consultation modal. Drop-in for the prototype's onBook buttons. */
export function BookButton(props: Omit<ButtonProps, "href" | "onClick">) {
  return <Button {...props} onClick={openConsultation} />;
}
