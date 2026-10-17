import Tr from '../../components/Tr/Tr';

// Эх хувилбарт үгийг нэг нэгээр нь асаах (span.lit) JS байсан ч дараагийн translate() дуудлага
// `innerHTML`-ийг дарж бичдэг тул бодит байдалд текст бүхэлдээ харагддаг. Тэр үр дүнг хэвээр хадгалав.
export default function Manifesto() {
  return (
    <section id="manifesto">
      <div className="wrap">
        <p className="eyebrow">Manifesto</p>
        <p className="serif">
          <Tr
            mn="Magic Code AI-тай суралцаж, санаагаа бүтээл болго."
            en="Learn with Magic Code AI and bring your ideas to life."
          />
        </p>
      </div>
    </section>
  );
}
