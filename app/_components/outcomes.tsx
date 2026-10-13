import { getSiteContent } from "@/lib/magic-api";
import { sectionX } from "./ui";

export async function Outcomes() {
  const { outcomes } = await getSiteContent();
  return (
    <section
      className={`flex flex-col gap-8 border-y border-line bg-surface py-11 ${sectionX}`}
    >
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <span className="text-caption text-cyan">{outcomes.eyebrow}</span>
        <p className="text-body-s text-ink-2 md:w-[520px] md:text-right">
          {outcomes.description}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-7 lg:grid-cols-4">
        {outcomes.metrics.map((metric, i) => (
          <div
            key={i}
            className="flex flex-col gap-2.5 border-l border-line-strong pl-5"
          >
            <span className="font-mono text-[28px] font-medium text-ink">
              {metric.value}
            </span>
            <span className="text-body-s text-ink-2">{metric.label}</span>
            <span className="text-caption text-ink-3">{metric.note}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
