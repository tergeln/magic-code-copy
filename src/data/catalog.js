const planned = { mn: 'Төлөвлөж буй чиглэл · Элсэлт нээгдээгүй', en: 'Planned track · Not open yet' };
const soon = { mn: 'Удахгүй', en: 'Coming soon' };

export const catalogFilters = [
  { key: 'all', mn: 'Бүгд', en: 'All' },
  { key: 'Code', mn: 'Программчлал', en: 'Programming' },
  { key: 'Data', mn: 'Өгөгдөл', en: 'Data' },
  { key: 'AI', mn: 'Хиймэл оюун', en: 'AI' },
  { key: 'Digital', mn: 'Дижитал чадвар', en: 'Digital skills' },
];

// `course` байвал нүүр хуудасны бүртгэлийн dialog руу холбоос, `planned` байвал тэмдэглэгээ.
export const catalog = [
  { category: 'AI', art: 0, artText: '{ }', status: soon, course: 0,
    title: { mn: 'VIP цогц сургалт', en: 'VIP Course' },
    text: { mn: 'Суурь ойлголтоос AI төсөл хүртэлх цогц хөтөлбөр.', en: 'A complete path from fundamentals to an AI project.' },
    cta: { mn: 'Хүлээлгийн жагсаалт →', en: 'Join waitlist →' } },
  { category: 'Data', art: 1, artText: 'SQL', status: { mn: 'Бүртгэл нээлттэй', en: 'Enrollment open' }, course: 1,
    title: { mn: 'Өгөгдлийн шинжилгээ ба Power BI', en: 'Data Analysis & Power BI' },
    text: { mn: 'SQL, Python болон Power BI ашиглан өгөгдөл шинжилж, тайлан бүтээх.', en: 'Analyse data and build reports with SQL, Python and Power BI.' },
    cta: { mn: 'Сургалт авах →', en: 'Take this course →' } },
  { category: 'Digital', art: 2, artText: '✧', status: soon, course: 2,
    title: { mn: 'Компьютерын хэрэглээ', en: 'Computer Skills' },
    text: { mn: 'Компьютерын үндсэн хэрэглээ, файл болон өдөр тутмын дижитал хэрэгслүүд.', en: 'Computer basics, files and everyday digital tools.' },
    cta: { mn: 'Хүлээлгийн жагсаалт →', en: 'Join waitlist →' } },
  { category: 'Code', art: 0, artText: '{ }', status: soon, planned,
    title: { mn: 'Python программчлал', en: 'Python Programming' },
    text: { mn: 'Python хэлний суурь, өгөгдлийн бүтэц, автоматжуулалт.', en: 'Python fundamentals, data structures and automation.' } },
  { category: 'Code', art: 1, artText: 'SQL', status: soon, planned,
    title: { mn: 'Вэб хөгжүүлэлт', en: 'Web Development' },
    text: { mn: 'HTML, CSS, JavaScript ашиглан вэбсайт бүтээх суурь.', en: 'Build websites with HTML, CSS and JavaScript.' } },
  { category: 'Data', art: 2, artText: '✧', status: soon, planned,
    title: { mn: 'SQL ба өгөгдлийн сан', en: 'SQL & Databases' },
    text: { mn: 'Өгөгдлийн сангийн зохион байгуулалт, хайлт болон шинжилгээ.', en: 'Database design, queries and analysis.' } },
  { category: 'AI', art: 0, artText: '{ }', status: soon, planned,
    title: { mn: 'AI ба RAG систем', en: 'AI & RAG Systems' },
    text: { mn: 'Эх сурвалжид тулгуурласан AI туслах бүтээх ойлголтууд.', en: 'Explore grounded AI assistants and retrieval.' } },
  { category: 'AI', art: 1, artText: 'SQL', status: soon, planned,
    title: { mn: 'Машин сургалт', en: 'Machine Learning' },
    text: { mn: 'Өгөгдөл бэлтгэх, загвар сургах, үр дүнг үнэлэх суурь.', en: 'Prepare data, train models and evaluate results.' } },
  { category: 'Digital', art: 2, artText: '✧', status: soon, planned,
    title: { mn: 'Кибер аюулгүй байдал', en: 'Cybersecurity' },
    text: { mn: 'Дижитал мэдээлэл, бүртгэл болон системээ хамгаалах суурь.', en: 'Foundations for protecting accounts, information and systems.' } },
];
