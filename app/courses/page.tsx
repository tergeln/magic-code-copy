import type { Metadata } from "next"
import { getCourses, type Course } from "@/lib/magic-api"
import { CourseCard } from "../_components/course-card"
import { Footer } from "../_components/footer"
import { Navbar } from "../_components/navbar"
import { Icon } from "../_components/ui"

export const metadata: Metadata = {
  title: "Courses — MAGIC CODE AI",
  description:
    "Choose your learning track: Data Analysis & Power BI, or the 1-year VIP course from CS foundations to intelligent systems."
}

const sectionX = "px-6 md:px-12 lg:px-[88px]"

const courses = [
  {
    chip: "BEGINNER • INTERMEDIATE • ADVANCED",
    title: "1. DATA ANALYSIS & POWER BI",
    description:
      "Progress from data fundamentals and structured analysis to Power BI dashboards, then advanced analytics and insight communication.",
    meta: ["COURSE 01"],
    footer: "3 LEVELS",
    action: { label: "Compare course", href: "#overview" }
  },
  {
    chip: "ELITE • INTENSIVE • 1 YEAR",
    title: "2. VIP Course",
    description:
      "A complete-stack program spanning computer science foundations, AI, Data Science, networking, and research ethics.",
    meta: ["COURSE 02"],
    footer: "1 YEAR",
    action: { label: "Currently viewing", href: "#overview" },
    featured: true
  }
]

const programAreas = [
  "CS foundations",
  "Algorithms",
  "AI + Data Science",
  "Networks + Security"
]

const pad = (n: number) => String(n).padStart(2, "0")

