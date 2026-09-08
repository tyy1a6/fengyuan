/**
 * 凤院村 · 百千万工程 站点数据源
 *
 * 这里集中维护门户所需的全部内容（村情、链接、文档）。
 * 前端通过 /api/site 与 /api/documents 读取，便于日常统一维护。
 * 如需对接数据库或 CMS，只需替换本文件的取数实现即可。
 */

import fs from 'fs'
import path from 'path'

export interface StatItem {
  label: string;
  value: string;
  unit?: string;
}

export interface VrLink {
  title: string;
  url: string;
  description: string;
}

export interface OfficialAccount {
  name: string;
  /** 微信号 / 原始 ID，便于用户在微信中搜索 */
  id: string;
  description: string;
  /** 小程序码图片地址（本地文件或图床链接），用户微信扫一扫进入小程序 */
  qrImageUrl: string;
  /** 微信小程序 AppID，用于微信内网页一键跳转小程序（非微信环境可留空） */
  miniProgramAppId?: string;
  /** 小程序页面路径，如 pages/index/index */
  miniProgramPath?: string;
  /** 公众号关联的视频号/宣传链接（可选，用于按钮跳转） */
  link?: string;
}

export interface VideoAccount {
  name: string;
  /** 视频号主页 / 视频列表入口（可替换为真实链接） */
  link: string;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  date: string;
  /** 视频号视频播放链接（可替换为真实链接） */
  link: string;
  /** 封面渐变（避免依赖外链图片） */
  cover: string;
}

export interface ArExperience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  /** lucide 图标名 */
  icon: string;
  /** AR 互动 H5 链接（可替换为真实链接） */
  link: string;
  tag: string;
}

export interface Highlight {
  title: string;
  description: string;
  icon: string;
}

export interface CultureItem {
  title: string;
  desc: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  /** 图片地址（本地 public 目录或图床链接） */
  image: string;
  /** 点击后跳转链接，留空则不跳转 */
  url?: string;
}

export interface LogoConfig {
  /** 主标识 / 村徽（如凤院寻迹印章） */
  seal: string;
  /** 合作/支持单位 logo 列表 */
  partners: PartnerLogo[];
}

export interface DocumentItem {
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  updatedAt: string;
  author: string;
  fileType: string;
  size?: string;
}

export interface ArticleItem {
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
  cover?: string;
}

export interface SiteConfig {
  village: {
    name: string;
    shortName: string;
    slogan: string;
    location: string;
    established: string;
    introduction: string;
  };
  project: {
    name: string;
    level: string;
    keywords: string[];
  };
  stats: StatItem[];
  vr: VrLink;
  officialAccount: OfficialAccount;
  videoAccount: VideoAccount;
  videos: VideoItem[];
  arExperiences: ArExperience[];
  highlights: Highlight[];
  logos: LogoConfig;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  culture: CultureItem[];
}

