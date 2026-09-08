import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { siteData } from '@/data/siteData'

const footerLinks = [
  { to: '/about', label: '村情概况' },
  { to: '/vr', label: 'VR全景' },
  { to: '/media', label: '新媒体' },
]

export function Footer() {
  const site = siteData
  const partners = site?.logos?.partners ?? []
  const sealUrl = site?.logos?.seal || '/logos/fengyuan-seal.jpg'

  return (
    <footer className="mt-8 border-t border-border bg-[oklch(0.34_0.075_155)] text-white/90">
      {partners.length > 0 && (
        <div className="border-b border-white/10 bg-white/5">
          <div className="container-village py-8">
            <p className="mb-5 text-center text-xs font-medium tracking-widest text-white/60">
              指导 / 支持单位
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {partners.map((p) =>
                p.url ? (
                  <a
                    key={p.id}
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-14 max-w-[140px] items-center justify-center rounded-lg bg-white p-2 shadow-sm transition hover:scale-105"
                    title={p.name}
                  >
                    <img src={p.image} alt={p.name} className="max-h-10 w-auto object-contain" />
                  </a>
                ) : (
                  <span
                    key={p.id}
                    className="flex h-14 max-w-[140px] items-center justify-center rounded-lg bg-white p-2 shadow-sm"
                    title={p.name}
                  >
                    <img src={p.image} alt={p.name} className="max-h-10 w-auto object-contain" />
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
      <div className="container-village grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={sealUrl}
              alt="凤院寻迹"
              className="h-10 w-10 rounded-lg border border-white/20 object-cover"
            />
            <span className="font-serif-cn text-xl font-bold">凤院村</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/70">
            百县千镇万村高质量发展工程典型村，生态美、产业兴、百姓富的客家古村新样本。
          </p>
        </div>

        <div>
          <h4 className="font-serif-cn text-base font-bold text-white">快速导航</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {footerLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif-cn text-base font-bold text-white">联系我们</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" /> 广东省广州市从化区江埔街凤院村
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" /> 020-8799-0000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" /> fengyuan@conghua.gov.cn
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-village flex flex-col items-center justify-between gap-2 py-4 text-xs text-white/60 sm:flex-row">
          <span>© {new Date().getFullYear()} 凤院村村民委员会 · 百千万工程门户</span>
          <span>技术支持：数字乡村云平台</span>
        </div>
      </div>
    </footer>
  )
}