function CourseSelector() {
  return (
    <section
      className={`flex flex-col gap-10 bg-navy pt-7 pb-[72px] ${sectionX}`}
    >
      <div className='flex flex-wrap items-center justify-between gap-6'>
        <div className='flex items-center gap-2.5'>
          <span className='h-1 w-6 rounded-full bg-sky' />
          <span className='text-caption text-snow'>
            Technical academy · Course catalogue
          </span>
        </div>
        <div className='flex items-center gap-8'>
          <div className='flex flex-col gap-[3px]'>
            <span className='font-mono text-[13px] font-semibold tracking-[0.52px] text-sky'>
              02
            </span>
            <span className='text-caption text-mist'>Courses</span>
          </div>
          <div className='h-8 w-px bg-navy-2' />
          <div className='flex flex-col gap-[3px]'>
            <span className='font-mono text-[13px] font-semibold tracking-[0.52px] text-sky'>
              01
            </span>
            <span className='text-caption text-mist'>Expanded</span>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-between gap-6 md:flex-row md:items-end'>
        <div className='flex max-w-[820px] flex-col gap-3.5'>
          <span className='text-caption text-sky'>
            Choose your learning track
          </span>
          <h1 className='text-[36px] leading-[1.05] tracking-[-1.08px] text-snow md:text-[52px] md:tracking-[-1.56px]'>
            Technical depth, mapped clearly.
          </h1>
        </div>
        <div className='flex shrink-0 items-center gap-2.5 self-start rounded-full bg-navy-2 px-3 py-[9px] md:self-auto'>
          <Icon name='mouse-pointer-2' width={14} />
          <span className='text-caption text-mist'>VIP course selected</span>
        </div>
      </div>

      <div className='grid gap-5 md:grid-cols-2'>
        {courses.map(course => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>
    </section>
  )
}

function CourseOverview({ modules }: { modules: Course[] }) {
  return (
    <section
      id='overview'
      className={`flex scroll-mt-[82px] flex-col gap-9 bg-paper py-[72px] ${sectionX}`}
    >
      <div className='flex flex-col justify-between gap-6 md:flex-row md:items-end'>
        <div className='flex max-w-[720px] flex-col gap-3'>
          <span className='text-caption text-blue'>02 / VIP Course</span>
          <h2 className='text-[32px] leading-[1.08] tracking-[-0.8px] text-slate md:text-[44px] md:tracking-[-1.1px]'>
            Course Overview
          </h2>
        </div>
        <div className='flex shrink-0 items-center gap-[9px] self-start rounded-full bg-paper-blue px-[13px] py-[9px] md:self-auto'>
          <span className='size-[7px] rounded-full bg-blue' />
          <span className='text-caption text-blue'>
            Primary expanded detail
          </span>
        </div>
      </div>

      <div className='flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_14px_36px_rgba(11,28,59,0.07)] lg:flex-row'>
        <div className='flex min-w-0 flex-1 flex-col gap-7 p-6 md:py-10 md:pr-12 md:pl-10'>
          <p className='text-[18px] leading-[1.5] tracking-[-0.126px] text-slate md:text-[23px] md:tracking-[-0.161px]'>
            An elite, intensive 1-year program designed to build high-caliber IT
            leaders, AI engineers, and Data Scientists. This comprehensive
            curriculum takes students through the complete stack of modern
            technology—from core computer science foundations, algorithms, and
            networking to advanced Machine Learning, Deep Learning, Data Mining,
            and Cybersecurity—embedded with academic research ethics.
          </p>
          <div className='h-px w-full bg-rule' />
          <ul className='flex flex-wrap gap-2.5'>
            {programAreas.map(area => (
              <li
                key={area}
                className='flex items-center gap-2 rounded-full border border-rule bg-paper-2 px-3 py-2'
              >
                <span className='size-[5px] rounded-full bg-blue' />
                <span className='text-caption text-slate-2'>{area}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex min-h-[360px] shrink-0 flex-col justify-between gap-8 bg-navy px-[30px] pt-9 pb-[30px] lg:w-[310px]'>
          <div className='flex items-center justify-between'>
            <span className='text-caption text-mist'>Program architecture</span>
            <Icon name='network-sky' width={18} />
          </div>
          <div className='flex flex-col gap-1 font-mono'>
            <span className='text-[72px] leading-[0.95] tracking-[-4.32px] text-snow'>
              {pad(modules.length)}
            </span>
            <span className='text-caption text-sky'>Curriculum modules</span>
          </div>
          <p className='text-body-s text-mist'>
            Foundations first. Intelligent systems and advanced analytics
            follow.
          </p>
        </div>
      </div>
    </section>
  )
}

function Curriculum({ modules }: { modules: Course[] }) {
  const total = pad(modules.length)
  return (
    <section
      className={`flex flex-col gap-10 bg-white pt-[76px] pb-24 ${sectionX}`}
    >
      <div className='h-px w-full bg-rule' />
      <div className='flex flex-col justify-between gap-6 md:flex-row md:items-end'>
        <div className='flex max-w-[720px] flex-col gap-3'>
          <span className='text-caption text-blue'>
            Curriculum / {total} modules
          </span>
          <h2 className='text-[32px] leading-[1.08] tracking-[-0.8px] text-slate md:text-[44px] md:tracking-[-1.1px]'>
            Complete-stack foundations to intelligent systems.
          </h2>
        </div>
        <div className='flex shrink-0 items-center gap-2.5 self-start rounded-lg bg-paper-2 px-3.5 py-2.5 md:self-auto'>
          <Icon name='arrow-down-right' width={16} />
          <span className='text-caption text-slate-2'>
            Core sequence · 01—{total}
          </span>
        </div>
      </div>

      <ol className='grid items-start gap-[18px] md:grid-cols-2'>
        {modules.map((mod, i) => (
          <li key={mod.id} className='contents'>
            <CourseCard
              featured={mod.featured}
              chip={mod.tagline || "VIP • CORE SEQUENCE"}
              title={mod.title}
              description={mod.shortDescription}
              coverImage={mod.coverImage}
              meta={[`MODULE ${pad(i + 1)}`]}
              footer={`${pad(i + 1)} / ${total}`}
              action={{ label: "Curriculum area →", href: "#overview" }}
            />
          </li>
        ))}
      </ol>

      <div className='flex flex-col justify-between gap-4 pt-[18px] md:flex-row md:items-center'>
        <p className='max-w-[760px] text-body-s text-slate-3'>
          The module sequence spans core systems, programming, analytics,
          intelligent systems, and network foundations.
        </p>
        <div className='flex shrink-0 items-center gap-2'>
          <span className='h-0.5 w-[30px] bg-blue' />
          <span className='text-caption text-slate-3'>End of curriculum</span>
        </div>
      </div>
    </section>
  )
}

export default async function Courses() {
  const modules = await getCourses()
  return (
    <>
      <Navbar />
      <main className='flex-1'>
        <CourseSelector />
        <CourseOverview modules={modules} />
        <Curriculum modules={modules} />
      </main>
      <Footer />
    </>
  )
}
