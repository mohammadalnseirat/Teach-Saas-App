
import { cn, getSubjectColor } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Link from "next/link";
import Image from "next/image";
import SlideInAnimation from "./SlideInAnimation";

interface ICompanionListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({
  title,
  companions,
  classNames,
}: ICompanionListProps) => {
  return (
    <SlideInAnimation className={cn('companion-list', classNames)}>
      <article>
        <h2 className="text-lg md:text-2xl font-bold gradient-text">{title}</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg w-2/3">Lessons</TableHead>
              <TableHead className="text-lg">Subject</TableHead>
              <TableHead className="text-lg text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companions?.map(({ id, subject, name, topic, duration }) => (
              <TableRow key={id} className="border-b border-gray-200">
                <TableCell className="py-4">
                  <Link href={`/companions/${id}`} className="flex items-center gap-4">
                    <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                      <Image
                        src={`/icons/${subject}.svg`}
                        alt={subject}
                        width={35}
                        height={35} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-2xl">
                        {name}
                      </p>
                      <p className="text-lg">
                        {topic}
                      </p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="py-4">
                  <Link href={`/companions/${id}`} className="block">
                    <div className="subject-badge w-fit max-md:hidden">
                      {subject}
                    </div>
                    <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                      <Image
                        src={`/icons/${subject}.svg`}
                        alt={subject}
                        width={18}
                        height={18}
                      />
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="py-4">
                  <Link href={`/companions/${id}`} className="block">
                    <div className="flex items-center gap-2 w-full justify-end">
                      <p className="text-2xl">
                        {duration} {' '}
                        <span className="max-md:hidden">mins</span>
                      </p>
                      <Image src="/icons/clock.svg" alt="minutes" width={14} height={14} className="md:hidden" />
                    </div>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </article>
    </SlideInAnimation>
  )
};

export default CompanionsList;
