import { Icon, SectionHeading, sectionX } from "./ui";

const cadence = [
  "90 min focused lessons",
  "1 live implementation lab",
  "1 mentor code review",
  "Async studio + peer feedback",
];

const modules = [
  {
    weeks: "01–02",
    icon: "brain-circuit",
    title: "Model intuition",
    description: "Transformers, embeddings, prompting patterns, and API fluency.",
  },
  {
    weeks: "03–04",
    icon: "network",
    title: "Grounded systems",
    description: "Retrieval, chunking, reranking, citations, and tool use.",
  },
  {
    weeks: "05–06",
    icon: "scan-search",
    title: "Quality by design",
    description: "Evaluation datasets, observability, safety, latency, and cost.",
  },
  {
    weeks: "07–08",
    icon: "rocket",
    title: "Ship and iterate",
    description: "Production architecture, deployment, feedback loops, and demos.",
  },
];

export function Curriculum() {
  return (
    <section
      id="how-it-works"
      className={`flex scroll-mt-[82px] flex-col gap-12 bg-surface py-20 lg:flex-row lg:gap-20 lg:py-28 ${sectionX}`}
    >
      <div className="flex w-full shrink-0 flex-col gap-9 lg:w-[430px]">
        <SectionHeading
          eyebrow="How it works"
          title="A tight loop from concept to shipped system."
          description="Eight weeks of guided practice. Learn a concept, implement it, get feedback, then harden it in a real build."
        />
        <div className="flex flex-col gap-3.5 rounded-[10px] border border-line-strong bg-canvas p-[22px]">
          <span className="text-caption text-cyan">Your weekly cadence</span>
          <ul className="flex flex-col gap-3.5">
            {cadence.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="size-1 shrink-0 bg-cyan" />
                <span className="text-body-s text-ink-2">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ol className="flex min-w-0 flex-1 flex-col">
        {modules.map((mod) => (
          <li
            key={mod.weeks}
            className="flex items-center gap-5 border-b border-line py-[22px]"
          >
            <span className="w-[54px] shrink-0 text-caption text-cyan">
              {mod.weeks}
            </span>
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white/6">
              <Icon name={mod.icon} width={18} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <h3 className="text-h4 text-ink">{mod.title}</h3>
              <p className="text-body-s text-ink-2">{mod.description}</p>
            </div>
            <span className="hidden text-caption text-ink-3 sm:block">
              CORE
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
