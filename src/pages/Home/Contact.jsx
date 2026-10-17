import Tr from '../../components/Tr/Tr';
import useReveal from '../../hooks/useReveal';

export default function Contact({ onOpenChat }) {
  const [ref, className] = useReveal('wrap contact');
  return (
    <section id="contact">
      <div ref={ref} className={className}>
        <div>
          <div className="eyebrow"><Tr mn="ХОЛБОО БАРИХ" en="SAY HELLO" /></div>
          <h2><Tr mn="Танд нэг санаа байна уу?<br><em>Ярилцъя.</em>" en="Something on your mind?<br><em>Let’s talk.</em>" /></h2>
          <p>
            <Tr
              mn="Сургалтын талаар асуух эсвэл хамтран ажиллах — бид таныг сонсоход бэлэн."
              en="Have a course question or a collaboration idea? We would love to hear from you."
            />
          </p>
        </div>
        <div className="contact-links">
          <a className="contact-row" href="mailto:magiccodeai@gmail.com">
            <small><Tr mn="И-мэйл" en="Email" /></small>
            <span>magiccodeai@gmail.com ↗</span>
          </a>
          <div className="contact-row">
            <small><Tr mn="Байршил" en="Location" /></small>
            <span><Tr mn="Улаанбаатар, Монгол" en="Ulaanbaatar, Mongolia" /></span>
          </div>
          <button className="btn secondary" id="contactChat" onClick={onOpenChat}>
            <Tr mn="Туслахтай ярилцах ↗" en="Chat with our assistant ↗" />
          </button>
        </div>
      </div>
    </section>
  );
}
