import { ExternalLink, Info } from 'lucide-react'
import { siteData } from '@/data/siteData'
import { Button } from '@/components/ui/button'
import { SectionTitle } from '@/components/Section'

export default function VrView() {
  const site = siteData
  const vr = site?.vr

  return (
    <div>
      <section className="hero-paper border-b border-border">
        <div className="container-village py-14">
          <p className="text-sm tracking-[0.3em] text-primary">VR全景</p>
          <h1 className="mt-2 font-serif-cn text-4xl font-bold sm:text-5xl">
            {vr?.title ?? '凤院村 720° 全景漫游'}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {vr?.description ?? '沉浸式漫游古村，宗祠、镬耳屋、古树公园与田园风光尽收眼底。'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href={vr?.url} target="_blank" rel="noreferrer">
                <ExternalLink className="size-4" /> 在新窗口打开全景
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-village">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="relative aspect-[16/9] w-full bg-[oklch(0.34_0.075_155)]">
              {vr?.url && (
                <iframe
                  title="凤院村 720 全景"
                  src={vr.url}
                  className="absolute inset-0 h-full w-full"
                  frameBorder={0}
                  scrolling="no"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  loading="lazy"
                />
              )}
              {!vr && (
                <div className="flex h-full items-center justify-center text-white/70">
                  正在加载全景…
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-4 text-sm text-secondary-foreground">
            <Info className="mt-0.5 size-5 shrink-0" />
            <p>
              提示：全景已在页面内直接展示，支持拖拽旋转、双指缩放。需要更大画面，可点击内嵌全景右下角的全屏按钮，或使用上方“在新窗口打开全景”。
            </p>
          </div>

          <div className="mt-10">
            <SectionTitle eyebrow="古村祠堂" title="寻迹宗祠文化" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: '欧阳宗祠',
                  desc: '岭南宗祠建筑代表，梁架灰塑精美，是家族文化与村落记忆的核心。',
                },
                {
                  name: '月竹公祠',
                  desc: '村中重要祠堂之一，承载宗族祭祀与节庆活动，砖木结构古韵犹存。',
                },
              ].map((hall, i) => (
                <div key={hall.name} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <span className="font-serif-cn text-2xl font-bold text-theme-gold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-serif-cn text-lg font-bold">{hall.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{hall.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
