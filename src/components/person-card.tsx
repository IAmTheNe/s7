import { cn } from "@/lib/utils";
import type { PersonView } from "@/type/person";
import { useNavigate } from "react-router-dom";

export const PersonCard = ({ id, displayDob, name, remaining }: PersonView) => {
  const navigate = useNavigate();

  const isToday = remaining === 0;
  const isSoon = remaining > 0 && remaining <= 7;

  return (
    <div
      onClick={() => navigate(`/info/${id}`)}
      className={cn(
        "group relative w-full max-w-[220px] cursor-pointer",
        "rounded-3xl border border-white/70",
        "bg-white/70 backdrop-blur-xl",
        "shadow-[0_8px_30px_rgba(120,80,150,0.08)]",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-3 hover:scale-[1.03]",
        "hover:shadow-[0_20px_45px_rgba(120,80,150,0.2)]",
        "animate-[float_4s_ease-in-out_infinite]",
      )}
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-200/40 blur-3xl transition-all duration-500 group-hover:bg-pink-300/60" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-violet-200/40 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center p-5">
        {/* Status */}
        <div className="mb-4 h-6">
          {isToday ? (
            <span className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-pink-200">
              🎉 Birthday Today!
            </span>
          ) : isSoon ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600">
              ✨ Coming soon
            </span>
          ) : (
            <span className="text-xs font-medium text-violet-400">
              ♡ Special person
            </span>
          )}
        </div>

        {/* Avatar */}
        <div className="relative mb-4">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 opacity-70 blur-sm transition-opacity group-hover:opacity-100" />

          <div className="relative rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-[3px]">
            <img
              className="h-20 w-20 rounded-full border-[3px] border-white object-cover transition-transform duration-500 group-hover:scale-105"
              src={`/${id}.jpeg`}
              alt={name}
            />
          </div>

          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white text-sm shadow-sm">
            🎂
          </span>
        </div>

        {/* Name */}
        <h2 className="text-lg font-bold tracking-tight text-gray-800 transition-colors group-hover:text-purple-600">
          {name}
        </h2>

        {/* Birthday */}
        <p className="mt-1 text-sm font-medium text-gray-400">{displayDob}</p>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-purple-200 to-transparent" />

        {/* Countdown */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            {isToday ? "Celebrate!" : "Birthday in"}
          </span>

          <div className="mt-1 flex items-baseline gap-1">
            <span
              className={cn(
                "text-3xl font-black tracking-tight",
                isToday
                  ? "bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent"
                  : "text-purple-600",
              )}
            >
              {remaining}
            </span>
            <span className="text-xs font-semibold text-gray-400">
              {remaining === 1 ? "day" : "days"}
            </span>
          </div>
        </div>

        {/* Hover hint */}
        <div className="mt-3 text-xs font-semibold text-purple-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View memories →
        </div>
      </div>
    </div>
  );
};
