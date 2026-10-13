import { getSiteContent } from "@/lib/magic-api";
import { SyllabusForm } from "./syllabus-form";
import { Icon, sectionX } from "./ui";

export async function Enrollment() {
  const { cohort } = await getSiteContent();
  return (
    <section
      id="enroll"
      className={`scroll-mt-[82px] bg-surface py-20 lg:py-28 ${sectionX}`}
    >
      <div className="flex flex-col items-center gap-12 rounded-2xl border border-cyan bg-enroll p-6 md:p-12 lg:flex-row lg:gap-[72px]">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <span className="text-caption text-cyan">
            {cohort.label}
          </span>
          <h2 className="text-[32px] leading-[1.08] font-medium tracking-[-0.8px] text-ink md:text-[46px] md:tracking-[-1.15px]">
            {cohort.title}
          </h2>
          <p className="text-body-m text-ink-2">
            {cohort.description}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {cohort.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <Icon name="check" width={14} />
                <span className="text-caption text-ink-2">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <SyllabusForm />
      </div>
    </section>
  );
}
