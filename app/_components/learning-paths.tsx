import Link from "next/link";
import { formatPrice, getCourses, levelLabel } from "@/lib/magic-api";
import { CourseCard } from "./course-card";
import { Icon, SectionHeading, sectionX } from "./ui";

export async function LearningPaths() {
  const courses = (await getCourses()).slice(0, 3);
  return (
    <section
      id="paths"
      className={`flex scroll-mt-[82px] flex-col gap-14 py-20 lg:py-28 ${sectionX}`}
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          className="max-w-[720px]"
          eyebrow="Choose your route"
          title="Focused paths. Production-level depth."
          description="Each path combines concise lessons, live workshops, and a portfolio-ready build. Start where you are; leave with evidence of what you can do."
        />
        <Link
          href="/courses"
          className="flex shrink-0 items-center gap-2.5 text-label-m text-ink hover:opacity-80"
        >
          Compare all paths
          <Icon name="arrow-up-right" width={16} />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            chip={course.tagline || [levelLabel(course.level), course.duration].filter(Boolean).join(" · ")}
            title={course.title}
            description={course.shortDescription}
            meta={[course.duration, levelLabel(course.level)].filter(Boolean)}
            footer={formatPrice(course.price, course.currency) ?? course.duration}
            featured={course.featured}
            coverImage={course.coverImage}
            action={{ label: "View path", href: "#enroll" }}
          />
        ))}
      </div>
    </section>
  );
}
