import { enrollable } from '../data/content'
import { useSite } from '../context/SiteContext'
import { useDialog } from '../hooks/useDialog'

export function EnrollDialog() {
  const {
    t,
    enrollOpen,
    enrollCourse,
    enrollStep,
    waitlist,
    payMethod,
    setPayMethod,
    closeEnroll,
    submitEnroll,
    backToForm,
    finishPayment,
    openClassroom,
  } = useSite()
  const ref = useDialog(enrollOpen, closeEnroll)
  const course = enrollable[enrollCourse] ?? enrollable[0]
  const paid = enrollCourse === 1

  return (
    <dialog
      id="enrollDialog"
      ref={ref}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom
        if (outside) closeEnroll()
      }}
    >
      <div className="dialog-top">
        <h3 id="dialogTitle">
          {paid ? t('Сургалтад бүртгүүлэх', 'Course enrollment') : t('Хүлээлгийн жагсаалт', 'Join the waitlist')}
        </h3>
        <button className="icon-btn" type="button" data-close="" aria-label={t('Хаах', 'Close')} onClick={closeEnroll}>
          ×
        </button>
      </div>
      <div className="progress" id="progress">
        {enrollStep === 'form' && paid
          ? t('01 Бүртгэл → 02 Төлбөр', '01 Register → 02 Payment')
          : enrollStep === 'payment'
            ? t('01 Бүртгэл → 02 Төлбөр', '01 Register → 02 Payment')
            : paid
              ? t('01 Бүртгэл → 02 Төлбөр', '01 Register → 02 Payment')
              : t('Сонирхлоо илэрхийлэх · Туршилт', 'Register your interest · Demo')}
      </div>
      <div id="enrollStep" hidden={enrollStep !== 'form'}>
        <p className="muted" id="chosenCourse">
          {t(course.mn, course.en)}
        </p>
        <form
          id="enrollForm"
          onSubmit={(event) => {
            event.preventDefault()
            submitEnroll()
          }}
        >
          <label htmlFor="name">{t('Таны нэр', 'Your name')}</label>
          <input id="name" name="name" autoComplete="name" required maxLength={100} />
          <label htmlFor="email">{t('И-мэйл хаяг', 'Email address')}</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="phone">{t('Утасны дугаар', 'Phone number')}</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required pattern="[+0-9 ()-]{8,20}" />
          <button className="btn full" id="enrollSubmit" type="submit">
            {paid ? t('Үргэлжлүүлэх · Төлбөр →', 'Continue to payment →') : t('Жагсаалтад нэгдэх →', 'Join waitlist →')}
          </button>
        </form>
      </div>
      <div id="paymentStep" hidden={enrollStep !== 'payment'}>
        <div id="paymentSummary">
          <div className="summary-row">
            <span>{t('Сургалт', 'Course')}</span>
            <strong>{t(course.mn, course.en)}</strong>
          </div>
          <div className="summary-row">
            <span>{t('Төлбөр', 'Tuition')}</span>
            <strong>{t('Баталгаажуулах', 'To be confirmed')}</strong>
          </div>
        </div>
        <div className="demo">
          {t(
            'Төлбөрийн дэлгэцийн туршилт. Бодит төлбөр авахгүй. Албан ёсны үнэ болон төлбөрийн холболтыг байгууллага баталгаажуулна.',
            'Payment UI demo. No money is collected. Official pricing and payment integration require confirmation from the academy.',
          )}
        </div>
        <div className="payment-options">
          <button type="button" aria-pressed={payMethod === 'qpay'} onClick={() => setPayMethod('qpay')}>
            QPay
          </button>
          <button type="button" aria-pressed={payMethod === 'bank'} onClick={() => setPayMethod('bank')}>
            {t('Банкны шилжүүлэг', 'Bank transfer')}
          </button>
        </div>
        <p id="paymentNote" className="muted" style={{ fontSize: 11, marginTop: 15 }}>
          {t(
            'Бодит системд энд QPay QR код эсвэл банкны баталгаажсан мэдээлэл гарна.',
            'In the live system, a QPay QR or verified bank details appear here.',
          )}
        </p>
        <button className="btn full" id="finishPayment" type="button" onClick={finishPayment}>
          {t('Туршилтын бүртгэлийг дуусгах →', 'Finish demo enrollment →')}
        </button>
        <button className="btn secondary full" id="backEnroll" type="button" onClick={backToForm}>
          {t('← Буцах', '← Back')}
        </button>
      </div>
      <div id="successStep" hidden={enrollStep !== 'success'}>
        <h3>{t('Туршилтын бүртгэл бэлэн ✓', 'Demo registration complete ✓')}</h3>
        <p style={{ marginTop: 15 }}>
          {waitlist
            ? t(
                'Энэ бол дэлгэцийн туршилт. Жинхэнэ хүлээлгийн жагсаалтад нэгдэх бол magiccodeai@gmail.com руу бичээрэй.',
                'This is a UI demo. Email magiccodeai@gmail.com to join the real waitlist.',
              )
            : t(
                'Бүртгэл болон төлбөрийн урсгалыг туршлаа. Мэдээлэл серверт илгээгээгүй, төлбөр аваагүй. Албан ёсоор бүртгүүлэх бол и-мэйлээр холбогдоорой.',
                'You have explored enrollment and checkout. No details were sent to a server and no payment was taken. Email us for official enrollment.',
              )}
        </p>
        {!waitlist && (
          <button
            className="btn full"
            type="button"
            onClick={() => {
              closeEnroll()
              openClassroom()
            }}
          >
            {t('Хичээл үзэх ▷', 'Watch lessons ▷')}
          </button>
        )}
      </div>
    </dialog>
  )
}