export let siteConfig: SiteConfig = {
  village: {
    name: '凤院村',
    shortName: '凤院',
    slogan: '百千万工程 · 凤院新貌',
    location: '广东省广州市从化区江埔街凤院村',
    established: '南宋淳祐年间（约公元 1250 年）',
    introduction:
      '凤院村是一座拥有八百余载历史的客家古村落，背靠凤凰山、面朝流溪河，至今保存欧阳宗祠、镬耳屋古民居群与十二株百年古树名木。自纳入“百县千镇万村高质量发展工程”典型村以来，凤院以人居环境提升、特色产业发展与文化活态传承为抓手，走出了一条生态美、产业兴、百姓富的乡村振兴之路。',
  },
  project: {
    name: '百县千镇万村高质量发展工程',
    level: '广东省“百千万工程”典型村',
    keywords: ['生态宜居', '产业兴旺', '乡风文明', '治理有效', '生活富裕'],
  },
  stats: [
    { label: '户籍人口', value: '1860', unit: '人' },
    { label: '户数', value: '432', unit: '户' },
    { label: '村域面积', value: '3.2', unit: 'km²' },
    { label: '百年古树', value: '12', unit: '株' },
    { label: '集体年收入', value: '286', unit: '万元' },
    { label: '非遗项目', value: '3', unit: '项' },
  ],
  vr: {
    title: '凤院村 720° 全景漫游',
    url: 'https://www.720yun.com/vr/fc2je0uOvk5',
    description:
      '足不出户，沉浸式漫游凤院古村——欧阳宗祠、镬耳屋民居群、古树公园与田园风光尽收眼底。',
  },
  officialAccount: {
    name: '凤院寻迹实践团',
    id: 'fengyuan_xunji',
    description:
      '权威发布村务动态、惠民政策与活动预告。点击下方「打开公众号 / 视频号」即可查看最新内容，第一时间获取村里大小事。',
    qrImageUrl: '/media/mp-qrcode.svg',
    miniProgramAppId: '',
    miniProgramPath: '',
    link: 'https://weixin.qq.com/sph/AjKoNtomyE',
  },
  videoAccount: {
    name: '凤院寻迹实践团',
    link: 'https://weixin.qq.com/sph/AjKoNtomyE',
  },
  videos: [
    {
      id: 'v1',
      title: '凤院寻迹宣传预告',
      duration: '01:30',
      date: '2026-07-05',
      link: 'https://weixin.qq.com/sph/AYwS4wgp5w',
      cover: 'linear-gradient(135deg, oklch(0.60 0.13 155), oklch(0.34 0.075 155))',
    },
    {
      id: 'v2',
      title: '凤院寻迹，古村探秘',
      duration: '02:00',
      date: '2026-07-23',
      link: 'https://weixin.qq.com/sph/AarPZnb2iG',
      cover: 'linear-gradient(135deg, oklch(0.78 0.12 85), oklch(0.70 0.16 50))',
    },
    {
      id: 'v3',
      title: '走进凤院村，寻迹古文脉',
      duration: '02:30',
      date: '2026-08-10',
      link: 'https://weixin.qq.com/sph/AszP5m9Xoc',
      cover: 'linear-gradient(135deg, oklch(0.525 0.205 27), oklch(0.70 0.16 50))',
    },
    {
      id: 'v4',
      title: '以青春足迹守护乡土粤韵文脉',
      duration: '03:00',
      date: '2026-08-11',
      link: 'https://weixin.qq.com/sph/AiPaZOLixq',
      cover: 'linear-gradient(135deg, oklch(0.58 0.13 230), oklch(0.60 0.13 155))',
    },
    {
      id: 'v5',
      title: '凤崽登场，守护凤院',
      duration: '01:00',
      date: '2026-08-14',
      link: 'https://weixin.qq.com/sph/AuKcyagb9P',
      cover: 'linear-gradient(135deg, oklch(0.60 0.13 155), oklch(0.34 0.075 155))',
    },
  ],
  arExperiences: [
    {
      id: 'ar-ci',
      title: '宗祠 AR 导览',
      subtitle: '欧阳宗祠',
      description: '扫码开启增强现实，宗祠梁架、灰塑与功名匾额在手机上“活”起来，听一段家族故事。',
      icon: 'Landmark',
      link: 'https://www.720yun.com/vr/fc2je0uOvk5',
      tag: '古建',
    },
    {
      id: 'ar-tree',
      title: '古树 AR 认养',
      subtitle: '百年古榕',
      description: '对准村口古榕，AR 浮现它的年轮与守护故事，在线认养属于你的“绿色邻居”。',
      icon: 'TreePine',
      link: 'https://www.720yun.com/vr/fc2je0uOvk5',
      tag: '生态',
    },
    {
      id: 'ar-farm',
      title: '田园 AR 打卡',
      subtitle: '研学稻田',
      description: '走进生态研学田，AR 标注作物与节气农事，亲子研学边玩边学。',
      icon: 'Sprout',
      link: 'https://www.720yun.com/vr/fc2je0uOvk5',
      tag: '研学',
    },
  ],
  logos: {
    seal: '/logos/fengyuan-seal.jpg',
    partners: [
      {
        id: 'baiqianwan-commando',
        name: '广东青年大学生百千万工程突击队',
        image: '/logos/baiqianwan-commando.jpg',
        url: 'https://www.gdyl.org/',
      },
      {
        id: 'ccyouth',
        name: '中国共产主义青年团',
        image: '/logos/ccyouth.jpg',
        url: 'https://www.ccyl.org/',
      },
      {
        id: 'gdufe',
        name: '广东财经大学',
        image: '/logos/gdufe.jpg',
        url: 'https://www.gdufe.edu.cn/',
      },
      {
        id: 'sanxiaxiang',
        name: '大中专学生志愿者三下乡社会实践活动',
        image: '/logos/sanxiaxiang.png',
        url: 'https://www.ccyl.org/',
      },
    ],
  },
  contact: {
    address: '广东省广州市从化区江埔街凤院村',
    phone: '020-8799-0000',
    email: 'fengyuan@conghua.gov.cn',
  },
  culture: [
    { title: '欧阳宗祠', desc: '岭南宗祠建筑代表，梁架灰塑精美，是家族文化与村落记忆的核心。' },
    { title: '镬耳屋群', desc: '清代连片民居，青砖黛瓦、镬耳山墙，彰显广府与客家交融风貌。' },
    { title: '龙舟竞渡', desc: '凤院龙舟竞渡是村民共庆丰年的水上盛会，鼓声激荡间凝聚同宗情谊。' },
    { title: '粤剧戏台', desc: '粤韵悠扬入村巷，生旦净丑唱尽岭南风土与家国故事，乡音里见乡愁。' },
    { title: '掷彩头', desc: '节庆掷彩头祈福纳祥，彩球翻飞间寄托对五谷丰登、人丁兴旺的期盼。' },
  ],
};

