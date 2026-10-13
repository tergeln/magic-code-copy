import type { Metadata } from "next"
import Image from "next/image"
import { getSiteContent } from "@/lib/magic-api"
import { Footer } from "../_components/footer"
import { Navbar } from "../_components/navbar"
import { Icon, sectionX } from "../_components/ui"

export const metadata: Metadata = {
  title: "About us — MAGIC CODE AI",
  description:
    "MAGIC CODE AI is led by Enkhtuya Tsogtbaatar, Ph.D. (National Taiwan University), a computer science lecturer with 19+ years of teaching experience at the National University of Mongolia and 20+ published research papers in deep learning, biometrics, and information security."
}

const disciplines = [
  { icon: "about-database", title: "Data", detail: "UNDERSTAND · MODEL" },
  {
    icon: "about-sparkles",
    title: "Artificial intelligence",
    detail: "APPLY · EVALUATE"
  },
  { icon: "code-2", title: "Programming", detail: "BUILD · ITERATE" },
  { icon: "about-network", title: "Modern IT", detail: "CONNECT · OPERATE" }
]

function FounderPhoto({ alt }: { alt: string }) {
  return (
    <div className='relative h-[360px] w-[318px] max-w-full shrink-0 overflow-hidden rounded-[10px] bg-[#090b10]'>
      <Image
        src='/bagsh.jpg'
        alt={alt}
        fill
        sizes='318px'
        className='object-cover object-[65%_25%]'
      />
      <div className='absolute inset-0 bg-linear-to-t from-[#090b10] via-transparent to-[#090b10]/40' />
      <div className='absolute top-5 left-5 flex items-center gap-2 rounded-full bg-black/40 px-2.5 py-[7px] backdrop-blur'>
        <Icon name='status-dot' width={5} />
        <span className='text-caption text-ink-2'>MAGIC CODE AI</span>
      </div>
      <span className='absolute bottom-5 left-5 text-caption whitespace-nowrap text-ink-2'>
        LEADERSHIP / EDUCATION / TECHNOLOGY
      </span>
    </div>
  )
}

