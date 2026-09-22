"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Nothing ever changes after mount, so the store never notifies. */
const noopSubscribe = () => () => {};

/**
 * The address is shipped base64-encoded and assembled in the browser, so the
 * literal string never appears in the served HTML for a scraper to lift.
 *
 * The decode runs as a client-only snapshot rather than in an effect: the
 * server snapshot is null, which is exactly the point — the prerendered HTML
 * must not contain the address.
 *
 * It degrades to a LinkedIn route when scripting is unavailable, rather than
 * leaving a dead control on the page.
 */
export function ContactLink({
  encoded,
  fallbackHref,
  label,
  revealAddress = false,
  className = "",
}: {
  encoded: string;
  fallbackHref: string;
  /** Shown until the address resolves, and whenever it cannot. */
  label: string;
  /** Replace the label with the address itself once it has been assembled. */
  revealAddress?: boolean;
  className?: string;
}) {
  const getClientSnapshot = useCallback(() => {
    try {
      return atob(encoded);
    } catch {
      return null;
    }
  }, [encoded]);

  const address = useSyncExternalStore(
    noopSubscribe,
    getClientSnapshot,
    () => null,
  );

  return (
    <a
      href={address ? `mailto:${address}` : fallbackHref}
      className={className}
    >
      {revealAddress && address ? address : label}
    </a>
  );
}
