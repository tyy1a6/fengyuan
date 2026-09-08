import { siteData } from '@/data/siteData'
import { SectionTitle } from '@/components/Section'
import { DynIcon } from '@/components/DynIcon'

const timeline = [
  { year: '南宋淳祐', title: '欧阳氏迁居建村', desc: '先祖自中原南迁，择凤凰山麓、流溪河畔开基立村。' },
  { year: '明清', title: '兴建宗祠与镬耳屋', desc: '欧阳宗祠与连片镬耳屋民居落成，奠定古村格局。' },
  { year: '2019', title: '列入中国传统村落', desc: '古村风貌与历史建筑获省级以上保护认定。' },
  { year: '2022', title: '纳入“百千万工程”', desc: '入选广东省“百县千镇万村高质量发展工程”典型村。' },
  { year: '2026', title: '古村活化焕新', desc: '山水灵秀涵文脉，祠巷古朴颂清风。走进从化凤院，探寻岭南名门与耕读诗礼的岁月回响。' },
]

export default function About() {
  const site = siteData

  return (
    <div>
      <section className="hero-paper border-b border-border">
        <div className="container-village py-14">
          <p className="text-sm tracking-[0.3em] text-primary">村情概况</p>
          <h1 className="mt-2 font-serif-cn text-4xl font-bold sm:text-5xl">
            {site?.village.name} · 古韵新章
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {site?.village.introduction}
          </p>
        </div>
      </section>

      {/* 村史时间线 */}
      <section className="section">
        <div className="container-village">
          <SectionTitle eyebrow="村史脉络" title="八百余载时光" description="从南迁开基到百千万焕新，一条清晰的时间线。" />
          <ol className="relative ml-3 border-l-2 border-dashed border-border">
            {timeline.map((t) => (
              <li key={t.year} className="mb-8 ml-6">
                <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <span className="font-serif-cn text-lg font-bold text-primary">{t.year}</span>
                  <h3 className="mt-1 font-serif-cn text-xl font-bold">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 文化名片 */}
      <section className="section bg-[oklch(0.97_0.025_85)]">
        <div className="container-village">
          <SectionTitle eyebrow="文化名片" title="活态传承的乡愁" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(site?.culture ?? []).map((c) => (
              <div key={c.title} className="card-hover rounded-xl border border-border bg-card p-6 shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-theme-gold/15 text-[oklch(0.55_0.12_70)]">
                  <DynIcon name="BookOpen" className="size-6" />
                </span>
                <h3 className="mt-4 font-serif-cn text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 数据带 */}
      {site && (
        <section className="hero-green text-white">
          <div className="container-village grid grid-cols-2 gap-6 py-12 lg:grid-cols-4">
            {site.stats.slice(0, 4).map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif-cn text-4xl font-bold">
                  {s.value}
                  {s.unit && <span className="ml-1 text-base text-white/70">{s.unit}</span>}
                </div>
                <div className="mt-1 text-sm text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
