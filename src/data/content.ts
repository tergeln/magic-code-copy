export type Lang = 'mn' | 'en'

export interface Copy {
  mn: string
  en: string
}

export interface Skill {
  en: string
  mn: string
  x: number
  y: number
}

export const skills: Skill[] = [
  { en: 'Python', mn: 'Python', x: 0.66, y: 0.3 },
  { en: 'SQL', mn: 'SQL', x: 0.84, y: 0.46 },
  { en: 'Power BI', mn: 'Power BI', x: 0.74, y: 0.68 },
  { en: 'RAG', mn: 'RAG', x: 0.52, y: 0.52 },
  { en: 'Machine learning', mn: 'Машин сургалт', x: 0.58, y: 0.78 },
  { en: 'Digital skills', mn: 'Дижитал ур чадвар', x: 0.4, y: 0.3 },
  { en: 'Cybersecurity', mn: 'Кибер аюулгүй байдал', x: 0.3, y: 0.62 },
]

export const techLabels = ['Python', 'Power BI', 'SQL', 'OpenAI', 'GitHub', 'RAG']

export const motionLabels: Record<Lang, string[]> = {
  mn: ['Бодит төсөл', 'Багшийн зөвлөгөө', 'Вэбсайт хөгжүүлэлт', 'Санаагаа бүтээ'],
  en: ['Real projects', 'Mentor reviews', 'Website development', 'Build your idea'],
}

export interface NamedCourse {
  mn: string
  en: string
}

export const enrollable: NamedCourse[] = [
  { mn: 'VIP цогц сургалт', en: 'VIP Course' },
  { mn: 'Өгөгдлийн шинжилгээ ба Power BI', en: 'Data Analysis & Power BI' },
  { mn: 'Компьютерын хэрэглээ', en: 'Computer Skills' },
]

export interface HomeCourse {
  index: number
  art: 'code' | 'chart' | 'keys'
  tag: Copy
  title: Copy
  body: Copy
  meta: Copy
  status: Copy
  cta: Copy
}

export const homeCourses: HomeCourse[] = [
  {
    index: 0,
    art: 'code',
    tag: { mn: 'ХИЙМЭЛ ОЮУН БА ХӨГЖҮҮЛЭЛТ', en: 'AI & DEVELOPMENT' },
    title: { mn: 'VIP цогц сургалт', en: 'VIP Course' },
    body: {
      mn: 'Суурь ойлголтоос AI төсөл хүртэлх цогц хөтөлбөр.',
      en: 'A complete path from fundamentals to your own AI project.',
    },
    meta: { mn: 'Бүх түвшин · Төсөлд суурилсан', en: 'All levels · Project-based' },
    status: { mn: 'Удахгүй', en: 'Coming soon' },
    cta: { mn: 'Хүлээлгийн жагсаалт ↗', en: 'Join waitlist ↗' },
  },
  {
    index: 1,
    art: 'chart',
    tag: { mn: 'ӨГӨГДӨЛ БА ШИНЖИЛГЭЭ', en: 'DATA & ANALYTICS' },
    title: { mn: 'Өгөгдлийн шинжилгээ ба Power BI', en: 'Data Analysis & Power BI' },
    body: {
      mn: 'Өгөгдлөө ойлгож, шийдвэр гаргахад туслах тайлан бүтээгээрэй.',
      en: 'Understand your data. Build dashboards that inform decisions.',
    },
    meta: { mn: 'Анхан → Ахисан · SQL, Python, Power BI', en: 'Beginner → Advanced · SQL, Python, Power BI' },
    status: { mn: 'Бүртгэл нээлттэй', en: 'Enrollment open' },
    cta: { mn: 'Сургалт авах ↗', en: 'Take this course ↗' },
  },
  {
    index: 2,
    art: 'keys',
    tag: { mn: 'ДИЖИТАЛ СУУРЬ ЧАДВАР', en: 'DIGITAL FOUNDATIONS' },
    title: { mn: 'Компьютерын хэрэглээ', en: 'Computer Skills' },
    body: {
      mn: 'Дижитал ертөнцөд өөртөө итгэлтэй ажиллах суурь чадвар.',
      en: 'Build confidence with the everyday tools of the digital world.',
    },
    meta: { mn: 'Анхан шат · Практик дасгалууд', en: 'Beginner friendly · Practical exercises' },
    status: { mn: 'Удахгүй', en: 'Coming soon' },
    cta: { mn: 'Хүлээлгийн жагсаалт ↗', en: 'Join waitlist ↗' },
  },
]

