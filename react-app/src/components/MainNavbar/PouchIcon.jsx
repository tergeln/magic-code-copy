export default function PouchIcon() {
  return (
    <svg className="pouch-icon" viewBox="0 0 32 36" width="27" height="30" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="pouchFabric" x1="6" y1="10" x2="27" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#876587" />
          <stop offset=".5" stopColor="#533852" />
          <stop offset="1" stopColor="#302333" />
        </linearGradient>
      </defs>
      <path d="M10 11 7 5l5 1 4-3 4 3 5-1-3 6" fill="#61435F" stroke="#DAC795" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10 12C8 16 3 21 4 27c1 5 6 7 12 7s11-2 12-7c1-6-4-11-6-15Z" fill="url(#pouchFabric)" stroke="#DAC795" strokeWidth="1.4" />
      <path d="M12 15c-3 7-4 11-2 15m6-15v17m4-17c3 7 4 11 2 15" stroke="#C4A77C" strokeWidth="1" opacity=".65" />
      <path d="M9 12c4 1 10 1 14 0M10 12c-5 0-7 5-5 8m17-8c5 0 7 5 5 8" stroke="#E8D5A3" strokeWidth="1.5" strokeLinecap="round" />
      <path d="m15 21 1-3 1 3 3 1-3 1-1 3-1-3-3-1Z" fill="#E8D5A3" />
    </svg>
  );
}
