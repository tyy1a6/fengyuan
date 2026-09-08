export interface StatItem {
  label: string
  value: string
  unit?: string
}

export interface VrLink {
  title: string
  url: string
  description: string
}

export interface OfficialAccount {
  name: string
  /** 微信号 / 原始 ID，便于用户在微信中搜索 */
  id: string
  description: string
  /** 小程序码图片地址（本地文件或图床链接），用户微信扫一扫进入小程序 */
  qrImageUrl: string
  /** 微信小程序 AppID，用于微信内网页一键跳转小程序（非微信环境可留空） */
  miniProgramAppId?: string
  /** 小程序页面路径，如 pages/index/index */
  miniProgramPath?: string
  /** 公众号关联的视频号/宣传链接（可选，用于按钮跳转） */
  link?: string
}

export interface VideoAccount {
  name: string
  link: string
}

export interface VideoItem {
  id: string
  title: string
  duration: string
  date: string
  link: string
  cover: string
}

export interface PartnerLogo {
  id: string
  name: string
  image: string
  url?: string
}

export interface LogoConfig {
  seal: string
  partners: PartnerLogo[]
}

export interface CultureItem {
  title: string
  desc: string
}

export interface DocumentItem {
  slug: string
  title: string
  category: string
  summary: string
  content: string
  updatedAt: string
  author: string
  fileType: string
  size?: string
}

export interface ArticleItem {
  slug: string
  title: string
  category: string
  summary: string
  content: string
  author: string
  publishedAt: string
  updatedAt: string
  isPublished: boolean
  cover?: string
}

export interface SiteConfig {
  village: {
    name: string
    shortName: string
    slogan: string
    location: string
    established: string
    introduction: string
  }
  project: {
    name: string
    level: string
    keywords: string[]
  }
  stats: StatItem[]
  vr: VrLink
  officialAccount: OfficialAccount
  videoAccount: VideoAccount
  videos: VideoItem[]
  logos: LogoConfig
  contact: {
    address: string
    phone: string
    email: string
  }
  culture: CultureItem[]
}