export const codeArt: Copy = {
  mn: '&gt; сайн уу, ирээдүй.<br>def sanaagaa_buteeh():<br>&nbsp; return bolomj<br><span style="color:#b8d5a9">✓ бүтээхэд бэлэн</span>',
  en: '&gt; hello, future.<br>def build_your_idea():<br>&nbsp; return possibility<br><span style="color:#b8d5a9">✓ ready to create</span>',
}

export type CourseCategory = 'Code' | 'Data' | 'AI' | 'Digital'

export interface CatalogCourse {
  category: CourseCategory
  art: 0 | 1 | 2
  symbol: string
  status: Copy
  title: Copy
  body: Copy
  enroll?: number
}

const soon: Copy = { mn: 'Удахгүй', en: 'Coming soon' }
const planned: Copy = { mn: 'Төлөвлөж буй чиглэл · Элсэлт нээгдээгүй', en: 'Planned track · Not open yet' }

export const catalogFilters: { id: 'all' | CourseCategory; label: Copy }[] = [
  { id: 'all', label: { mn: 'Бүгд', en: 'All' } },
  { id: 'Code', label: { mn: 'Программчлал', en: 'Programming' } },
  { id: 'Data', label: { mn: 'Өгөгдөл', en: 'Data' } },
  { id: 'AI', label: { mn: 'Хиймэл оюун', en: 'AI' } },
  { id: 'Digital', label: { mn: 'Дижитал чадвар', en: 'Digital skills' } },
]

export const catalog: CatalogCourse[] = [
  {
    category: 'AI',
    art: 0,
    symbol: '{ }',
    status: soon,
    title: { mn: 'VIP цогц сургалт', en: 'VIP Course' },
    body: { mn: 'Суурь ойлголтоос AI төсөл хүртэлх цогц хөтөлбөр.', en: 'A complete path from fundamentals to an AI project.' },
    enroll: 0,
  },
  {
    category: 'Data',
    art: 1,
    symbol: 'SQL',
    status: { mn: 'Бүртгэл нээлттэй', en: 'Enrollment open' },
    title: { mn: 'Өгөгдлийн шинжилгээ ба Power BI', en: 'Data Analysis & Power BI' },
    body: { mn: 'SQL, Python болон Power BI ашиглан өгөгдөл шинжилж, тайлан бүтээх.', en: 'Analyse data and build reports with SQL, Python and Power BI.' },
    enroll: 1,
  },
  {
    category: 'Digital',
    art: 2,
    symbol: '✧',
    status: soon,
    title: { mn: 'Компьютерын хэрэглээ', en: 'Computer Skills' },
    body: { mn: 'Компьютерын үндсэн хэрэглээ, файл болон өдөр тутмын дижитал хэрэгслүүд.', en: 'Computer basics, files and everyday digital tools.' },
    enroll: 2,
  },
  {
    category: 'Code',
    art: 0,
    symbol: '{ }',
    status: soon,
    title: { mn: 'Python программчлал', en: 'Python Programming' },
    body: { mn: 'Python хэлний суурь, өгөгдлийн бүтэц, автоматжуулалт.', en: 'Python fundamentals, data structures and automation.' },
  },
  {
    category: 'Code',
    art: 1,
    symbol: 'SQL',
    status: soon,
    title: { mn: 'Вэб хөгжүүлэлт', en: 'Web Development' },
    body: { mn: 'HTML, CSS, JavaScript ашиглан вэбсайт бүтээх суурь.', en: 'Build websites with HTML, CSS and JavaScript.' },
  },
  {
    category: 'Data',
    art: 2,
    symbol: '✧',
    status: soon,
    title: { mn: 'SQL ба өгөгдлийн сан', en: 'SQL & Databases' },
    body: { mn: 'Өгөгдлийн сангийн зохион байгуулалт, хайлт болон шинжилгээ.', en: 'Database design, queries and analysis.' },
  },
  {
    category: 'AI',
    art: 0,
    symbol: '{ }',
    status: soon,
    title: { mn: 'AI ба RAG систем', en: 'AI & RAG Systems' },
    body: { mn: 'Эх сурвалжид тулгуурласан AI туслах бүтээх ойлголтууд.', en: 'Explore grounded AI assistants and retrieval.' },
  },
  {
    category: 'AI',
    art: 1,
    symbol: 'SQL',
    status: soon,
    title: { mn: 'Машин сургалт', en: 'Machine Learning' },
    body: { mn: 'Өгөгдөл бэлтгэх, загвар сургах, үр дүнг үнэлэх суурь.', en: 'Prepare data, train models and evaluate results.' },
  },
  {
    category: 'Digital',
    art: 2,
    symbol: '✧',
    status: soon,
    title: { mn: 'Кибер аюулгүй байдал', en: 'Cybersecurity' },
    body: { mn: 'Дижитал мэдээлэл, бүртгэл болон системээ хамгаалах суурь.', en: 'Foundations for protecting accounts, information and systems.' },
  },
]

