export default function Logo({ size = 32, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Rounded square background */}
            <rect width="40" height="40" rx="10" fill="#4F46E5" />

            {/* Stylized "S" as upward trending chart line */}
            <path
                d="M10 28 C10 28, 14 26, 17 22 C20 18, 18 16, 20 14 C22 12, 24 16, 26 14 C28 12, 30 8, 30 8"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            {/* Arrow head at the end */}
            <path
                d="M27 7 L30.5 8 L30 11.5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />

            {/* Small bar chart at bottom */}
            <rect x="11" y="30" width="3" height="4" rx="1" fill="rgba(255,255,255,0.4)" />
            <rect x="16" y="28" width="3" height="6" rx="1" fill="rgba(255,255,255,0.5)" />
            <rect x="21" y="26" width="3" height="8" rx="1" fill="rgba(255,255,255,0.6)" />
            <rect x="26" y="23" width="3" height="11" rx="1" fill="rgba(255,255,255,0.7)" />
        </svg>
    )
}
