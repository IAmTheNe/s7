import { BirthdayTodayMoment } from "@/components/birthday-today";
import type { PersonView } from "@/type/person";
import { Link } from "react-router-dom";

type BirthdaySpotlightProps = {
  people: PersonView[];
};

const FlowerDoodle = ({ className }: { className: string }) => (
  <svg
    viewBox="0 0 100 138"
    className={className}
    aria-hidden="true"
    fill="none"
  >
    <path
      d="M50 69C50 91 47 112 43 133"
      stroke="#6f9f45"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M47 104C34 91 22 91 17 94C23 108 34 113 45 113"
      fill="#a8c96f"
      stroke="#6f9f45"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path
      d="M49 91C61 80 72 80 78 84C72 96 62 101 49 100"
      fill="#a8c96f"
      stroke="#6f9f45"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {[0, 72, 144, 216, 288].map((rotation) => (
      <ellipse
        key={rotation}
        cx="50"
        cy="25"
        rx="15"
        ry="24"
        transform={`rotate(${rotation} 50 50)`}
        fill="#fffaf0"
        stroke="currentColor"
        strokeWidth="5"
      />
    ))}
    <circle cx="50" cy="50" r="11" fill="#ffcf5c" stroke="currentColor" strokeWidth="4" />
  </svg>
);

const BirthdayCountdown = ({ person }: { person: PersonView }) => (
  <span className="text-sm font-bold text-[#716a78]">
    {person.remaining === 0
      ? "🎉 Celebrate today"
      : `🎂 ${person.remaining} days to go`}
  </span>
);