export const seedDocuments: DocumentItem[] = [
  {
    slug: 'baiqianwan-plan',
    title: '凤院村“百千万工程”典型村建设方案',
    category: '政策文件',
    summary: '明确以“生态美、产业兴、百姓富”为主线，分三步推进典型村建设的总体安排。',
    content:
      '## 一、总体目标\n到 2027 年，把凤院村建成“百千万工程”省级典型村，实现人居环境、产业发展、治理效能“三个显著提升”。\n\n## 二、重点任务\n- 人居环境：完成古树公园提升、污水管网全覆盖、村道亮化。\n- 产业发展：做强荔枝与丝苗米，培育乡村研学与精品民宿。\n- 文化振兴：修缮欧阳宗祠，推动非遗活态传承。\n\n## 三、推进步骤\n分“夯基（2024）—提质（2025—2026）—示范（2027）”三步实施，逐年考核。',
    updatedAt: '2025-12-01',
    author: '村“百千万工程”工作专班',
    fileType: 'PDF',
    size: '2.4 MB',
  },
  {
    slug: 'village-plan-2023-2035',
    title: '凤院村村庄规划（2023—2035）',
    category: '政策文件',
    summary: '划定生态、农业、建设三类空间，明确村庄建设与风貌管控要求。',
    content:
      '## 一、空间格局\n划定“一轴两片多节点”：以主村道为轴，串联古村风貌片与生态研学片。\n\n## 二、风貌管控\n新建农房延续镬耳屋意象，坡屋顶、青砖色，高度不超过 12 米。\n\n## 三、设施配套\n预留研学营地、停车与游客中心用地，保障公共服务半径。',
    updatedAt: '2025-03-15',
    author: '区规划和自然资源分局',
    fileType: 'PDF',
    size: '8.1 MB',
  },
  {
    slug: 'village-rules',
    title: '凤院村村规民约',
    category: '村规民约',
    summary: '涵盖邻里和睦、环境卫生、耕地保护等十方面村民共同约定。',
    content:
      '## 一、爱村护村\n爱护古树名木与历史建筑，不损毁、不私占公共财物。\n\n## 二、干净整洁\n落实“门前三包”，垃圾分类入桶，不乱倒污水。\n\n## 三、邻里和睦\n有事多商量，不闹矛盾、不铺张攀比，弘扬好家风。',
    updatedAt: '2025-05-20',
    author: '凤院村村民委员会',
    fileType: 'PDF',
    size: '0.6 MB',
  },
  {
    slug: 'environment-points',
    title: '凤院村人居环境整治积分制办法',
    category: '村规民约',
    summary: '以“小积分”撬动“大治理”，参与环境维护可兑换生活用品。',
    content:
      '## 一、积分项目\n主动参与垃圾分类、房前屋后整治、义务植树等可获积分。\n\n## 二、兑换方式\n每月公示，积分可在“积分超市”兑换米油、文具等。\n\n## 三、激励约束\n年度积分靠前家庭优先评优，屡次不改者约谈提醒。',
    updatedAt: '2025-07-02',
    author: '凤院村村民委员会',
    fileType: 'PDF',
    size: '0.4 MB',
  },
  {
    slug: 'heritage-activation',
    title: '凤院村古村落保护与活化利用项目简介',
    category: '项目介绍',
    summary: '介绍欧阳宗祠、镬耳屋群修缮与“古村+研学”活化路径。',
    content:
      '## 一、保护对象\n欧阳宗祠、清代镬耳屋民居群、十二株百年古树。\n\n## 二、活化方式\n修旧如旧，植入村史馆、非遗工坊与研学课堂。\n\n## 三、预期成效\n年接待研学与游客 5 万人次，带动农户就近就业。',
    updatedAt: '2025-09-10',
    author: '村文旅运营小组',
    fileType: 'PDF',
    size: '3.0 MB',
  },
  {
    slug: 'investment-brochure',
    title: '凤院村乡村旅游招商手册',
    category: '招商手册',
    summary: '面向民宿、研学、农产品深加工等业态的招商政策与地块清单。',
    content:
      '## 一、重点招引\n精品民宿、亲子研学、农产品电商与深加工。\n\n## 二、扶持政策\n用地、租金与证照办理“一站代办”，典型案例给予奖补。\n\n## 三、联系方式\n招商专班电话 020-8799-0000，邮箱 fengyuan@conghua.gov.cn。',
    updatedAt: '2025-10-08',
    author: '凤院村招商专班',
    fileType: 'PDF',
    size: '5.2 MB',
  },
  {
    slug: 'travel-map',
    title: '凤院村生态研学旅游导览图',
    category: '旅游导览',
    summary: '标注宗祠、古树公园、研学田与美食打卡点的一日游动线。',
    content:
      '## 一、推荐动线\n村口牌坊 → 欧阳宗祠 → 镬耳屋群 → 古树公园 → 研学稻田 → 农家市集。\n\n## 二、打卡提示\n古树公园可 AR 认养，宗祠可 AR 导览，市集周末有客家小吃。\n\n## 三、实用信息\n停车免费，村内有观光电瓶车接驳。',
    updatedAt: '2025-11-12',
    author: '凤院村文旅运营小组',
    fileType: 'PDF',
    size: '1.8 MB',
  },
  {
    slug: 'gov-service-list',
    title: '凤院村政务服务“就近办”事项清单',
    category: '惠民服务',
    summary: '列出可在村便民服务站代办的高频事项与所需材料。',
    content:
      '## 一、可办事项\n社保认证、医保缴费、证明开具、残疾人补贴申请等 32 项。\n\n## 二、办理方式\n现场代办或“粤省事”线上办，特殊群体可预约上门。\n\n## 三、服务时间\n工作日 9:00—12:00，14:00—17:00，节假日预约服务。',
    updatedAt: '2025-12-05',
    author: '凤院村便民服务站',
    fileType: 'PDF',
    size: '0.9 MB',
  },
]

