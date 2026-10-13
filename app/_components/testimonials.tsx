import { getSiteContent, initials } from "@/lib/magic-api";
import { Icon, SectionHeading, sectionX } from "./ui";

export async function Testimonials() {
  const { testimonials: stories } = await getSiteContent();
  if (stories.length === 0) return null;
  return (
    <section className={`flex flex-col gap-14 py-20 lg:py-28 ${sectionX}`}>
      <SectionHeading
        className="max-w-[720px]"
        eyebrow="Learner signal"
        title="Career momentum you can point to."
        description="Our learners do more than complete lessons. They change roles, raise the quality bar on their teams, and ship systems people trust."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {stories.map((story) => (
          <figure
            key={story.name}
            className="flex flex-col items-start gap-6 rounded-[10px] border border-line-strong bg-surface p-[26px]"
          >
            <Icon name="quote" width={22} />
            <blockquote className="text-body-m text-ink">
              “{story.quote}”
            </blockquote>
            <figcaption className="mt-auto flex w-full items-center gap-3">
              <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-cyan/10 text-caption text-cyan">
                {initials(story.name)}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className="text-label-m text-ink">{story.name}</span>
                <span className="text-caption text-ink-3">{story.role}</span>
              </span>
            </figcaption>
            <div className="flex items-center gap-2 rounded-md bg-white/6 px-2.5 py-[7px]">
              <Icon name="trending-up" width={14} />
              <span className="text-caption text-success">{story.outcome}</span>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