export const plannedNote = planned

export interface Story {
  id: number
  number: string
  art: number
  category: Copy
  title: Copy
  summary: Copy
}

export const stories: Story[] = [
  {
    id: 1,
    number: '01',
    art: 0,
    category: { mn: 'Байгаль орчин · Жишээ', en: 'Environment · Sample' },
    title: { mn: 'Мод тарих өдөр', en: 'Tree planting day' },
    summary: { mn: 'Ногоон орчны төлөөх хамтын санаачилга, оролцогчдын дурсамжийг энд хуваалцана.', en: 'Share the community initiative for greener spaces and participants’ stories here.' },
  },
  {
    id: 2,
    number: '02',
    art: 1,
    category: { mn: 'Боловсрол · Жишээ', en: 'Education · Sample' },
    title: { mn: 'Суралцах боломжийг дэмжих тэтгэлэг', en: 'Scholarships for learning' },
    summary: { mn: 'Тэтгэлгийн зорилго, хамрах хүрээ, оролцох нөхцөлийг энд танилцуулна.', en: 'Introduce the scholarship’s purpose, scope and eligibility here.' },
  },
  {
    id: 3,
    number: '03',
    art: 2,
    category: { mn: 'Хамт олон · Жишээ', en: 'Community · Sample' },
    title: { mn: 'Технологитой танилцах нээлттэй өдөр', en: 'Technology open day' },
    summary: { mn: 'Нээлттэй уулзалтын хөтөлбөр, онцлох агшнуудыг энд нийтэлнэ.', en: 'Publish the open day programme and highlights here.' },
  },
  {
    id: 4,
    number: '04',
    art: 3,
    category: { mn: 'Сургалт · Жишээ', en: 'Learning · Sample' },
    title: { mn: 'Дижитал ур чадварын сургалт', en: 'Digital skills workshop' },
    summary: { mn: 'Сургалтын сэдэв, хамрагдсан оролцогчид, бүтээлүүдийг энд танилцуулна.', en: 'Present workshop topics, participants and their work here.' },
  },
  {
    id: 5,
    number: '05',
    art: 0,
    category: { mn: 'Төсөл · Жишээ', en: 'Projects · Sample' },
    title: { mn: 'Суралцагчдын бүтээлийн өдөр', en: 'Student project showcase' },
    summary: { mn: 'Суралцагчдын төсөл, шийдэл болон туршлагыг энд хуваалцана.', en: 'Share student projects, solutions and experiences here.' },
  },
  {
    id: 6,
    number: '06',
    art: 1,
    category: { mn: 'Сайн дурын ажил · Жишээ', en: 'Volunteering · Sample' },
    title: { mn: 'Мэдлэгээ хуваалцах сайн дурын өдөр', en: 'Volunteer knowledge sharing' },
    summary: { mn: 'Сайн дурын оролцоо, хамтын ажлын түүхийг энд нийтэлнэ.', en: 'Publish volunteer stories and collaborative activities here.' },
  },
  {
    id: 7,
    number: '07',
    art: 2,
    category: { mn: 'Хамтын ажиллагаа · Жишээ', en: 'Partnerships · Sample' },
    title: { mn: 'Боловсролын төлөөх хамтын ажиллагаа', en: 'Partnerships for education' },
    summary: { mn: 'Хамтарсан санаачилгын зорилго, явц болон үр дүнг энд танилцуулна.', en: 'Introduce joint initiatives, their progress and outcomes here.' },
  },
  {
    id: 8,
    number: '08',
    art: 3,
    category: { mn: 'Уулзалт · Жишээ', en: 'Events · Sample' },
    title: { mn: 'Мэргэжил сонголт ба технологийн ирээдүй', en: 'Careers and the future of technology' },
    summary: { mn: 'Зөвлөгөө, ярилцлага болон уулзалтын гол санаануудыг энд хуваалцана.', en: 'Share career advice, conversations and event takeaways here.' },
  },
]

