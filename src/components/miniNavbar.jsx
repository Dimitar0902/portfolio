import React, { useEffect, useRef } from 'react'
import './miniNavbar.css'
import gsap from 'gsap'

export default function MiniNavbar ({ visible }) {
  const navRef = useRef(null)

  useEffect(() => {
    if (visible) {
      gsap.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        pointerEvents: 'auto'
      })
    } else {
      gsap.to(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        pointerEvents: 'none'
      })
    }
  }, [visible])

  return (
    <nav className='mini-navbar' ref={navRef}>
      <div className='mini-left'>
        <span className='mini-logo'>DIMI.</span>
        <span className='mini-divider'></span>
      </div>
      <div className='mini-right'>
        <ul>
          <li>
            <a href='#home'>home.</a>
          </li>
          <li>
            <a href='#about'>about.</a>
          </li>
          <li>
            <a href='#work'>work.</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
