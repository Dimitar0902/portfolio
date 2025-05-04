import React, { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import Landing from './components/landing'
import About from './components/about'
import Work from './components/work'
import Preloader from './components/preloader'
import MiniNavbar from './components/miniNavbar'
import './index.css'

export default function App () {
  const [loaded, setLoaded] = useState(false)
  const [showMiniNav, setShowMiniNav] = useState(false)

  useEffect(() => {
    const landingSection = document.getElementById('landing')
    if (!landingSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When landing is out of view, show mini nav
        setShowMiniNav(!entry.isIntersecting)
      },
      {
        threshold: 0.1
      }
    )

    observer.observe(landingSection)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className={`app ${loaded ? 'ready' : ''}`}>
      <Navbar loaded={loaded} />
      <MiniNavbar visible={showMiniNav} />
      <Landing />
      <About />
      <Work />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
    </div>
  )
}
