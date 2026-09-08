import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname)
  }, [location.pathname])

  return (
    <div className="flex min-h-[70vh] items-center justify-center hero-paper">
      <div className="container-village text-center">
        <span className="seal text-theme-red h-16 w-16 text-3xl font-bold">凤</span>
        <h1 className="mt-6 font-serif-cn text-6xl font-bold text-primary">404</h1>
        <p className="mt-3 text-lg text-muted-foreground">您访问的页面走失在古村小巷里了</p>
        <Button asChild className="mt-6">
          <Link to="/">返回首页</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
