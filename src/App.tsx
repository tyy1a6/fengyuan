import { HashRouter, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AnimatedRoutes } from '@/components/AnimatedRoutes'
import { PageTransition } from '@/components/PageTransition'
import { Layout } from '@/components/Layout'
import Index from './pages/Index'
import About from './pages/About'
import VrView from './pages/VrView'
import Media from './pages/Media'
import NotFound from './pages/NotFound'

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <HashRouter>
        <AnimatedRoutes>
          <Route element={<Layout />}>
            <Route
              path="/"
              data-genie-title="首页"
              data-genie-key="Home"
              element={
                <PageTransition transition="slide-up">
                  <Index />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              data-genie-title="村情概况"
              data-genie-key="About"
              element={
                <PageTransition transition="fade">
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/vr"
              data-genie-title="VR全景"
              data-genie-key="VR"
              element={
                <PageTransition transition="fade">
                  <VrView />
                </PageTransition>
              }
            />
            <Route
              path="/media"
              data-genie-title="新媒体"
              data-genie-key="Media"
              element={
                <PageTransition transition="fade">
                  <Media />
                </PageTransition>
              }
            />
            <Route
              path="*"
              data-genie-key="NotFound"
              data-genie-title="Not Found"
              element={
                <PageTransition transition="fade">
                  <NotFound />
                </PageTransition>
              }
            />
          </Route>
        </AnimatedRoutes>
      </HashRouter>
    </TooltipProvider>
  )
}

export default App