export default async function AboutUs() {
  const { about } = await getSiteContent()
  return (
    <>
      <Navbar />
      <main className='flex-1'>
        <section className={`flex my-4 flex-col gap-11 pb-14 ${sectionX}`}>
          <div className='flex items-center gap-2.5'>
            <Icon name='live-indicator' width={7} />
            <span className='text-caption text-cyan'>ABOUT</span>
          </div>
          <div className='flex flex-col justify-between gap-6 md:flex-row md:items-end'>
            <h1 className='text-[36px] leading-[1.06] font-medium tracking-[-0.9px] text-ink md:w-[520px] md:text-[46px] md:tracking-[-1.15px]'>
              ABOUT US
            </h1>
            <p className='text-body-m text-ink-2 md:w-[518px]'>{about.intro}</p>
          </div>
          <div className='h-px w-full bg-line' />
        </section>

        <section className={`flex flex-col gap-20 pt-4 pb-16 ${sectionX}`}>
          <article className='flex min-h-[286px] flex-col items-center gap-8 rounded-2xl border border-line-strong bg-canvas p-[18px] shadow-[0_20px_48px_rgba(0,0,0,0.24)] md:flex-row md:gap-[52px]'>
            <FounderPhoto
              alt={`${about.founderName}, ${about.founderRole} of MAGIC CODE AI`}
            />
            <div className='flex min-w-0 flex-1 flex-col gap-[18px]'>
              <span className='text-caption text-cyan uppercase'>
                {about.founderRole}
              </span>
              <h2 className='text-h4 text-ink'>
                {about.founderName} — {about.founderRole} of MAGIC CODE AI
              </h2>
              <div className='h-px w-12 bg-cyan' />
              <p className='max-w-[650px] text-body-s text-ink-2'>
                {about.founderBio}
              </p>
            </div>
          </article>

          <div className='flex max-w-[440px] flex-col gap-6'>
            <div className='flex items-center gap-3'>
              <span className='text-caption text-ink-3'>01</span>
              <div className='h-px w-[30px] bg-line-strong' />
              <span className='text-caption text-cyan'>FOUNDER PROFILE</span>
            </div>
            <h2 className='text-h3 text-ink'>
              19 years in the classroom. Now building AI that ships.
            </h2>
            <p className='text-body-s text-ink-2'>
              Enkhtuya Tsogtbaatar holds a Ph.D. in Computer Science from
              National Taiwan University, has taught 19 university courses at
              the National University of Mongolia, and has published 20+
              research papers on deep learning, biometrics, and information
              security.
            </p>
          </div>

          <ul className='grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4'>
            {[
              { value: "19+", label: "YEARS TEACHING" },
              { value: "20+", label: "RESEARCH PAPERS" },
              { value: "5", label: "LANGUAGES" },
              { value: "19", label: "COURSES TAUGHT" }
            ].map(stat => (
              <li
                key={stat.label}
                className='flex min-h-[126px] flex-col justify-between gap-[18px] rounded-[10px] border border-line-strong bg-surface p-[18px]'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex size-[34px] items-center justify-center rounded-md bg-cyan/10'>
                    <Icon name='status-dot' width={5} />
                  </div>
                  <Icon name='status-dot' width={5} />
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-h4 text-ink'>{stat.value}</span>
                  <span className='text-caption text-ink-3'>{stat.label}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className='grid gap-3.5 md:grid-cols-2'>
            <div className='flex flex-col gap-5 rounded-2xl border border-line-strong bg-canvas p-[18px] shadow-[0_20px_48px_rgba(0,0,0,0.24)]'>
              <span className='text-caption text-cyan'>EDUCATION</span>
              <ul className='flex flex-col gap-4'>
                <li className='flex flex-col gap-1 border-b border-line pb-4'>
                  <span className='text-label-m text-ink'>
                    Ph.D. in Computer Science
                  </span>
                  <span className='text-body-s text-ink-2'>
                    National Taiwan University · 2018–2022
                  </span>
                  <span className='text-caption text-ink-3'>GPA 84.17</span>
                </li>
                <li className='flex flex-col gap-1 border-b border-line pb-4'>
                  <span className='text-label-m text-ink'>
                    M.S. in Management &amp; Information Systems
                  </span>
                  <span className='text-body-s text-ink-2'>
                    Kwangwoon University (Korea) &amp; Khauree ICT College ·
                    2003–2007
                  </span>
                  <span className='text-caption text-ink-3'>GPA 4.05</span>
                </li>
                <li className='flex flex-col gap-1'>
                  <span className='text-label-m text-ink'>
                    B.Sc. in Physics &amp; Computer Technology
                  </span>
                  <span className='text-body-s text-ink-2'>
                    Mongolian National University of Education · 1999–2003
                  </span>
                  <span className='text-caption text-ink-3'>GPA 3.84</span>
                </li>
              </ul>
            </div>

            <div className='flex flex-col gap-5 rounded-2xl border border-line-strong bg-canvas p-[18px] shadow-[0_20px_48px_rgba(0,0,0,0.24)]'>
              <span className='text-caption text-cyan'>EXPERIENCE</span>
              <ul className='flex flex-col gap-4'>
                <li className='flex flex-col gap-1 border-b border-line pb-4'>
                  <span className='text-label-m text-ink'>
                    Founder &amp; CEO
                  </span>
                  <span className='text-body-s text-ink-2'>
                    MAGIC CODE AI LLC · 2025 — Present
                  </span>
                </li>
                <li className='flex flex-col gap-1 border-b border-line pb-4'>
                  <span className='text-label-m text-ink'>
                    Lecturer, Computer Science
                  </span>
                  <span className='text-body-s text-ink-2'>
                    National University of Mongolia · 2010 — Present
                  </span>
                </li>
                <li className='flex flex-col gap-1'>
                  <span className='text-label-m text-ink'>
                    Lecturer, Computer Science
                  </span>
                  <span className='text-body-s text-ink-2'>
                    School of Commerce &amp; Industry · 2007–2010
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className='grid gap-3.5 md:grid-cols-2'>
            <div className='flex flex-col gap-5 rounded-2xl border border-line-strong bg-canvas p-[18px] shadow-[0_20px_48px_rgba(0,0,0,0.24)]'>
              <span className='text-caption text-cyan'>
                RESEARCH &amp; PROJECTS
              </span>
              <ul className='flex flex-col gap-3.5'>
                <li className='flex flex-col gap-1'>
                  <span className='text-label-m text-ink'>
                    Deep learning for space-weather ionogram processing
                  </span>
                  <span className='text-body-s text-ink-2'>
                    Interdisciplinary CS × space science project at National
                    Taiwan University, 2020–2022 — 5 international papers
                    published.
                  </span>
                </li>
                <li className='flex flex-col gap-1'>
                  <span className='text-label-m text-ink'>
                    Iris-based biometric recognition
                  </span>
                  <span className='text-body-s text-ink-2'>
                    Data analyst on a Delta Airlines laboratory project,
                    2018–2019.
                  </span>
                </li>
                <li className='flex flex-col gap-1'>
                  <span className='text-label-m text-ink'>
                    Information security law draft team
                  </span>
                  <span className='text-body-s text-ink-2'>
                    Contributed to Mongolia&apos;s data protection legislation,
                    2012.
                  </span>
                </li>
              </ul>
            </div>

            <div className='flex flex-col gap-5 rounded-2xl border border-line-strong bg-canvas p-[18px] shadow-[0_20px_48px_rgba(0,0,0,0.24)]'>
              <span className='text-caption text-cyan'>HONORS</span>
              <ul className='flex flex-col gap-2'>
                <li className='text-body-s text-ink-2'>
                  4th place, AI session — APSCO 18th Congress, 2021
                </li>
                <li className='text-body-s text-ink-2'>
                  Certificate of Honor — National University of Mongolia,
                  2015
                </li>
                <li className='text-body-s text-ink-2'>
                  State Medal of Honored Mother, 2014
                </li>
                <li className='text-body-s text-ink-2'>
                  100% Ph.D. scholarship — National Taiwan University,
                  2018–2022
                </li>
                <li className='text-body-s text-ink-2'>
                  Best Master&apos;s Graduate — Khauree ICT College, 2007
                </li>
              </ul>
            </div>
          </div>

          <div className='flex max-w-[440px] flex-col gap-6'>
            <div className='flex items-center gap-3'>
              <span className='text-caption text-ink-3'>02</span>
              <div className='h-px w-[30px] bg-line-strong' />
              <span className='text-caption text-cyan'>OUR MISSION</span>
            </div>
            <h2 className='text-h3 text-ink'>
              {about.missionTitle}
            </h2>
            <p className='text-body-s text-ink-2'>{about.missionBody}</p>
          </div>

          <ul className='grid gap-3.5 sm:grid-cols-2'>
            {disciplines.map(item => (
              <li
                key={item.title}
                className='flex min-h-[126px] flex-col gap-[18px] rounded-[10px] border border-line-strong bg-surface p-[18px]'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex size-[34px] items-center justify-center rounded-md bg-cyan/10'>
                    <Icon name={item.icon} width={16} />
                  </div>
                  <Icon name='status-dot' width={5} />
                </div>
                <div className='flex flex-col gap-1'>
                  <h3 className='text-label-m text-ink'>{item.title}</h3>
                  <span className='text-caption text-ink-3'>{item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}
