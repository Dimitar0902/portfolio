import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './about.css'

gsap.registerPlugin(ScrollTrigger)

export default function About () {
  const aboutRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const elems = contentRef.current.querySelectorAll('.about-line')

    gsap.set(elems, { opacity: 0, y: 50 })

    gsap.to(elems, {
      opacity: 1,
      y: 0,
      stagger: 0.5,
      duration: 3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play none none reverse'
      }
    })
  }, [])

  return (
    <section id='about' ref={aboutRef} className='about'>
      <div className='about-inner'>
        <div className='about-left' ref={contentRef}>
          <p className='about-line'>
            <span className='about-label'>ABOUT</span> For 10 years, I've been
            delivering powerful, tailor-made websites that help brands anchor
            their authority.
          </p>
          <p className='about-line'>
            Now, I’m harnessing this cargo of expertise to propel your projects
            toward new and exciting horizons.
          </p>
        </div>
        <div className='about-right'>
          {/* Character floats into this zone */}
        </div>
      </div>
    </section>
  )
}
