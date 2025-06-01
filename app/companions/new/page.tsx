import CompanionForm from "@/components/CompanionForm";
import Image from "next/image";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SlideInAnimation from "@/components/SlideInAnimation";

const NewCompanion = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }
  return (
    <main className="min-h-screen py-10 sm:py-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <article className="border border-gray-400 flex flex-col gap-16 md:gap-0 lg:flex-row w-full max-w-5xl mx-auto rounded-lg  bg-base-100 overflow-hiiden">
          <CompanionForm />

        {/* Right Side Start Here */}
        <SlideInAnimation
          direction="right"
          delay={1.5}
          className="hidden lg:flex lg:w-1/2 rounded-tr-lg rounded-br-lg items-center justify-center bg-cta"
        >
          <div className="w-full max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <Image
                src={"/images/cta.svg"}
                alt="Call to Action"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-center space-y-4">
              <h2 className="text-xl gradient-text">
                Build Smarter Lessons — Powered by AI
              </h2>
              <p className="text-gray-300">
                Build your own AI companion to assist students, answer
                questions, and support learning anytime
              </p>
            </div>
          </div>
        </SlideInAnimation>

        {/* Right Side End Here */}
      </article>
    </main>
  );
};

export default NewCompanion;
