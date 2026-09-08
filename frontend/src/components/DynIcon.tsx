import {
  Landmark,
  TreePine,
  Music,
  Sprout,
  Trees,
  BookOpen,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  Landmark,
  TreePine,
  Music,
  Sprout,
  Trees,
  BookOpen,
  Smartphone,
}

interface DynIconProps {
  name: string
  className?: string
}

/** 根据后端返回的名称渲染对应图标，未知名称回退为 Sparkles。 */
export function DynIcon({ name, className }: DynIconProps) {
  const Cmp = map[name] ?? Sprout
  return <Cmp className={className} />
}
