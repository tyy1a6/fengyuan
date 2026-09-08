import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { siteData } from '@/data/siteData'

const navItems = [
  { to: '/', label: '首页', end: true },
  { to: '/about', label: '村情概况', end: false },
  { to: '/vr', label: 'VR全景', end: false },
  { to: '/media', label: '新媒体', end: false },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const site = siteData
  const sealUrl = site?.logos?.seal || '/logos/fengyuan-seal.jpg'

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="container-village flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={sealUrl}
            alt="凤院寻迹"
            className="h-11 w-11 rounded-lg border border-theme-red/30 bg-white object-contain shadow-sm"
          />
          <span className="leading-tight">
            <span className="font-serif-cn block text-lg font-bold text-foreground">凤院村</span>
            <span className="block text-[11px] tracking-widest text-muted-foreground">
              百千万工程典型村
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-foreground/75 hover:bg-accent hover:text-foreground'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/media">
              关注我们 <ArrowUpRight className="size-4" />
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="菜单">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-serif-cn">凤院村导航</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-2">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-secondary text-secondary-foreground'
                            : 'text-foreground/80 hover:bg-accent'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    to="/media"
                    onClick={() => setOpen(false)}
                    className="mt-2 rounded-md bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
                  >
                    关注我们
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
