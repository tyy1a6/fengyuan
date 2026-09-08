import { Link } from 'react-router-dom'
import {
  Globe,
  ScanLine,
  ArrowRight,
  Play,
  MapPin,
  Award,
} from 'lucide-react'
import { siteData } from '@/data/siteData'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/Section'

const quickEntries = [
  { to: '/vr', title: 'VR全景', desc: '720° 沉浸式漫游古村', icon: Globe, color: 'bg-sky-50 text-sky-700' },
  { to: '/media', title: '新媒体', desc: '公众号 · 视频号一手掌握', icon: ScanLine, color: 'bg-emerald-50 text-emerald-700' },
]

export default function Index() {
  const site = siteData

  const partners = site?.logos?.partners ?? []

  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="hero-green relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_30%,white_1px,transparent_1px)] [background-size:22px_22px]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(135deg, transparent 0%, oklch(0.78 0.12 85 / 0.18) 50%, transparent 70%), radial-gradient(120% 80% at 90% -10%, oklch(0.78 0.12 85 / 0.35), transparent 55%)',
          }}
        />
        <div className="container-village relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Award className="size-4 text-[oklch(0.78_0.12_85)]" />
              {site?.project.level ?? '广东省“百千万工程”典型村'}
            </div>
            <h1 className="mt-6 font-serif-cn text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {site?.village.name ?? '凤院村'}
              <span className="mx-2 text-[oklch(0.78_0.12_85)]">·</span>
              寻迹新生
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              {site?.village.introduction ??
                '一座八百余载历史的客家古村落，生态美、产业兴、百姓富的乡村振兴新样本。'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-[oklch(0.34_0.075_155)] hover:bg-white/90">
                <Link to="/vr">
                  <Play className="size-4" /> 走进 VR 全景
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/media">关注我们</Link>
              </Button>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/70">
              <MapPin className="size-4" /> {site?.village.location}
            </p>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-[oklch(0.78_0.12_85_/_0.25)] blur-2xl" />
              <img
                src="/images/fengzai.jpg"
                alt="凤崽"
                className="relative h-auto w-full max-w-[340px] rounded-2xl border-4 border-[oklch(0.78_0.12_85)] bg-[oklch(0.34_0.075_155)] object-cover shadow-2xl sm:max-w-[420px]"
              />
              <span className="absolute -right-2 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                凤崽带你看古村
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 数据一览 ===== */}
      {site && (
        <section className="border-b border-border bg-card">
          <div className="container-village grid grid-cols-2 gap-6 py-10 sm:grid-cols-3 lg:grid-cols-6">
            {site.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif-cn text-3xl font-bold text-[oklch(0.525_0.205_27)] sm:text-4xl">
                  {s.value}
                  {s.unit && <span className="ml-1 text-base text-muted-foreground">{s.unit}</span>}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== 快捷入口 ===== */}
      <section className="section hero-paper">
        <div className="container-village">
          <SectionTitle
            eyebrow="一站直达"
            title="四大数字入口"
            description="无论想看全景、追新媒体，还是玩 AR、查资料，都能一键到达。"
            align="center"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickEntries.map((e) => {
              const Icon = e.icon
              return (
                <Link
                  key={e.to}
                  to={e.to}
                  className="card-hover group flex flex-col rounded-xl border border-border bg-card p-6 shadow-md"
                >
                  <span className={`flex h-12 w-12 items-center justify-center rounded-lg ${e.color}`}>
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-serif-cn text-xl font-bold">{e.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{e.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[oklch(0.518_0.155_155.713)]">
                    立即体验
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== 指导/支持单位 ===== */}
      {partners.length > 0 && (
        <section className="section bg-[oklch(0.99_0.005_90)]">
          <div className="container-village">
            <SectionTitle
              eyebrow="共建力量"
              title="指导与支持单位"
              description="凝聚校地青力量，共绘百千万新图景。"
              align="center"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((p) =>
                p.url ? (
                  <a
                    key={p.id}
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card-hover flex flex-col items-center rounded-xl border border-border bg-white p-6 text-center shadow-sm"
                    title={p.name}
                  >
                    <div className="flex h-28 w-full items-center justify-center">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="max-h-24 w-auto max-w-full object-contain"
                      />
                    </div>
                    <p className="mt-4 line-clamp-2 text-sm font-medium text-foreground">{p.name}</p>
                    <span className="mt-2 text-xs text-muted-foreground">了解详情 →</span>
                  </a>
                ) : (
                  <div
                    key={p.id}
                    className="card-hover flex flex-col items-center rounded-xl border border-border bg-white p-6 text-center shadow-sm"
                    title={p.name}
                  >
                    <div className="flex h-28 w-full items-center justify-center">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="max-h-24 w-auto max-w-full object-contain"
                      />
                    </div>
                    <p className="mt-4 line-clamp-2 text-sm font-medium text-foreground">{p.name}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===== 村情简介 + 新媒体预览 ===== */}
      {site && (
        <section className="section">
          <div className="container-village grid gap-10 lg:grid-cols-2">
            <div>
              <SectionTitle eyebrow="关于凤院" title="八百年客家古村" />
              <p className="text-muted-foreground">{site.village.introduction}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-border bg-card p-4">
                  <dt className="text-muted-foreground">建村年代</dt>
                  <dd className="mt-1 font-medium">{site.village.established}</dd>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <dt className="text-muted-foreground">工程定位</dt>
                  <dd className="mt-1 font-medium">{site.project.level}</dd>
                </div>
              </dl>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/about">
                  了解更多 <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            <div>
              <SectionTitle eyebrow="新媒体精选" title="村里的好声音" />
              <div className="space-y-3">
                {site.videos.slice(0, 3).map((v, idx) => (
                  <a
                    key={v.id}
                    href={v.link}
                    target="_blank"
                    rel="noreferrer"
                    className="card-hover group relative flex items-center gap-4 rounded-xl border border-border bg-card p-3 shadow-sm"
                  >
                    {idx === 0 && (
                      <span className="absolute -right-1 -top-2 rounded-full bg-[oklch(0.518_0.155_155.713)] px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
                        推荐
                      </span>
                    )}
                    <span
                      className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg text-white"
                      style={{ background: v.cover }}
                    >
                      <Play className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{v.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {v.date} · {v.duration}
                      </span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/media">
                  查看全部新媒体 <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
