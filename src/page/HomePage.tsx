import { BirthdaySpotlight } from "@/components/birthday-spotlight";
import { PersonCard } from "@/components/person-card";
import { people } from "@/data/people";
import { getNextBirthDay, toPersonView } from "@/lib/utils";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const sortedPeople = [...people].sort(
    (a, b) => getNextBirthDay(a.dob).getTime() - getNextBirthDay(b.dob).getTime(),
  );
  const nextBirthdayTime = getNextBirthDay(sortedPeople[0].dob).getTime();
  const featuredPeople = sortedPeople
    .filter((person) => getNextBirthDay(person.dob).getTime() === nextBirthdayTime)
    .map(toPersonView);
  const featuredIds = new Set(featuredPeople.map((person) => person.id));
  const others = sortedPeople
    .filter((person) => !featuredIds.has(person.id))
    .map(toPersonView);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fffaf0] bg-[radial-gradient(circle_at_1px_1px,rgba(51,47,58,0.075)_1px,transparent_0)] bg-[length:23px_23px] px-5 py-7 text-[#332f3a] sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute left-[7%] top-28 h-20 w-20 rotate-12 rounded-full border-[12px] border-[#ff8a65]/15" />
      <div className="pointer-events-none absolute right-[6%] top-[42rem] text-6xl opacity-10">✿</div>

      <div className="relative mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-4">
          <Link to="/" className="font-serif text-2xl font-black tracking-tight sm:text-3xl">
            S7<span className="text-[#ff6f61]">.</span>
          </Link>
          <span className="rotate-1 rounded-full border-2 border-[#332f3a] bg-[#ffcf5c] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-[3px_3px_0_#332f3a]">
            Birthday club
          </span>
        </header>

        <BirthdaySpotlight people={featuredPeople} />

        {others.length > 0 && <section className="mt-24" aria-labelledby="birthday-list-title">
          <div className="mb-9 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#ff6f61]">
                The rest of our little crew
              </p>
              <h2 id="birthday-list-title" className="font-serif text-4xl font-black tracking-tight sm:text-5xl">
                Birthday book <span aria-hidden="true">✿</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm font-semibold leading-6 text-[#716a78] sm:text-right">
              Ordered by the birthdays coming up next.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {others.map((person, index) => (
              <div
                key={person.id}
                className="animate-reveal-card motion-reduce:animate-none"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <PersonCard {...person} />
              </div>
            ))}
          </div>
        </section>}

        <footer className="mt-24 border-t-2 border-dashed border-[#332f3a]/25 pb-8 pt-12 text-center">
          <div className="mb-3 text-3xl">💗</div>
          <p className="text-sm font-bold text-[#716a78]">
            Made with love, for the people who matter.
          </p>
          <p className="mt-2 text-xs font-semibold text-[#9a929f]">
            Every moment with you is worth celebrating.
          </p>
        </footer>
      </div>
    </main>
  );
};
