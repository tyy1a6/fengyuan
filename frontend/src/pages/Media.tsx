import { useEffect } from 'react'
import { Play } from 'lucide-react'
import { siteData } from '@/data/siteData'

export default function Media() {
  const site = siteData
  const oa = site?.officialAccount

  useEffect(() => {
    if (oa?.id) {
      // 进入页面即尝试转接到公众号（在微信内通常能直接弹出）
      window.location.href = `weixin://contacts/profile/${oa.id}`
    }
  }, [oa?.id])

  return (
    <div>
      <section className="hero-paper border-b border-border">
        <div className="container-village py-14">
          <p className="text-sm tracking-[0.3em] text-primary">新媒体</p>
          <h1 className="mt-2 font-serif-cn text-4xl font-bold sm:text-5xl">公众号 · 视频号</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            进入后将自动跳转到公众号与视频号，看尽凤院烟火。村里的大事小情，这里都有。
          </p>
        </div>
      </section>

      {/* 公众号 → 点击转接 */}
      {oa && (
        <section className="section">
          <div className="container-village">
            <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-lg text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.95_0.04_155)] px-3 py-1 text-sm font-medium text-[oklch(0.45_0.13_155)]">
                <Play className="size-4" /> 微信公众号 · 视频号
              </span>
              <h2 className="mt-3 font-serif-cn text-3xl font-bold">{oa.name}</h2>
              <p className="mt-3 text-muted-foreground">{oa.description}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`weixin://contacts/profile/${oa.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-[oklch(0.52_0.13_155)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[oklch(0.47_0.13_155)]"
                >
                  <Play className="size-4" /> 打开公众号
                </a>
                <span className="rounded-md border border-border px-4 py-2.5 text-sm text-muted-foreground">
                  微信号：{oa.id}
                </span>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                页面已自动尝试跳转；若未弹出，请在手机微信中点击下方「打开公众号」转到「{oa.name}」。
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 视频号 */}
      {site && (
        <section className="section bg-[oklch(0.97_0.025_85)]">
          <div className="container-village">
            <div className="mb-10">
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                微信视频号
              </span>
              <h2 className="mt-3 font-serif-cn text-3xl font-bold">
                {site?.videoAccount?.name ?? '凤院村'} · 视频号
              </h2>
              <div className="divider-bqw mt-4 w-24" />
              <p className="mt-4 max-w-2xl text-muted-foreground">
                点击任意视频，跳转视频号观看完整内容。
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {site.videos.map((v) => (
                <a
                  key={v.id}
                  href={v.link}
                  target="_blank"
                  rel="noreferrer"
                  className="card-hover group overflow-hidden rounded-xl border border-border bg-card shadow-md"
                >
                  <div className="relative aspect-video" style={{ background: v.cover }}>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[oklch(0.34_0.075_155)] shadow-lg transition-transform group-hover:scale-110">
                        <Play className="size-6" />
                      </span>
                    </span>
                    <span className="absolute bottom-2 right-2 rounded bg-black/55 px-1.5 py-0.5 text-xs text-white">
                      {v.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 font-medium leading-snug">{v.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">{v.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
