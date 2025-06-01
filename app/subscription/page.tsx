
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedTitle from "@/components/AnimatedTitle";
import { PricingTable } from "@clerk/nextjs";

const Subscription = () => {
  return (
    <main className="flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 mb-10">
          <AnimatedTitle className="gradient-text">
            Choose the plan that's right for you
          </AnimatedTitle>
        </div>
      <AnimatedSection>
        <PricingTable />
        </AnimatedSection>
        </div>
    </main>
  );
};

export default Subscription;
