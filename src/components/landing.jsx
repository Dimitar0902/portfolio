import React, { useRef, useEffect } from 'react'
import characterImg from '../assets/character.png'
import './landing.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Landing () {
  // const characterRef = useRef(null)

  // useEffect(() => {
  //   const character = characterRef.current
  //   const aboutLeft = document.querySelector('.about-left')
  //   const aboutRight = document.querySelector('.about-right')

  //   if (!character || !aboutLeft || !aboutRight) return

  //   const characterBox = character.getBoundingClientRect()
  //   const leftBox = aboutLeft.getBoundingClientRect()
  //   const rightBox = aboutRight.getBoundingClientRect()

  //   const x =
  //     rightBox.left +
  //     rightBox.width / 2 -
  //     (characterBox.left + characterBox.width / 2)

  //   const y =
  //     leftBox.top +
  //     leftBox.height / 2 +
  //     window.scrollY -
  //     (characterBox.top + characterBox.height / 2 + window.scrollY)

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: aboutLeft,
  //       // start: 'top 90%',
  //       // end: 'top 10%',
  //       markers: true,
  //       scrub: true,
  //       toggleActions: 'play reverse play reverse',
  //       onEnter: () => character.classList.add('floating'),
  //       onLeaveBack: () => character.classList.remove('floating')
  //     }
  //   })

  //   tl.to(character, {
  //     x,
  //     y,
  //     duration: 1.5,
  //     ease: 'linear',
  //     immediateRender: false
  //   })
  // }, [])

  return (
    <section className='landing' id='landing'>
      <div className='scroll-hint'>
        {'{scroll}'.split('').map((char, i) => (
          <span key={i} className='scroll-letter' style={{ '--i': i }}>
            {char}
          </span>
        ))}
      </div>

      {/* <div className='character-wrapper'>
        <div className='character' ref={characterRef}>
          <img src={characterImg} alt='Illustrated avatar' />
        </div>
      </div> */}
    </section>
  )
}
