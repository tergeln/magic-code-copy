import { Faq } from "./_components/faq"
import { Hero } from "./_components/hero"
import { Navbar } from "./_components/navbar"
import { Footer } from "./_components/footer"
import { Outcomes } from "./_components/outcomes"
import { Curriculum } from "./_components/curriculum"
import { Enrollment } from "./_components/enrollment"
import { Testimonials } from "./_components/testimonials"
import { LearningPaths } from "./_components/learning-paths"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className='flex-1'>
        <Hero />
        <Outcomes />
        <LearningPaths />
        <Curriculum />
        <Testimonials />
        <Enrollment />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
