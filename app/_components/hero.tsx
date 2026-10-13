import { getSiteContent } from "@/lib/magic-api";
import { Button, Icon, sectionX } from "./ui";

const stages = [
  {
    icon: "database",
    title: "Knowledge base",
    detail: "2,840 documents · hybrid index",
    status: "READY",
  },
  {
    icon: "sparkles",
    title: "Retrieval + reasoning",
    detail: "rerank / cite / verify",
    status: "RUNNING",
    active: true,
  },
  {
    icon: "shield-check",
    title: "Evaluation suite",
    detail: "faithfulness · latency · cost",
    status: "READY",
  },
];

const summary = [
  { label: "QUALITY SCORE", value: "94.2%", className: "text-success" },
  { label: "P95 LATENCY", value: "1.8s", className: "text-ink" },
  { label: "COST / RUN", value: "$0.04", className: "text-ink" },
];

function ModelWorkspace() {
  return (
    <div className="flex w-full shrink-0 flex-col gap-3.5 rounded-2xl border border-line-strong bg-surface p-[18px] shadow-[0_20px_48px_rgba(0,0,0,0.24)] lg:w-[548px]">
      <div className="flex items-center justify-between">
        <Icon name="window-controls" width={33} height={7} />
        <span className="text-caption text-ink-3">
          project / support-agent-v3
        </span>
        <Icon name="ellipsis" width={16} />
      </div>
      <div className="h-px w-full bg-line" />

      <div className="flex flex-col items-center gap-2.5">
        {stages.map((stage, i) => (
          <div key={stage.title} className="contents">
            {i > 0 && (
              <Icon
                name="connector"
                width={18}
                height={1}
                className="my-[8.5px] rotate-90"
              />
            )}
            <div
              className={`flex w-full items-center gap-3.5 rounded-md border p-4 ${
                stage.active
                  ? "border-cyan bg-cyan/10"
                  : "border-line-strong bg-surface"
              }`}
            >
              <div
                className={`flex size-[34px] shrink-0 items-center justify-center rounded-md ${
                  stage.active ? "bg-cyan/20" : "bg-white/6"
                }`}
              >
                <Icon name={stage.icon} width={16} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="text-label-m text-ink">{stage.title}</p>
                <p className="text-caption text-ink-3">{stage.detail}</p>
              </div>
              <span
                className={`text-caption ${stage.active ? "text-cyan" : "text-ink-3"}`}
              >
                {stage.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-4 rounded-md bg-canvas p-4">
        {summary.map((item) => (
          <div key={item.label} className="flex flex-col gap-1">
            <span className="text-caption text-ink-3">{item.label}</span>
            <span
              className={`font-mono text-xl font-medium sm:text-2xl ${item.className}`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function Hero() {
  const { hero } = await getSiteContent();
  return (
    <section
      id="top"
      className={`flex flex-col items-center gap-[72px] py-16 lg:min-h-[760px] lg:flex-row lg:py-[88px] ${sectionX}`}
    >
      <div className="flex min-w-0 flex-1 flex-col items-start gap-7">
        <div className="flex items-center gap-2.5 rounded-full border border-line-strong bg-white/6 px-3 py-2">
          <Icon name="live-indicator" width={7} />
          <span className="text-caption text-ink-2">
            {hero.badge}
          </span>
        </div>
        <h1 className="text-[44px] leading-[0.98] font-medium tracking-[-1.76px] text-ink sm:text-[56px] xl:text-[72px] xl:tracking-[-2.88px]">
          {hero.title}
        </h1>
        <p className="max-w-[600px] text-body-m text-ink-2">
          {hero.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button href="#paths" size="lg">
            {hero.primaryCta}
          </Button>
          <Button href="#enroll" size="lg" variant="outline">
            {hero.secondaryCta}
          </Button>
        </div>
        <div className="flex items-center gap-5">
          <Icon name="learner-avatars" width={88} height={28} />
          <span className="text-body-s text-ink-2">
            {hero.rating}
          </span>
        </div>
      </div>
      <ModelWorkspace />
    </section>
  );
}