export const seedArticles: ArticleItem[] = [
  {
    slug: 'welcome-fengyuan',
    title: '走进凤院：一座八百年的客家古村',
    category: '村情介绍',
    summary: '凤院村背靠凤凰山、面朝流溪河，是广州北部保存完好的客家古村落，今天带你读懂它的前世今生。',
    content:
      '## 一、古村概况\n凤院村始建于南宋淳祐年间，距今已有八百余载历史。村内现存欧阳宗祠、清代镬耳屋民居群及十二株百年古树名木，是广州北部客家文化的典型代表。\n\n## 二、文化底蕴\n欧阳宗祠雕梁画栋、灰塑精美，是宗族文化与村落记忆的核心，构成了独特的古村文化景观。\n\n## 三、振兴新貌\n自纳入广东省“百千万工程”典型村以来，凤院村以人居环境提升、特色产业发展与文化活态传承为抓手，正走出一条生态美、产业兴、百姓富的乡村振兴之路。',
    author: '凤院村村委会',
    publishedAt: '2025-12-10',
    updatedAt: '2025-12-10',
    isPublished: true,
    cover: 'linear-gradient(135deg, oklch(0.60 0.13 155), oklch(0.34 0.075 155))',
  },
  {
    slug: 'ancient-halls',
    title: '祠堂里的凤院：欧阳宗祠与月竹公祠',
    category: '文化传承',
    summary: '祠堂不仅是祭祀场所，更是乡村历史与家族精神的容器。一起探访凤院的代表性祠堂。',
    content:
      '## 一、欧阳宗祠\n岭南宗祠建筑代表，梁架、灰塑与功名匾额保存完好，是凤院宗族文化的象征。\n\n## 二、月竹公祠\n村中另一处重要祠堂，砖木结构古韵犹存，见证着代代族人的祭祀与节庆活动。\n\n## 三、活态传承\n通过 AR 导览、研学讲解等方式，祠堂故事正以更生动的形式走进年轻人视野。',
    author: '凤院寻迹实践团',
    publishedAt: '2025-11-28',
    updatedAt: '2025-11-28',
    isPublished: true,
    cover: 'linear-gradient(135deg, oklch(0.78 0.12 85), oklch(0.525 0.205 27))',
  },
]

