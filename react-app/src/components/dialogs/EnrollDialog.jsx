import { useEffect, useRef, useState } from 'react';
import Tr from '../Tr/Tr';
import { useLang } from '../../context/LanguageContext';
import closeOnBackdrop from '../../hooks/dialogBackdrop';

const NAMES = {
  mn: ['VIP цогц сургалт', 'Өгөгдлийн шинжилгээ ба Power BI', 'Компьютерын хэрэглээ'],
  en: ['VIP Course', 'Data Analysis & Power BI', 'Computer Skills'],
};

// request = { course, id } – id нэмэгдэх бүрт dialog шинээр нээгдэнэ. Course 1 нь төлбөрийн алхамтай, бусад нь хүлээлгийн жагсаалт.
export default function EnrollDialog({ request, onOpenClassroom }) {
  const { lang, t } = useLang();
  const dialogRef = useRef(null);
  const [selected, setSelected] = useState(1);
  const [step, setStep] = useState('form');
  const [waitlist, setWaitlist] = useState(false);
  const [payment, setPayment] = useState(0);

  useEffect(() => {
    if (!request) return;
    setSelected(request.course);
    setStep('form');
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, [request]);

  const isCourse = selected === 1;
  const name = NAMES[lang][selected];

  const finish = (isWaitlist) => {
    setWaitlist(isWaitlist);
    setStep('success');
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!isCourse) finish(true);
    else setStep('payment');
  };

  return (
    <dialog id="enrollDialog" ref={dialogRef} onClick={closeOnBackdrop}>
      <div className="dialog-top">
        <h3 id="dialogTitle">
          {isCourse ? t('Сургалтад бүртгүүлэх', 'Course enrollment') : t('Хүлээлгийн жагсаалт', 'Join the waitlist')}
        </h3>
        <button className="icon-btn" aria-label={t('Хаах', 'Close')} onClick={() => dialogRef.current.close()}>×</button>
      </div>
      <div className="progress" id="progress">
        {isCourse ? t('01 Бүртгэл → 02 Төлбөр', '01 Register → 02 Payment') : t('Сонирхлоо илэрхийлэх · Туршилт', 'Register your interest · Demo')}
      </div>
      <div id="enrollStep" hidden={step !== 'form'}>
        <p className="muted" id="chosenCourse">{name}</p>
        <form id="enrollForm" onSubmit={onSubmit}>
          <label htmlFor="name"><Tr mn="Таны нэр" en="Your name" /></label>
          <input id="name" autoComplete="name" required maxLength={100} />
          <label htmlFor="email"><Tr mn="И-мэйл хаяг" en="Email address" /></label>
          <input id="email" type="email" autoComplete="email" required />
          <label htmlFor="phone"><Tr mn="Утасны дугаар" en="Phone number" /></label>
          <input id="phone" type="tel" autoComplete="tel" required pattern="[+0-9 \(\)\-]{8,20}" />
          <button className="btn full" id="enrollSubmit">
            {isCourse ? t('Үргэлжлүүлэх · Төлбөр →', 'Continue to payment →') : t('Жагсаалтад нэгдэх →', 'Join waitlist →')}
          </button>
        </form>
      </div>
      <div id="paymentStep" hidden={step !== 'payment'}>
        <div id="paymentSummary">
          <div className="summary-row"><span>{t('Сургалт', 'Course')}</span><strong>{name}</strong></div>
          <div className="summary-row"><span>{t('Төлбөр', 'Tuition')}</span><strong>{t('Баталгаажуулах', 'To be confirmed')}</strong></div>
        </div>
        <div className="demo">
          <Tr
            mn="Төлбөрийн дэлгэцийн туршилт. Бодит төлбөр авахгүй. Албан ёсны үнэ болон төлбөрийн холболтыг байгууллага баталгаажуулна."
            en="Payment UI demo. No money is collected. Official pricing and payment integration require confirmation from the academy."
          />
        </div>
        <div className="payment-options">
          <button type="button" aria-pressed={payment === 0} onClick={() => setPayment(0)}>QPay</button>
          <button type="button" aria-pressed={payment === 1} onClick={() => setPayment(1)}>
            <Tr mn="Банкны шилжүүлэг" en="Bank transfer" />
          </button>
        </div>
        <p id="paymentNote" className="muted" style={{ fontSize: '11px', marginTop: '15px' }}>
          {t('Бодит системд энд QPay QR код эсвэл банкны баталгаажсан мэдээлэл гарна.', 'In the live system, a QPay QR or verified bank details appear here.')}
        </p>
        <button className="btn full" id="finishPayment" onClick={() => finish(false)}>
          <Tr mn="Туршилтын бүртгэлийг дуусгах →" en="Finish demo enrollment →" />
        </button>
        <button className="btn secondary full" id="backEnroll" onClick={() => setStep('form')}>
          <Tr mn="← Буцах" en="← Back" />
        </button>
      </div>
      <div id="successStep" hidden={step !== 'success'}>
        <h3>{t('Туршилтын бүртгэл бэлэн ✓', 'Demo registration complete ✓')}</h3>
        <p style={{ marginTop: '15px' }}>
          {waitlist
            ? t('Энэ бол дэлгэцийн туршилт. Жинхэнэ хүлээлгийн жагсаалтад нэгдэх бол magiccodeai@gmail.com руу бичээрэй.', 'This is a UI demo. Email magiccodeai@gmail.com to join the real waitlist.')
            : t('Бүртгэл болон төлбөрийн урсгалыг туршлаа. Мэдээлэл серверт илгээгээгүй, төлбөр аваагүй. Албан ёсоор бүртгүүлэх бол и-мэйлээр холбогдоорой.', 'You have explored enrollment and checkout. No details were sent to a server and no payment was taken. Email us for official enrollment.')}
        </p>
        {!waitlist && (
          <button
            type="button"
            className="btn full"
            onClick={() => {
              dialogRef.current.close();
              onOpenClassroom();
            }}
          >
            <Tr mn="Хичээл үзэх ▷" en="Watch lessons ▷" />
          </button>
        )}
      </div>
    </dialog>
  );
}
