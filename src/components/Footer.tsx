import { useSite } from '../context/SiteContext'

export function Footer() {
  const { t } = useSite()
  return (
    <footer>
      <div className="wrap">
        <small>{t('© 2026 Magic Code AI. Сониуч хүн бүрд зориулав.', '© 2026 Magic Code AI. Made for curious minds.')}</small>
      </div>
    </footer>
  )
}
