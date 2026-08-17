/**
 * The fallback for a Product whose asset is missing or failed to resolve.
 * Labelled, so the scene stays usable and the gap is legible rather than blank.
 */
export function MissingAsset({ label }: { label: string }) {
  return (
    <g>
      <rect
        x={-70}
        y={-140}
        width={140}
        height={140}
        rx={10}
        fill="#FFFFFF"
        fillOpacity={0.75}
        stroke="#A79C8E"
        strokeWidth={3}
        strokeDasharray="9 9"
      />
      <text x={0} y={-76} textAnchor="middle" fontSize={15} fill="#6B6259">
        {label}
      </text>
      <text x={0} y={-54} textAnchor="middle" fontSize={12} fill="#A79C8E">
        image unavailable
      </text>
    </g>
  );
}
