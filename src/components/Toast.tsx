import { useSite } from '../context/SiteContext'

export function Toast() {
  const { toast } = useSite()
  return (
    <div className="toast" id="toast" hidden={!toast} role="status">
      {toast}
    </div>
  )
}
