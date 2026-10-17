export const chatGreeting = {
  open: {
    mn: 'Сайн уу! ✳ Сургалт, бүртгэл эсвэл холбоо барих талаар асуугаарай. Би урьдчилан бэлдсэн мэдээлэлтэй туршилтын туслах.',
    en: 'Hello! ✳ Ask about courses, enrollment or contact details. I am a demo assistant with prepared answers.',
  },
  // Хэл солиход өмнөх мессежүүдийг орлуулдаг мессеж
  relang: {
    mn: 'Сайн уу! ✳ Би Magic Code AI-ийн шидэт туслах. Сургалт, бүртгэл эсвэл төлбөрийн талаар асуугаарай. Одоогоор бэлэн мэдээлэлд тулгуурлан хариулна.',
    en: 'Hello! ✳ I am the Magic Code AI assistant. Ask about courses, enrollment or payments. I currently answer using prepared information.',
  },
};

export const quickQuestions = [
  { key: 'courses', mn: 'Сургалтууд', en: 'Courses' },
  { key: 'payment', mn: 'Төлбөр', en: 'Payment' },
  { key: 'contact', mn: 'Холбогдох', en: 'Contact' },
];

export function chatAnswer(q, t) {
  const s = q.toLowerCase();
  if (/төлбөр|үнэ|payment|price|qpay/.test(s)) return t('Өгөгдлийн шинжилгээний сургалтын Бүртгүүлэх товчийг дараад мэдээллээ бөглөхөд төлбөрийн туршилтын хэсэг нээгдэнэ. Бодит үнэ, төлбөрийг magiccodeai@gmail.com хаягаар лавлаарай.', 'Choose Enroll on Data Analysis and complete the form to see the payment demo. Confirm official pricing and payment via magiccodeai@gmail.com.');
  if (/сургалт|course|python|power|vip|элс|enroll/.test(s)) return t('VIP цогц сургалт, Өгөгдлийн шинжилгээ ба Power BI, Компьютерын хэрэглээ гэсэн 3 чиглэлтэй. Өгөгдлийн шинжилгээний сургалтын бүртгэлийн явцыг турших боломжтой, бусад нь хүлээлгийн жагсаалттай.', 'Explore VIP Course, Data Analysis & Power BI and Computer Skills. Data Analysis has an enrollment demo; the other paths have waitlist demos.');
  if (/merch|бараа|цамц|tote/.test(s)) return t('Бүтээгдэхүүний хэсэгт одоогоор цүнхний загвар зургуудыг түр ашиглаж байна. Байгууллагын бүтээгдэхүүний мэдээллийг и-мэйлээр лавлаарай.', 'Explore the concept merch collection and add items to your selection. Pricing and stock are not yet confirmed.');
  return t('Бидэнтэй magiccodeai@gmail.com хаягаар холбогдоорой. Сургалт болон төлбөрийн талаар ч асууж болно.', 'Reach the team at magiccodeai@gmail.com. You can also ask me about courses and payment.');
}
