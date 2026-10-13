import { getSiteContent } from "@/lib/magic-api"
import { Icon, SectionHeading, sectionX } from "./ui"

export async function Faq() {
  const { faq, contact } = await getSiteContent()
  const half = Math.ceil(faq.length / 2)
  const columns = [faq.slice(0, half), faq.slice(half)]
  return (
    <section className={`flex flex-col gap-14 py-20 lg:py-28 ${sectionX}`}>
      <SectionHeading
        className='max-w-[720px]'
        eyebrow='FAQ'
        title='Frequently Asked Questions.'
        description='Still deciding? These are the questions we hear most from thoughtful learners and their managers.'
      />
      <div className='grid gap-x-16 md:grid-cols-2'>
        {columns.map((items, i) => (
          <div key={i} className='flex flex-col'>
            {items.map(item => (
              <details
                key={item.question}
                open
                className='group border-b border-line py-[22px]'
              >
                <summary className='flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden'>
                  <span className='min-w-0 flex-1 text-h4 text-ink'>
                    {item.question}
                  </span>
                  <Icon
                    name='plus'
                    width={18}
                    className='transition-transform group-not-open:rotate-90'
                  />
                </summary>
                <p className='mt-3 text-body-s text-ink-2'>{item.answer}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
      <div className='flex flex-wrap items-center gap-2.5 text-[14px]'>
        <span className='text-body-s text-ink-2'>
          Have a different question?
        </span>
        <a
          href={`mailto:${contact.email}`}
          className='text-label-m text-cyan hover:underline'
        >
          {contact.advisorCta}
        </a>
      </div>
    </section>
  )
}
