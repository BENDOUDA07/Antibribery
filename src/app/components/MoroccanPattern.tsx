export function MoroccanPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="moroccan-pattern"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* Star pattern */}
          <path
            d="M40 10 L45 25 L60 25 L48 35 L53 50 L40 40 L27 50 L32 35 L20 25 L35 25 Z"
            fill="white"
            opacity="0.8"
          />
          
          {/* Geometric frame */}
          <rect
            x="15"
            y="15"
            width="50"
            height="50"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.4"
          />
          
          {/* Corner ornaments */}
          <circle cx="15" cy="15" r="3" fill="white" opacity="0.6" />
          <circle cx="65" cy="15" r="3" fill="white" opacity="0.6" />
          <circle cx="15" cy="65" r="3" fill="white" opacity="0.6" />
          <circle cx="65" cy="65" r="3" fill="white" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#moroccan-pattern)" />
    </svg>
  );
}
