import React, { useEffect, useRef } from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { CSSPlugin } from 'gsap/CSSPlugin'
import './navbar.css'

gsap.registerPlugin(TextPlugin, CSSPlugin)

export default function Navbar ({ loaded }) {
  const animRef = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    if (!loaded) return

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    // 1) Draw in each nav-letter
    tl.fromTo(
      '.nav-letter',
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        transformOrigin: 'left center',
        duration: 0.4,
        stagger: 0.04
      },
      0.3
    )

    // 2) Divider lines
    tl.to('.navbar', { '--dividerScale': 1, duration: 0.6 }, 0.3)
      .to('.nav-links', { '--linksDividerScale': 1, duration: 0.6 }, 0.3)
      .to('.navbar', { '--navBottomScale': 1, duration: 0.6 }, 0.3)
      .to('.nav-content', { '--bottomLineScale': 1, duration: 0.6 }, 0.3)

    // 3) Looping text
    const loop = gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
    const words = ['TAR', 'TROV']
    words.forEach(word => {
      loop.to(animRef.current, {
        text: word,
        duration: word.length * 0.15,
        ease: 'none'
      })
      loop.to({}, { duration: 0.8 })
      for (let i = word.length; i >= 0; i--) {
        loop.to(animRef.current, {
          text: word.substring(0, i),
          duration: 0.08,
          ease: 'none'
        })
      }
      loop.to({}, { duration: 0.4 })
    })

    // 4) Tagline type-out
    tl.fromTo(
      taglineRef.current,
      { text: '' },
      {
        text: 'Front-End Developer pedaling through pixels and problems.',
        duration: 3
      },
      1.5
    )
  }, [loaded])

  return (
    <nav className='navbar'>
      <div className='nav-name'>
        <h1 className='hero-name'>
          <span className='static'>DIMI</span>
          <span className='dynamic' ref={animRef}></span>
        </h1>
      </div>

      <div className='nav-content'>
        <ul className='nav-links'>
          {['home.', 'about.', 'work.'].map(item => (
            <li key={item}>
              {item.split('').map((char, i) => (
                <span key={i} className='nav-letter' style={{ '--i': i + 1 }}>
                  {char}
                </span>
              ))}
            </li>
          ))}
        </ul>

        <p className='tagline' ref={taglineRef}></p>

        <div className='social-icons'>
          <a href='#'>
            <FaLinkedin />
          </a>
          <a href='#'>
            <FaGithub />
          </a>
        </div>
      </div>
    </nav>
  )
}