export interface Activity {
  number: string
  title: Copy
  body: Copy
}

export const activities: Activity[] = [
  {
    number: '01 /',
    title: { mn: 'Сургалт & дадлага', en: 'Courses & live labs' },
    body: { mn: 'Шаталсан хөтөлбөр, практик дасгал, өөрийн гараар бүтээх төслүүд.', en: 'Structured learning, hands-on exercises and projects you build yourself.' },
  },
  {
    number: '02 /',
    title: { mn: 'Дадлага сургалт ба уулзалт', en: 'Workshops & meetups' },
    body: { mn: 'Технологийн шинэ санаа, туршлагаа хуваалцах нээлттэй уулзалтууд.', en: 'A place for fresh technology ideas, shared experiences and conversations.' },
  },
  {
    number: '03 /',
    title: { mn: 'Вэбсайт хөгжүүлэлт', en: 'Website development' },
    body: {
      mn: 'Байгууллагын танилцуулга, онлайн дэлгүүр, хувийн портфолио болон бусад төрлийн вэбсайтыг таны хэрэгцээнд тохируулан загварчилж, хөгжүүлнэ.',
      en: 'We design and build business websites, online stores, personal portfolios and more, tailored to your needs.',
    },
  },
]

export interface JourneyStep {
  kicker: Copy
  title: Copy
  body: Copy
  visual: Copy
}

