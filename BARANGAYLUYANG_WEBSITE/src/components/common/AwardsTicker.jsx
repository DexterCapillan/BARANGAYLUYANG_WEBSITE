import { useAwards } from "../../context/useAwards";
import { Trophy } from "lucide-react";

export default function AwardsTicker() {
  const { awards } = useAwards();

  if (awards.length === 0) return null;

  // Get most recent award only
  const recentAward = [...awards].sort((a, b) => b.year - a.year)[0];

  // Repeat to fill the track
  const items = Array(10).fill(recentAward);

  return (
    <div className="bg-blue-950 border-y border-blue-800 py-3 overflow-hidden relative flex items-center">
      {/* LABEL */}
      <div className="absolute left-0 top-0 bottom-0 z-10 bg-yellow-400 flex items-center px-4 gap-2 shrink-0">
        <Trophy className="w-4 h-4 text-blue-950" />
        <span className="text-blue-950 text-xs font-extrabold uppercase tracking-widest whitespace-nowrap">
          Latest Award
        </span>
      </div>

      {/* SCROLLING WRAPPER */}
      <div className="overflow-hidden w-full pl-36">
        <div className="flex animate-ticker">
          {items.map((award, i) => (
            <span key={`a-${i}`} className="inline-flex items-center gap-2 mx-8 text-sm text-white whitespace-nowrap shrink-0">
              <Trophy className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              <span className="font-semibold text-yellow-400">{award.year}</span>
              <span>{award.name}</span>
            </span>
          ))}
          {items.map((award, i) => (
            <span key={`b-${i}`} className="inline-flex items-center gap-2 mx-8 text-sm text-white whitespace-nowrap shrink-0">
              <Trophy className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              <span className="font-semibold text-yellow-400">{award.year}</span>
              <span>{award.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}