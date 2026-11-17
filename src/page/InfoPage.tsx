import { PersonCard } from "@/components/person-card";
import { people } from "@/data/people";
import { toPersonView } from "@/lib/utils";
import "react-photo-album/masonry.css";
import { useParams } from "react-router-dom";

// 2. Import Plugin CSS
export const InfoPage = () => {
  const { id } = useParams();
  const person = people.find((p) => p.id === id);

  // The delete function
  if (!person) return <div className="p-10 text-center">Person not found</div>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 py-10 px-4 max-w-screen-2xl mx-auto">
      <div className="flex justify-center items-center flex-col gap-6">
        <PersonCard {...toPersonView(person)} />
      </div>

      <div className="mt-8"></div>
    </div>
  );
};
