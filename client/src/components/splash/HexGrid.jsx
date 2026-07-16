const HexGrid = () => (
  <svg
    style={{
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 0,
      opacity: 0.12,
    }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="hex"
        width="56"
        height="96"
        patternUnits="userSpaceOnUse"
        patternTransform="scale(0.8)"
      >
        <path
          d="M28 0L56 16V48L28 64L0 48V16Z"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <path
          d="M28 32L56 48V80L28 96L0 80V48Z"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex)" />
  </svg>
);

export default HexGrid;
