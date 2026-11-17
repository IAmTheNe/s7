import { BirthdayTodayMoment } from "@/components/birthday-today";
import { people } from "@/data/people";
import { toPersonView } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

export const InfoPage = () => {
  const { id } = useParams();
  const person = people.find((item) => item.id === id);

  if (!person) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fffaf0] bg-[radial-gradient(circle_at_1px_1px,rgba(51,47,58,0.075)_1px,transparent_0)] bg-[length:23px_23px] px-5 text-center text-[#332f3a]">
        <div>
          <p className="text-6xl">☹</p>
          <h1 className="mt-5 font-serif text-4xl font-black">Person not found</h1>
          <Link to="/" className="mt-6 inline-block font-bold underline decoration-2 underline-offset-4">
            Back to the birthday book
          </Link>
        </div>
      </main>
    );
  }

  const personView = toPersonView(person);
  const isToday = personView.remaining === 0;
  const isSoon = personView.remaining > 0 && personView.remaining <= 7;
  const pageTheme = isToday
    ? {
        page: "bg-[#fff4cf] bg-[radial-gradient(circle_at_15%_18%,rgba(255,111,97,0.16)_0_3px,transparent_4px),radial-gradient(circle_at_82%_28%,rgba(143,123,220,0.16)_0_3px,transparent_4px)] bg-[length:38px_38px,52px_52px]",
        badge: "bg-[#ffcf5c]",
        badgeText: "Birthday today",
        tape: "bg-[#ffcf5c]/80",
        photoShadow: "shadow-[10px_12px_0_#ff8a65]",
      }
    : isSoon
      ? {
          page: "bg-[#fff3ed]",
          badge: "bg-[#ffd8ca]",
          badgeText: "Coming very soon",
          tape: "bg-[#ff8a65]/55",
          photoShadow: "shadow-[10px_12px_0_#f3c7b3]",
        }
      : {
          page: "bg-[#fffaf0]",
          badge: "bg-[#f1eaff]",
          badgeText: "S7 birthday page",
          tape: "bg-[#f1b8c4]/75",
          photoShadow: "shadow-[10px_12px_0_#ffcf5c]",
        };

  const heading = isToday
    ? "Today is the day"
    : isSoon
      ? "Almost time for"
      : "A little corner for";
  const introduction = isToday
    ? `The candles are ready and today belongs to ${personView.name}. Let's make it extra memorable together.`
    : isSoon
      ? `${personView.name}'s birthday is just around the corner. There is still time to prepare a thoughtful little surprise.`
      : "One of the lovely people who makes S7 feel like S7. Here is a small page to remember the date and celebrate together.";

  return (
    <main className={`min-h-screen overflow-hidden bg-[radial-gradient(circle_at_1px_1px,rgba(51,47,58,0.075)_1px,transparent_0)] bg-[length:23px_23px] px-5 py-7 text-[#332f3a] sm:px-8 sm:py-10 ${pageTheme.page}`}>
      <div className="mx-auto max-w-5xl">
        <nav className="flex items-center justify-between">
          <Link
            to="/"
            className="rounded-full border-2 border-[#332f3a] bg-white px-4 py-2 text-sm font-black shadow-[3px_3px_0_#332f3a] transition hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffcf5c]"
          >
            ← Birthday book
          </Link>
          <span className="font-serif text-2xl font-black">S7<span className="text-[#ff6f61]">.</span></span>
        </nav>

        <section className="mt-14 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex justify-center">
            <div className={`relative w-[min(82vw,380px)] -rotate-2 border-2 border-[#332f3a] bg-white p-4 pb-20 ${pageTheme.photoShadow}`}>
              <div className={`absolute -top-5 left-1/2 h-10 w-32 -translate-x-1/2 rotate-2 ${pageTheme.tape}`} />
              <img
                src={`/${personView.id}.jpeg`}
                alt={personView.name}
                className="aspect-[4/5] w-full border-2 border-[#332f3a] object-cover"
              />
              <p className="absolute bottom-6 left-0 w-full rotate-1 text-center font-serif text-3xl font-black">
                {personView.name} ♡
              </p>
              {isToday && (
                <span className="absolute -right-5 -top-6 rotate-6 rounded-full border-2 border-[#332f3a] bg-[#ffcf5c] px-3 py-2 text-2xl shadow-[3px_3px_0_#332f3a]" aria-label="Birthday today">
                  🎉
                </span>
              )}
              {isSoon && (
                <span className="absolute -right-5 -top-6 rotate-6 rounded-full border-2 border-[#332f3a] bg-[#fff0e9] px-3 py-2 text-sm font-black shadow-[3px_3px_0_#332f3a]">
                  {personView.remaining} days!
                </span>
              )}
            </div>
          </div>

          <div>
            <span className={`inline-block -rotate-1 rounded-full border-2 border-[#332f3a] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] ${pageTheme.badge}`}>
              {pageTheme.badgeText}
            </span>
            <h1 className="mt-6 font-serif text-6xl font-black leading-none tracking-[-0.05em] sm:text-7xl">
              {heading} <span className="text-[#ff6f61]">{personView.name}</span>
              {isToday && <span className="text-[#332f3a]">!</span>}
            </h1>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-[#615a69]">
              {introduction}
            </p>

            {isToday && <BirthdayTodayMoment names={[personView.name]} />}

            {isSoon && (
              <div className="mt-8 flex items-center gap-4 rounded-[1.5rem] border-2 border-[#332f3a] bg-white/75 p-5 shadow-[5px_6px_0_#f3c7b3]">
                <span className="font-serif text-6xl font-black leading-none text-[#ff6f61]">
                  {personView.remaining}
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#c94e2d]">
                    {personView.remaining === 1 ? "Day to go" : "Days to go"}
                  </p>
                  <p className="mt-1 text-sm font-bold leading-5 text-[#615a69]">
                    A little reminder to get the message, gift, or surprise ready.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div className="rotate-1 border-2 border-[#332f3a] bg-[#ebf7f3] p-5 shadow-[5px_6px_0_#c5e2d9]">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#367d68]">The date</p>
                <p className="mt-2 font-serif text-3xl font-black">{personView.displayDob}</p>
              </div>
              <div className="-rotate-1 border-2 border-[#332f3a] bg-[#fff0e9] p-5 shadow-[5px_6px_0_#f3c7b3]">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#c94e2d]">
                  {isToday ? "Celebrating" : isSoon ? "Coming soon" : "Countdown"}
                </p>
                <p className="mt-2 font-serif text-3xl font-black">
                  {isToday ? "Right now!" : `${personView.remaining} days`}
                </p>
              </div>
            </div>

            <div className={`mt-8 rotate-[0.5deg] border-l-4 bg-white/70 px-5 py-4 text-sm font-bold leading-6 text-[#716a78] ${isToday ? "border-[#ff6f61]" : isSoon ? "border-[#ff8a65]" : "border-[#ffcf5c]"}`}>
              {isToday
                ? "“Today is for cake, wishes, and making another lovely memory together.”"
                : isSoon
                  ? "“The best celebrations start with a little anticipation.”"
                  : "“Every birthday is another page in the story we share.”"}
            </div>
          </div>
        </section>

        <footer className="mt-24 border-t-2 border-dashed border-[#332f3a]/25 pb-8 pt-10 text-center">
          <p className="text-sm font-bold text-[#716a78]">Made with love, for the people who matter.</p>
          <p className="mt-2 text-xs font-semibold text-[#9a929f]">Every moment with you is worth celebrating.</p>
        </footer>
      </div>
    </main>
  );
};
