import type { SiteConfig } from '@/types'

/**
 * 凤院村 · 百千万工程 站点数据（构建时写死）
 *
 * 纯静态版本：所有文案、链接、视频在构建时直接打包进前端，
 * 不再依赖后端 /api。后续如需修改内容，编辑本文件后重新构建即可。
 */
export const siteData: SiteConfig = {
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
}
