import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './preloader.css'

export default function Preloader ({ onComplete }) {
  const overlay = useRef(null)
  const preLogo = useRef(null)
  const fillBar = useRef(null)

  useEffect(() => {
    const navLogo = document.querySelector('.hero-name')
    const fromRect = preLogo.current.getBoundingClientRect()
    const toRect = navLogo.getBoundingClientRect()
    const dx = toRect.left - fromRect.left
    const dy = toRect.top - fromRect.top
    const scale = toRect.width / fromRect.width

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        gsap.set(navLogo, { visibility: 'visible' })
        onComplete()
      }
    })

    gsap.set(navLogo, { visibility: 'hidden' })

    tl.to(fillBar.current, { width: '100%', duration: 1.2, ease: 'none' })

    tl.to(preLogo.current, { x: dx, y: dy, scale, duration: 1.2 })

    tl.to(preLogo.current, { autoAlpha: 0, duration: 0.6 }, '-=0.3')

    tl.to(overlay.current, { autoAlpha: 0, duration: 0.2 }, '-=0.4')
  }, [onComplete])

  return (
    <div className='preloader' ref={overlay}>
      <h1 className='pre-dimi' ref={preLogo}>
        DIMI
      </h1>
      <div className='progress-bar'>
        <div className='progress-fill' ref={fillBar} />
      </div>
    </div>
  )
}