// ============================================================
// 持久化与读写（前台读取 + 后台管理共用）
// 站点配置以 site.json 覆盖种子；文档以 documents.json 全量覆盖。
// ============================================================
// 内容数据持久化目录：优先读 DATA_DIR（部署时挂载为 volume），默认落在 backend/data
const dataDir = path.join(process.env.DATA_DIR || path.join(process.cwd(), 'data'))
const siteStoreFile = path.join(dataDir, 'site.json')
const docStoreFile = path.join(dataDir, 'documents.json')

/** 确保持久化目录存在，避免写入时因目录缺失而静默失败 */
function ensureDataDir(): void {
  try {
    fs.mkdirSync(dataDir, { recursive: true })
  } catch {
    // 目录创建失败会在后续 writeFileSync 处继续暴露
  }
}

/** 合并种子配置与本地覆盖，返回当前生效的站点配置 */
export function getSiteConfig(): SiteConfig {
  try {
    if (fs.existsSync(siteStoreFile)) {
      const override = JSON.parse(fs.readFileSync(siteStoreFile, 'utf-8')) as Partial<SiteConfig>
      return { ...siteConfig, ...override }
    }
  } catch {
    // 读取失败则回退种子数据
  }
  return siteConfig
}

/** 全量保存站点配置（后台编辑后调用） */
export function saveSiteConfig(cfg: SiteConfig): void {
  ensureDataDir()
  siteConfig = { ...siteConfig, ...cfg }
  try {
    fs.writeFileSync(siteStoreFile, JSON.stringify(siteConfig, null, 2), 'utf-8')
  } catch {
    // 持久化失败不影响内存返回
  }
}

let documents: DocumentItem[] = loadDocuments()

function loadDocuments(): DocumentItem[] {
  try {
    if (fs.existsSync(docStoreFile)) {
      return JSON.parse(fs.readFileSync(docStoreFile, 'utf-8')) as DocumentItem[]
    }
  } catch {
    // 读取失败则回退种子数据
  }
  return [...seedDocuments]
}

export function getDocuments(): DocumentItem[] {
  return documents
}

export function saveDocuments(list: DocumentItem[]): void {
  documents = list
  ensureDataDir()
  try {
    fs.writeFileSync(docStoreFile, JSON.stringify(list, null, 2), 'utf-8')
  } catch {
    // 持久化失败不影响内存返回
  }
}

export function upsertDocument(doc: DocumentItem): DocumentItem {
  const idx = documents.findIndex((d) => d.slug === doc.slug)
  if (idx >= 0) documents[idx] = doc
  else documents = [doc, ...documents]
  saveDocuments(documents)
  return doc
}

export function deleteDocument(slug: string): boolean {
  const before = documents.length
  documents = documents.filter((d) => d.slug !== slug)
  if (documents.length !== before) {
    saveDocuments(documents)
    return true
  }
  return false
}

const articleStoreFile = path.join(dataDir, 'articles.json')

let articles: ArticleItem[] = loadArticles()

function loadArticles(): ArticleItem[] {
  try {
    if (fs.existsSync(articleStoreFile)) {
      return JSON.parse(fs.readFileSync(articleStoreFile, 'utf-8')) as ArticleItem[]
    }
  } catch {
    // 读取失败则回退种子数据
  }
  return [...seedArticles]
}

export function getArticles(): ArticleItem[] {
  return articles
}

export function saveArticles(list: ArticleItem[]): void {
  articles = list
  ensureDataDir()
  try {
    fs.writeFileSync(articleStoreFile, JSON.stringify(list, null, 2), 'utf-8')
  } catch {
    // 持久化失败不影响内存返回
  }
}

export function upsertArticle(article: ArticleItem): ArticleItem {
  const idx = articles.findIndex((a) => a.slug === article.slug)
  if (idx >= 0) articles[idx] = article
  else articles = [article, ...articles]
  saveArticles(articles)
  return article
}

export function deleteArticle(slug: string): boolean {
  const before = articles.length
  articles = articles.filter((a) => a.slug !== slug)
  if (articles.length !== before) {
    saveArticles(articles)
    return true
  }
  return false
}
