import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface ICompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: ICompanionCardProps) => {
  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex items-center justify-between">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
          <Image
            src={"/icons/bookmark.svg"}
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>
      <h2 className="text-lg md:text-2xl font-semibold  text-center">{name}</h2>
      <div className="flex items-center gap-2">
        <Image
          src={"/icons/topic-icon.svg"}
          alt="topic"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm text-gray-700">{topic}</p>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src={"/icons/clock.svg"}
          alt="clock"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm text-gray-700">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <Button className="btn-primary w-full justify-center">
          Lunch Lesson
        </Button>
      </Link>
    </article>
  );
};

export default CompanionCard;
