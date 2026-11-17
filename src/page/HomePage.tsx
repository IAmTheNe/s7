import { PersonCard } from "@/components/person-card";
import { people } from "@/data/people";
import { getNextBirthDay, toPersonView } from "@/lib/utils";

export const HomePage = () => {
  const others = [...people].sort((a, b) => {
    const dateA = getNextBirthDay(a.dob);
    const dateB = getNextBirthDay(b.dob);
    return dateA.getTime() - dateB.getTime();
  });

  const sortedPeople = [
    ...others.filter((p) => p.id !== "nhom"),
    ...people.filter((p) => p.id === "nhom"),
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#faf7ff] px-5 py-12 sm:px-8">
      {/* Background decorations */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-pink-200/40 blur-[100px]" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-purple-200/40 blur-[100px]" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-blue-200/40 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Hero */}
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-black tracking-tight text-gray-800 sm:text-5xl md:text-6xl">
            S7 Birthday
          </h1>
        </header>

        {/* Section heading */}
        <section>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-pink-400">
                Never miss a special day
              </p>
              <h2 className="text-2xl font-extrabold text-gray-800">
                Our lovely people
                <span className="ml-2 text-xl">🌷</span>
              </h2>
            </div>

            <span className="text-xs font-medium text-gray-400">
              Sorted by upcoming birthdays ↑
            </span>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {sortedPeople.map(toPersonView).map((person, index) => (
              <div
                key={person.id}
                className="w-full flex justify-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PersonCard {...person} />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pb-6 text-center">
          <div className="mb-3 text-2xl">💗</div>
          <p className="text-sm font-medium text-gray-400">
            Made with love, for the people who matter.
          </p>
          <p className="mt-2 text-xs text-gray-300">
            Every moment with you is worth celebrating.
          </p>
        </footer>
      </div>
    </main>
  );
};
