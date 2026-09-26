import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Journey from './sections/Journey'
import Identity from './sections/Identity'
import Cases from './sections/Cases'
import Universe from './sections/Universe'
import Insights from './sections/Insights'
import Stories from './sections/Stories'
import Capabilities from './sections/Capabilities'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Journey />
        <Identity />
        <Cases />
        <Universe />
        <Insights />
        <Stories />
        <Capabilities />
        <Contact />
      </main>
    </>
  )
}