export const journey: JourneyStep[] = [
  {
    kicker: { mn: '01 / Танин мэдэх', en: '01 / Explore' },
    title: { mn: 'Сууриа ойлгох', en: 'Model intuition' },
    body: { mn: 'Суурь ойлголтоос эхэлж, санаа, хэрэгсэл, боломжуудаа танин мэднэ.', en: 'Start with the foundations. Explore the ideas, tools and possibilities.' },
    visual: { mn: '✳', en: '✳' },
  },
  {
    kicker: { mn: '02 / Бүтээх', en: '02 / Build' },
    title: { mn: 'Мэдлэгээ хэрэгжүүлэх', en: 'Grounded systems' },
    body: { mn: 'Онолыг ажилладаг төсөл болгоно. Өгөгдлөө өөрийн санаатай холбоно.', en: 'Turn concepts into a working project. Connect your data with your ideas.' },
    visual: { mn: '{ бүтээх }', en: '{ create }' },
  },
  {
    kicker: { mn: '03 / Сайжруулах', en: '03 / Refine' },
    title: { mn: 'Чанарыг чухалчлах', en: 'Quality by design' },
    body: { mn: 'Таамгаа шалгаж, үр дүнгээ үнэлэн, бүтээлээ сайжруулна.', en: 'Test your assumptions. Review the results. Make your work better.' },
    visual: { mn: '↗', en: '↗' },
  },
  {
    kicker: { mn: '04 / Хуваалцах', en: '04 / Share' },
    title: { mn: 'Нэвтрүүлж хөгжүүлэх', en: 'Ship and iterate' },
    body: { mn: 'Өөрөө нээж, тайлбарлаж, бусадтай хуваалцах бодит бүтээлтэй болно.', en: 'A real project to open, explain and share. Your next chapter starts here.' },
    visual: { mn: '</>', en: '</>' },
  },
]

export interface Showpiece {
  mn: string
  en: string
  alt: string
  href: string
  src: string
  original: string
}

export const showpieces: Showpiece[] = [
  {
    mn: 'Монограмм',
    en: 'Monogram',
    alt: 'Monogram large tote bag',
    href: 'https://us.louisvuitton.com/eng-us/products/neverfull-mm-monogram-nvprod5350101v/M46975',
    src: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-mm--M46975_PM2_Front%20view.jpg?wid=1800&hei=1800&fit=constrain&qlt=95',
    original: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-mm--M46975_PM2_Front%20view.jpg',
  },
  {
    mn: 'Бор шатрын хээ',
    en: 'Damier Ébène',
    alt: 'Damier Ébène large tote bag',
    href: 'https://us.louisvuitton.com/eng-us/products/neverfull-mm-damier-ebene-nvprod5350103v/N40599',
    src: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-mm--N40599_PM2_Front%20view.jpg?wid=1800&hei=1800&fit=constrain&qlt=95',
    original: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-mm--N40599_PM2_Front%20view.jpg',
  },
  {
    mn: 'Цайвар шатрын хээ',
    en: 'Damier Azur',
    alt: 'Damier Azur large tote bag',
    href: 'https://us.louisvuitton.com/eng-us/products/neverfull-mm-damier-azur-nvprod5350102v/N40604',
    src: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-mm--N40604_PM2_Front%20view.jpg?wid=1800&hei=1800&fit=constrain&qlt=95',
    original: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-neverfull-mm--N40604_PM2_Front%20view.jpg',
  },
]

export const savedMerch: (Copy & { emblem: string })[] = [
  { mn: 'Өдөр тутмын кодтой цамц', en: 'Everyday Code Tee', emblem: '✧' },
  { mn: 'Санаагаа багтаах даавуун цүнх', en: 'Ideas Inside Tote', emblem: '♧' },
  { mn: 'Шидэт наалтын багц', en: 'Little Magic Sticker Pack', emblem: '✦' },
]

export interface Lesson {
  id: string
  mn: string
  en: string
  creator: string
}

export const lessons: Lesson[] = [
  { id: 'g0m5sEHPU-s', mn: 'Power BI суулгах ба анхны дүрслэл', en: 'Install Power BI & your first visualization', creator: 'Alex The Analyst' },
  { id: 'HXV3zeQKqGY', mn: 'SQL ба өгөгдлийн сангийн суурь', en: 'SQL & database fundamentals', creator: 'freeCodeCamp.org' },
  { id: 'rfscVS0vtbw', mn: 'Python программчлалын суурь', en: 'Python programming fundamentals', creator: 'freeCodeCamp.org' },
  { id: 'I0vQ_VLZTWg', mn: 'Power BI тайлан ба төсөл', en: 'Power BI dashboards & full project', creator: 'Alex The Analyst' },
]

export function pick(copy: Copy, lang: Lang) {
  return lang === 'mn' ? copy.mn : copy.en
}
