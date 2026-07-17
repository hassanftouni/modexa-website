import { useId } from "react";

interface LogoProps {
  /** Height of the X monogram in pixels. */
  size?: number;
  withWordmark?: boolean;
  className?: string;
}

/**
 * Inline rendering of the official Modexa logo: an X monogram built from a
 * purple → indigo → blue gradient stroke crossed by a white stroke.
 * Kept inline (rather than an <img>) so it stays crisp and inherits layout.
 * File versions live in public/images/brand/.
 */
export function Logo({ size = 30, withWordmark = true, className = "" }: LogoProps) {
  const gradientId = useId();

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="132"
            y1="116"
            x2="380"
            y2="396"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#A855F7" />
            <stop offset="0.5" stopColor="#6366F1" />
            <stop offset="1" stopColor="#3FA2F7" />
          </linearGradient>
        </defs>
        <line
          x1="148"
          y1="132"
          x2="364"
          y2="380"
          stroke={`url(#${gradientId})`}
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
