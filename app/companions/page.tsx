import AnimatedSection from "@/components/AnimatedSection";
import AnimatedTitle from "@/components/AnimatedTitle";
import CompanionCard from "@/components/CompanionCard";
import FilterInput from "@/components/FilterInput";
import SearchInput from "@/components/SearchInput";
import { getAllCompanions } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  //! 1-Get all companions:
  const companions = await getAllCompanions({ subject, topic });
  return (
    <main className="container mx-auto px-4">
      <section className="flex w-full justify-between gap-4 max-sm:flex-col">
        <AnimatedTitle className="gradient-text">
          Companions Library
        </AnimatedTitle>
        <div className="flex items-center lg:flex-row flex-col gap-4">
          <SearchInput />
          <FilterInput />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {companions.map((companion) => (
          <CompanionCard
            key={companion?.id}
              {...companion}
              color={getSubjectColor(companion?.subject)}
            />
        ))}
      </section>

    </main>
  );
};

export default CompanionsLibrary;
