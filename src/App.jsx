import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/navbar'
import About from './components/about'
import Work from './components/work'
import Preloader from './components/preloader'
import MiniNavbar from './components/miniNavbar'
import gsap from 'gsap'
import './index.css'

export default function App () {
  const [loaded, setLoaded] = useState(false)
  const [showMiniNav, setShowMiniNav] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    const aboutText = document.querySelector('.about-left')
    if (!aboutText) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMiniNav(entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0.1
      }
    )

    observer.observe(aboutText)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      const chars = scrollRef.current.querySelectorAll('span')
      chars.forEach(char => {
        gsap.set(char, { opacity: 1, y: 0 })
      })
    }
  }, [loaded])

  const handleHover = () => {
    if (!scrollRef.current) return
    const chars = scrollRef.current.querySelectorAll('span')
    gsap.to(chars, {
      y: -10,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        gsap.set(chars, { y: 10, opacity: 0 })
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out'
        })
      }
    })
  }

  return (
    <div className={`app ${loaded ? 'ready' : ''}`}>
      <Navbar loaded={loaded} />
      {loaded && (
        <div className='scroll-hint-wrapper'>
          <div
            className='scroll-hint'
            ref={scrollRef}
            onMouseEnter={handleHover}
          >
            {'{scroll}'.split('').map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </div>
        </div>
      )}
      <MiniNavbar visible={showMiniNav} />
      <About />
      <Work />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
    </div>
  )
}