const SingleSpotlight = ({ person }: { person: PersonView }) => {
  const isToday = person.remaining === 0;

  return (
    <section className={`relative mt-12 grid items-center gap-10 rounded-[2.25rem] border-2 border-[#332f3a] px-6 py-9 shadow-[8px_9px_0_#332f3a] md:grid-cols-[1.08fr_0.92fr] md:px-12 md:py-12 ${isToday ? "bg-[#fff4cf] bg-[radial-gradient(circle_at_15%_18%,rgba(255,111,97,0.16)_0_3px,transparent_4px),radial-gradient(circle_at_82%_28%,rgba(143,123,220,0.16)_0_3px,transparent_4px)] bg-[length:38px_38px,52px_52px]" : "bg-[#f1eaff]"}`}>
      <FlowerDoodle className="pointer-events-none absolute -right-2 bottom-2 h-28 w-24 rotate-12 text-[#8f7bdc] opacity-80 sm:right-5 sm:top-8 sm:h-32 sm:w-28" />
      <FlowerDoodle className="pointer-events-none absolute -left-3 bottom-3 h-16 w-14 -rotate-12 text-[#ff6f61] opacity-45" />
      <span className="absolute -top-4 left-8 -rotate-2 border-2 border-[#332f3a] bg-[#ff8a65] px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white">
        Next celebration
      </span>

      <div className="order-2 md:order-1">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-[#715ac1]">
          {isToday ? "The special day is here" : "Save the date"}
        </p>
        <h1 className="max-w-xl font-serif text-5xl font-black leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
          {isToday ? "Today is" : "Counting down to"}{" "}
          <span className="relative inline-block text-[#ff6f61]">
            {person.name}
            <svg
              className="absolute -bottom-3 left-0 w-full"
              viewBox="0 0 220 14"
              aria-hidden="true"
            >
              <path
                d="M3 9C58 2 145 3 217 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
        <p className="mt-7 max-w-lg text-base font-semibold leading-7 text-[#615a69] sm:text-lg">
          {isToday
            ? `Send ${person.name} a little love and make today extra memorable.`
            : `${person.remaining} days until ${person.displayDob}. Plenty of time to plan something lovely together.`}
        </p>

        {isToday && <BirthdayTodayMoment names={[person.name]} />}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to={`/info/${person.id}`}
            className="rounded-full border-2 border-[#332f3a] bg-[#332f3a] px-6 py-3 text-sm font-black text-white shadow-[4px_4px_0_#ffcf5c] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#ffcf5c] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffcf5c]"
          >
            Open birthday page →
          </Link>
          <BirthdayCountdown person={person} />
        </div>
      </div>

      <div className="order-1 flex justify-center md:order-2">
        <div className="relative w-[min(78vw,310px)] rotate-3 border-2 border-[#332f3a] bg-white p-3 pb-16 shadow-[9px_10px_0_#d8cff3] transition-transform duration-300 hover:rotate-1">
          <div className="absolute -top-5 left-1/2 h-10 w-28 -translate-x-1/2 -rotate-3 bg-[#ffcf5c]/70" />
          <img
            src={`/${person.id}.jpeg`}
            alt={person.name}
            className="aspect-[4/3] w-full border-2 border-[#332f3a] object-cover"
          />
          <p className="absolute bottom-4 left-0 w-full -rotate-2 text-center font-serif text-2xl font-black">
            {person.name} · {person.displayDob} ♡
          </p>
        </div>
      </div>
    </section>
  );
};

const GroupSpotlight = ({ people }: BirthdaySpotlightProps) => {
  const birthday = people[0];
  const isToday = birthday.remaining === 0;
  const names = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(people.map((person) => person.name));

  return (
    <section className={`relative mt-12 overflow-hidden rounded-[2.25rem] border-2 border-[#332f3a] px-6 py-10 shadow-[8px_9px_0_#332f3a] md:px-12 md:py-12 ${isToday ? "bg-[#fff4cf] bg-[radial-gradient(circle_at_15%_18%,rgba(255,111,97,0.16)_0_3px,transparent_4px),radial-gradient(circle_at_82%_28%,rgba(143,123,220,0.16)_0_3px,transparent_4px)] bg-[length:38px_38px,52px_52px]" : "bg-[#fff0e9]"}`}>
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-[28px] border-[#ffcf5c]/35" />
      <FlowerDoodle className="pointer-events-none absolute -bottom-3 right-2 h-32 w-28 -rotate-6 text-[#ff6f61] opacity-70 sm:right-8" />
      <FlowerDoodle className="pointer-events-none absolute -left-2 top-6 h-20 w-16 rotate-12 text-[#8f7bdc] opacity-40" />
      <span className="absolute -top-0 right-8 rotate-2 border-x-2 border-b-2 border-[#332f3a] bg-[#ffcf5c] px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">
        Shared birthday
      </span>

      <div className="relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-[#c94e2d]">
            {isToday ? "One date · one big celebration" : "Same date · more love"}
          </p>
          <h1 className="font-serif text-5xl font-black leading-[0.94] tracking-[-0.045em] sm:text-6xl">
            A shared day for{" "}
            <span className="text-[#ff6f61]">{names}</span>
          </h1>
          <p className="mt-7 max-w-xl text-base font-semibold leading-7 text-[#615a69] sm:text-lg">
            {isToday
              ? `${people.length} lovely people, one birthday, and plenty of reasons to celebrate today.`
              : `${people.length} lovely people are sharing ${birthday.displayDob} — only ${birthday.remaining} days to go.`}
          </p>

          {isToday && <BirthdayTodayMoment names={people.map((person) => person.name)} />}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {people.map((person) => (
              <Link
                key={person.id}
                to={`/info/${person.id}`}
                className="rounded-full border-2 border-[#332f3a] bg-white px-4 py-2 text-sm font-black shadow-[3px_3px_0_#332f3a] transition hover:-translate-y-1 hover:bg-[#ffcf5c] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffcf5c]"
              >
                {person.name} →
              </Link>
            ))}
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          aria-label={`${people.length} people sharing the next birthday`}
        >
          {people.map((person, index) => (
            <Link
              key={person.id}
              to={`/info/${person.id}`}
              className={`group relative border-2 border-[#332f3a] bg-white p-2 pb-10 shadow-[5px_6px_0_#f3c7b3] transition duration-300 hover:z-10 hover:-translate-y-2 hover:rotate-0 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ffcf5c] ${index % 2 === 0 ? "-rotate-2" : "rotate-2"}`}
            >
              <div className="absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 bg-[#f1b8c4]/70" />
              <img
                src={`/${person.id}.jpeg`}
                alt={person.name}
                className="aspect-square w-full border border-[#332f3a] object-cover"
              />
              <span className="absolute bottom-2 left-0 w-full text-center font-serif text-lg font-black">
                {person.name} ♡
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export const BirthdaySpotlight = ({ people }: BirthdaySpotlightProps) => {
  if (people.length === 1) {
    return <SingleSpotlight person={people[0]} />;
  }

  return <GroupSpotlight people={people} />;
};
