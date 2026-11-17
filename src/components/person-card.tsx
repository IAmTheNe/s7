import { cn } from "@/lib/utils";
import type { PersonView } from "@/type/person";
import { Link } from "react-router-dom";

const palettes = [
  {
    card: "bg-[#fff7ea]",
    accent: "bg-[#ff8a65]",
    text: "text-[#c94e2d]",
    shadow: "shadow-[5px_6px_0_#f3c7b3]",
  },
  {
    card: "bg-[#f2edff]",
    accent: "bg-[#8f7bdc]",
    text: "text-[#6651b8]",
    shadow: "shadow-[5px_6px_0_#d8cff3]",
  },
  {
    card: "bg-[#ebf7f3]",
    accent: "bg-[#58a98f]",
    text: "text-[#367d68]",
    shadow: "shadow-[5px_6px_0_#c5e2d9]",
  },
] as const;

export const PersonCard = ({ id, displayDob, name, remaining }: PersonView) => {
  const isToday = remaining === 0;
  const isSoon = remaining > 0 && remaining <= 7;
  const palette = palettes[id.length % palettes.length];

  return (
    <Link
      to={`/info/${id}`}
      aria-label={`Open ${name}'s birthday page`}
      className={cn(
        "group relative block w-full overflow-hidden rounded-[1.75rem] border-2 border-[#332f3a] p-5",
        "transition duration-300 ease-out hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-[8px_9px_0_#332f3a]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffcf5c]",
        palette.card,
        palette.shadow,
      )}
    >
      <div
        className={cn(
          "absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20",
          palette.accent,
        )}
      />

      <div className="relative flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="absolute -inset-1 rotate-3 rounded-[1.35rem] bg-white" />
          <img
            className="relative h-20 w-20 -rotate-2 rounded-[1.15rem] border-2 border-[#332f3a] object-cover transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105"
            src={`/${id}.jpeg`}
            alt={name}
          />
          <span className="absolute -bottom-2 -right-2 grid h-8 w-8 rotate-6 place-items-center rounded-full border-2 border-[#332f3a] bg-[#ffcf5c] text-sm">
            🎂
          </span>
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <p
            className={cn(
              "mb-1 text-[11px] font-extrabold uppercase tracking-[0.14em]",
              palette.text,
            )}
          >
            {isToday ? "Birthday today!" : isSoon ? "Coming very soon" : "S7 lovely person"}
          </p>
          <h3 className="truncate text-xl font-black tracking-tight text-[#332f3a]">
            {name}
          </h3>
          <p className="mt-1 text-sm font-semibold text-[#716a78]">{displayDob}</p>
        </div>
      </div>

      <div className="relative mt-5 flex items-end justify-between border-t-2 border-dashed border-[#332f3a]/20 pt-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#716a78]">
            {isToday ? "Make a wish" : "Birthday in"}
          </p>
          <p className={cn("mt-0.5 font-black", palette.text)}>
            <span className="text-3xl">{remaining}</span>
            <span className="ml-1 text-sm">{remaining === 1 ? "day" : "days"}</span>
          </p>
        </div>

        <span className="mb-1 text-sm font-extrabold text-[#332f3a] underline decoration-2 underline-offset-4 transition-transform group-hover:translate-x-1">
          Open page →
        </span>
      </div>
    </Link>
  );
};
