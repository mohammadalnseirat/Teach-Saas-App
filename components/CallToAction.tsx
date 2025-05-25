"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <motion.section
      className="cta-section overflow-x-hidden"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 1.5 }}
    >
      <div className="cta-badge">Start learning your way.</div>
      <h2 className="text-2xl font-semibold">
        Build and Personalize Learning Companion
      </h2>
      <p className="text-sm text-gray-300">
        Pick a name, subject, voice, & personality — and start learning through
        voice conversations that feel natural and fun.
      </p>
      <Image
        src={"/images/cta.svg"}
        alt="Call to Action"
        width={362}
        height={232}
      />
      <Button className="btn-primary">
        <Link href={"/companions/new"} className="flex items-center gap-2">
          <Image src={"/icons/plus.svg"} alt="Plus" width={16} height={16} />
          <p>Build a New Companion</p>
        </Link>
      </Button>
    </motion.section>
  );
};

export default CallToAction;
