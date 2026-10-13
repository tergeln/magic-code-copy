import type { Metadata } from "next"
import { getSiteContent } from "@/lib/magic-api"
import { Footer } from "../_components/footer"
import { Navbar } from "../_components/navbar"
import { SyllabusForm } from "../_components/syllabus-form"
import { Icon, sectionX } from "../_components/ui"

export const metadata: Metadata = {
  title: "Get started — MAGIC CODE AI",
  description:
    "Join the next MAGIC CODE AI cohort and get updates on new courses and lessons."
}

export default async function GetStarted() {
  const { cohort, about } = await getSiteContent()
  return (
    <>
      <Navbar />
      <main className='flex-1'>
        <section className={`flex flex-col gap-11 pt-18 pb-14 ${sectionX}`}>
          <div className='flex items-center gap-2.5'>
            <Icon name='live-indicator' width={7} />
            <span className='text-caption text-cyan'>ABOUT</span>
          </div>
          <div className='flex flex-col justify-between gap-6 md:flex-row md:items-end'>
            <h1 className='text-[36px] leading-[1.06] font-medium tracking-[-0.9px] text-ink md:w-130 md:text-[46px] md:tracking-[-1.15px]'>
              GET STARTED
            </h1>
            <p className='text-body-m text-ink-2 md:w-[518px]'>{about.intro}</p>
          </div>
          <div className='h-px w-full bg-line' />
        </section>
        <section
          className={`flex flex-col items-center gap-12 pt-12 pb-20 lg:flex-row lg:gap-18 lg:pb-[362px] ${sectionX}`}
        >
          <div className='flex min-w-0 flex-1 flex-col gap-5'>
            <span className='text-caption text-cyan'>
              {cohort.label}
            </span>
            <h2 className='text-[32px] leading-[1.08] font-medium tracking-[-0.8px] text-ink md:text-[46px] md:tracking-[-1.15px]'>
              {cohort.title}
            </h2>
            <p className='text-body-s text-ink-2'>{cohort.updatesCopy}</p>
            <ul className='flex flex-wrap gap-x-6 gap-y-3'>
              {cohort.benefits.map(benefit => (
                <li key={benefit} className='flex items-center gap-2'>
                  <Icon name='check' width={14} />
                  <span className='text-caption text-ink-2'>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- responsive web deer haragdna ---- */}
          <div className='hidden md:block'>
            <SyllabusForm
              title={cohort.updatesTitle}
              description={cohort.updatesCopy}
              source='get-started'
            />
          </div>
        </section>

        {/* ---- responsive mobile deer ---- */}
        <div className='block md:hidden'>
          <SyllabusForm
            title={cohort.updatesTitle}
            description={cohort.updatesCopy}
            source='get-started'
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
