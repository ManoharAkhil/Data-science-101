import { useCallback, useState } from 'react'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Welcome from './components/Welcome'
import Hero from './sections/Hero'
import Journey from './sections/Journey'
import Identity from './sections/Identity'
import MockFloor from './sections/MockFloor'
import Voices from './sections/Voices'
import Formats from './sections/Formats'
import Insights from './sections/Insights'
import Cases from './sections/Cases'
import Tour from './sections/Tour'
import Contact, { Skills } from './sections/Contact'

export default function App() {
  const [started, setStarted] = useState(false)
  const done = useCallback(() => setStarted(true), [])
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Welcome onDone={done} />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero started={started} />
        <Journey />
        <Identity />
        <MockFloor />
        <Voices />
        <Formats />
        <Insights />
        <Cases />
        <Tour />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
