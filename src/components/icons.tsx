export function CustomFireExtinguisher({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Top Assembly */}
      <path fillRule="evenodd" clipRule="evenodd" d="M 35.5 13 C 22.5 13 12.5 23 12.5 33 C 12.5 36 15.5 38 17.5 36 C 22.5 29 27.5 21 35.5 21 V 26 H 52.5 V 29 L 82.5 21 C 85.5 20 87.5 22 87.5 26 V 41 C 87.5 45 85.5 47 82.5 46 L 52.5 36 V 13 H 35.5 Z M 44 16.5 A 3.5 3.5 0 1 0 44 23.5 A 3.5 3.5 0 1 0 44 16.5 Z" />
      {/* Main Body */}
      <path d="M 25.5 39 C 25.5 29 32.5 23 44 23 C 55.5 23 62.5 29 62.5 39 V 63 H 25.5 V 39 Z" />
      {/* Bottom Body */}
      <path d="M 25.5 67 H 62.5 V 73 C 62.5 83 55.5 87 44 87 C 32.5 87 25.5 83 25.5 73 V 67 Z" />
    </svg>
  );
}
