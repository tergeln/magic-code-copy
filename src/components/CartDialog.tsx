import { savedMerch } from '../data/content'
import { useSite } from '../context/SiteContext'
import { useDialog } from '../hooks/useDialog'

export function CartDialog() {
  const { t, cart, cartOpen, setCartOpen, removeFromCart, clearCart } = useSite()
  const ref = useDialog(cartOpen, () => setCartOpen(false))

  return (
    <dialog
      id="cartDialog"
      ref={ref}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom
        if (outside) setCartOpen(false)
      }}
    >
      <div className="selection-scene" aria-hidden="true">
        <span>MAGIC CODE · COLLECTION</span>
      </div>
      <div className="selection-content">
        <div className="dialog-top">
          <h3>{t('Таны сонирхсон бүтээгдэхүүн', 'Your merch selection')}</h3>
          <button className="icon-btn" type="button" data-close="" aria-label={t('Хаах', 'Close')} onClick={() => setCartOpen(false)}>
            <span aria-hidden="true" className="selection-close-mark" />
          </button>
        </div>
        <div id="cartItems">
          {cart.length === 0
            ? t('Одоогоор сонгосон бүтээгдэхүүн алга.', 'Your selection is empty.')
            : cart.map((id, index) => {
                const item = savedMerch[id]
                if (!item) return null
                return (
                  <div className="summary-row" key={`${id}-${index}`}>
                    <span className="selection-emblem">{item.emblem}</span>
                    <span>{t(item.mn, item.en)}</span>
                    <button
                      className="icon-btn"
                      type="button"
                      aria-label={`${t('Хасах: ', 'Remove ')}${t(item.mn, item.en)}`}
                      onClick={() => removeFromCart(index)}
                    >
                      ×
                    </button>
                  </div>
                )
              })}
        </div>
        <div className="demo">
          {t(
            'Загварын жишээ бүтээгдэхүүнүүд. Үнэ, нөөц баталгаажаагүй тул бодит захиалга авахгүй.',
            'Concept products. Prices and inventory are not confirmed; no real orders are placed.',
          )}
        </div>
        <button className="btn full" id="clearCart" type="button" disabled={cart.length === 0} onClick={clearCart}>
          {t('Сагс хоослох', 'Clear selection')}
        </button>
      </div>
    </dialog>
  )
}
