
import React, { useRef, useEffect } from 'react'
import characterImg from '../assets/character.png'
import './landing.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Landing () {
  const characterRef = useRef(null)

  useEffect(() => {
    const character = characterRef.current
    const target = document.querySelector('.about-right')

    if (!character || !target) return

    const characterBox = character.getBoundingClientRect()
    const targetBox = target.getBoundingClientRect()

    const x =
      targetBox.left +
      targetBox.width / 2 -
      (characterBox.left + characterBox.width / 2)
    const y =
      targetBox.top + window.scrollY - (characterBox.top + window.scrollY)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top center',
        end: 'bottom top', 
        scrub: true,
        toggleActions: 'play reverse play reverse',
        onEnter: () => character.classList.add('floating'),
        onLeaveBack: () => character.classList.remove('floating')
      }
    })

    tl.to(character, {
      x,
      y,
      duration: 1,
      ease: 'power2.out'
    })
  }, [])

  return (
    <section className='landing' id='landing'>
      <div className='scroll-hint'>
        {'{scroll}'.split('').map((char, i) => (
          <span key={i} className='scroll-letter' style={{ '--i': i }}>
            {char}
          </span>
        ))}
      </div>

      <div className='character-wrapper'>
        <div className='character' ref={characterRef}>
          <img src={characterImg} alt='Illustrated avatar' />
        </div>
      </div>
    </section>
  )
}
