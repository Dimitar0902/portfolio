import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './about.css'
import characterImg from '../assets/character.png'

gsap.registerPlugin(ScrollTrigger)

export default function About () {
  const aboutRef = useRef(null)
  const contentRef = useRef(null)
  const characterRef = useRef(null)

  useEffect(() => {
    const character = characterRef.current
    const content = document.querySelector('.about-left')
    // const aboutRight = document.querySelector('.about-right')

    if (!character || !content) return

    const aboutBox = aboutRef.current.getBoundingClientRect()
    const contentBox = content.getBoundingClientRect()
    // const rightBox = aboutRight.getBoundingClientRect()

    // const x =
    //   rightBox.left +
    //   rightBox.width / 2 -
    //   (characterBox.left + characterBox.width / 2)

    const y = window.innerHeight * 0.5 + contentBox.height * 0.5

    const x = contentBox.width * 0.5

    const offset = contentBox.top - aboutBox.top + contentBox.height * 0.5

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: `top 0%`,
        end: `+=${offset - window.innerHeight * 0.5}px`,
        scrub: true,
        toggleActions: 'play reverse play reverse',
        onEnter: () => character.classList.add('floating'),
        onLeaveBack: () => character.classList.remove('floating')
      }
    })

    tl.to(character, {
      x,
      y,
      duration: 1.5,
      ease: 'linear',
      immediateRender: false
    })
  }, [])

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
      <div className='character-wrapper'>
        <div className='character' ref={characterRef}>
          <img src={characterImg} alt='Illustrated avatar' />
        </div>
      </div>

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
        <div className='about-right'></div>
      </div>
    </section>
  )
}
