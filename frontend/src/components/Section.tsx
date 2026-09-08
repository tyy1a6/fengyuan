import { cn } from '@/lib/utils'

interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

/** 统一的区块标题：小标 + 主标题 + 描述，含百千万分隔纹样。 */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionTitleProps) {
  return (
    <div className={cn('mb-10', align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-serif-cn text-3xl font-bold text-foreground sm:text-4xl">
        {title}
      </h2>
      <div
        className={cn(
          'divider-bqw mt-4 w-24',
          align === 'center' && 'mx-auto'
        )}
      />
      {description && (
        <p
          className={cn(
            'mt-4 max-w-2xl text-muted-foreground',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
