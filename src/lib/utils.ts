import type { Person } from "@/type/person";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ExifReader from "exifreader";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const toPersonView = (person: Person) => {
  const today = new Date();
  const nextBirthday = getNextBirthDay(person.dob);
  const remaining = Math.round(
    (
      Date.UTC(
        nextBirthday.getFullYear(),
        nextBirthday.getMonth(),
        nextBirthday.getDate(),
      ) -
      Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      )
    ) / 86_400_000,
  );
  const displayDob = nextBirthday.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  return { ...person, remaining, displayDob };
};

export const getNextBirthDay = (dob: string): Date => {
  const today = new Date();

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const [, month, day] = dob.split("-").map(Number);

  const next = new Date(
    today.getFullYear(),
    month - 1,
    day,
  );

  if (next < startOfToday) {
    next.setFullYear(today.getFullYear() + 1);
  }

  return next;
};

export const extractYear = async (file: File): Promise<number> => {
  const currentYear = new Date().getFullYear();

  try {
    const tags = await ExifReader.load(file);

    const dateTaken =
      tags["DateTimeOriginal"]?.description ||
      tags["DateTimeDigitized"]?.description ||
      tags["DateTime"]?.description;

    if (dateTaken) {
      const year = parseInt(dateTaken.split(":")[0], 10);

      if (!isNaN(year) && year > 1900 && year <= currentYear + 1) {
        return year;
      }
    }
  } catch {
    console.warn("EXIF read failed, falling back to current year.");
  }
  return currentYear;
};
