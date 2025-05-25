import CallToAction from "@/components/CallToAction";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import React from "react";
import { motion } from "framer-motion";
import AnimatedTitle from "@/components/AnimatedTitle";
import AnimatedSection from "@/components/AnimatedSection";
import { recentSessions } from "@/constants";

const Page = () => {
  return (
    <main className="bg-gray-100 min-h-screen ">
      <AnimatedTitle className="font-semibold gradient-text text-3xl sm:text-4xl text-left">
        Popular Companions
      </AnimatedTitle>
      
        <AnimatedSection>
        <section className="home-section">
          <CompanionCard
            id='123'
            name="Neura the Brainy Explorer"
            topic="Neural Network of the Brain"
            subject='Science'
            duration={40}
            color="#E5D0FF"
          />
          <CompanionCard
            id='1234'
            name="Countsy the Number Wizard"
            topic="Derivatives & Integrals"
            subject="maths"
            duration={30}
            color="#FFDA6E"
          />
          <CompanionCard
            id="789"
            name="Verba the Vocabulary Builder"
            topic="language"
            subject="English Literature"
            duration={30}
            color="#BDE7FF"
          />
          </section>
        </AnimatedSection>
      
      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CallToAction />
      </section>
    </main>
  );
};

export default Page;
