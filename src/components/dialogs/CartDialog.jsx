import { useEffect, useRef } from 'react';
import Tr from '../Tr/Tr';
import { useLang } from '../../context/LanguageContext';
import closeOnBackdrop from '../../hooks/dialogBackdrop';
import { cartProducts } from '../../data/merch';

// request – id нэмэгдэх бүрт dialog нээгдэнэ. cart = бүтээгдэхүүний индексүүд.
export default function CartDialog({ request, cart, onRemove, onClear }) {
  const { lang, t } = useLang();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!request) return;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, [request]);

  return (
    <dialog id="cartDialog" ref={dialogRef} onClick={closeOnBackdrop}>
      <div className="selection-scene" aria-hidden="true">
        <span>MAGIC CODE · COLLECTION</span>
      </div>
      <div className="selection-content">
        <div className="dialog-top">
          <h3><Tr mn="Таны сонирхсон бүтээгдэхүүн" en="Your merch selection" /></h3>
          <button className="icon-btn" data-close aria-label={t('Хаах', 'Close')} onClick={() => dialogRef.current.close()}>
            <span aria-hidden="true" className="selection-close-mark" />
          </button>
        </div>
        <div id="cartItems">
          {cart.length === 0 && t('Одоогоор сонгосон бүтээгдэхүүн алга.', 'Your selection is empty.')}
          {cart.map((id, index) => {
            const product = cartProducts[id];
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div className="summary-row" key={`${id}-${index}`}>
                <span className="selection-emblem">{product.emblem}</span>
                <span>{product[lang]}</span>
                <button className="icon-btn" aria-label={`${t('Хасах: ', 'Remove ')}${product[lang]}`} onClick={() => onRemove(index)}>×</button>
              </div>
            );
          })}
        </div>
        <div className="demo">
          <Tr
            mn="Загварын жишээ бүтээгдэхүүнүүд. Үнэ, нөөц баталгаажаагүй тул бодит захиалга авахгүй."
            en="Concept products. Prices and inventory are not confirmed; no real orders are placed."
          />
        </div>
        <button className="btn full" id="clearCart" disabled={!cart.length} onClick={onClear}>
          <Tr mn="Сагс хоослох" en="Clear selection" />
        </button>
      </div>
    </dialog>
  );
}
