import { useState } from "react";

type BirthdayTodayMomentProps = {
  names: string[];
};

const confettiColors = ["#ff6f61", "#ffcf5c", "#8f7bdc", "#58a98f"];

export const BirthdayTodayMoment = ({ names }: BirthdayTodayMomentProps) => {
  const [wishMade, setWishMade] = useState(false);
  const celebrants = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(names);

  return (
    <div className="relative mt-7 overflow-hidden rounded-[1.5rem] border-2 border-[#332f3a] bg-white/75 p-4 shadow-[4px_5px_0_#ffcf5c] sm:p-5">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span
            key={index}
            className="absolute -top-3 h-[13px] w-[7px] animate-birthday-confetti rounded-sm motion-reduce:animate-none"
            style={{
              left: `${4 + ((index * 37) % 92)}%`,
              animationDelay: `${(index % 7) * -0.55}s`,
              animationDuration: `${3.8 + (index % 4) * 0.45}s`,
              backgroundColor: confettiColors[index % confettiColors.length],
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-end gap-4">
          <div className="relative h-20 w-24 shrink-0" aria-hidden="true">
            <div className="absolute bottom-0 h-12 w-24 rounded-b-xl rounded-t-md border-2 border-[#332f3a] bg-[#f1b8c4]" />
            <div className="absolute bottom-9 left-0 h-4 w-24 rounded-[50%] border-2 border-[#332f3a] bg-[#fffaf0]" />
            {[24, 46, 68].map((left) => (
              <div key={left} className="absolute bottom-12 h-7 w-2 rounded-t bg-[#8f7bdc]" style={{ left }}>
                <span
                  className={`absolute -top-4 left-1/2 h-4 w-3 origin-bottom rounded-[50%_50%_45%_45%] bg-[#ff9f43] transition-[opacity,transform] duration-200 motion-reduce:animate-none ${wishMade ? "animate-none opacity-0 [transform:translateX(-50%)_translateY(5px)_scale(0.2)]" : "animate-birthday-flame"}`}
                />
              </div>
            ))}
          </div>

          <div className="pb-1">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#c94e2d]">
              Birthday mode is on
            </p>
            <p className="mt-1 text-sm font-bold leading-5 text-[#615a69]">
              {wishMade
                ? `A little wish is on its way to ${celebrants}.`
                : `Close your eyes and make a wish for ${celebrants}.`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setWishMade(true)}
          disabled={wishMade}
          className="shrink-0 rounded-full border-2 border-[#332f3a] bg-[#ffcf5c] px-5 py-2.5 text-sm font-black shadow-[3px_3px_0_#332f3a] transition hover:-translate-y-1 disabled:cursor-default disabled:bg-[#ebf7f3] disabled:shadow-none disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ff8a65]"
        >
          {wishMade ? "Wish made ♡" : "Make a wish ✨"}
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {wishMade ? `Wish made for ${celebrants}. The candles are out.` : ""}
      </p>
    </div>
  );
};
