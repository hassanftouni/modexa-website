interface LogoProps {
  /** Height of the X monogram in pixels. */
  size?: number;
  withWordmark?: boolean;
  className?: string;
}

/**
 * Inline rendering of the official Modexa logo: an X monogram built from a
 * cyan stroke crossed by a white stroke.
 * Kept inline (rather than an <img>) so it stays crisp and inherits layout.
 * File versions live in public/images/brand/.
 */
export function Logo({ size = 30, withWordmark = true, className = "" }: LogoProps) {
  return (
    // The logo is a fixed brand mark: never mirrored in RTL, and lang="en"
    // keeps the wordmark's letter-spacing on Arabic pages.
    <span dir="ltr" lang="en" className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        aria-hidden="true"
      >
        <line
          x1="148"
          y1="132"
          x2="364"
          y2="380"
          stroke="#06B6D4"
          strokeWidth="64"
          strokeLinecap="round"
        />
        <line
          x1="364"
          y1="132"
          x2="148"
          y2="380"
          stroke="#FFFFFF"
          strokeWidth="64"
          strokeLinecap="round"
        />
      </svg>
      {withWordmark ? (
        <span className="text-lg font-semibold tracking-[0.18em] text-foreground uppercase">
          Modexa
        </span>
      ) : null}
    </span>
  );
}
