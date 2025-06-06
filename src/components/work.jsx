// src/components/Work.jsx
import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorkItem from './workItem'
import './work.css'

gsap.registerPlugin(ScrollTrigger)

function SpinningShape () {
  const meshRef = useRef()
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x += 0.005
    }
  })
  return (
    <mesh ref={meshRef} scale={[2, 2, 2]} position={[8, 0, 0]}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial color='#5DADE2' metalness={0.7} roughness={0.2} />
    </mesh>
  )
}

export default function Work () {
  const sectionRef = useRef()
  const canvasRef = useRef()
  const titleRef = useRef()

  useEffect(() => {
    const ctx1 = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        })
        .from(canvasRef.current, {
          opacity: 0,
          y: 100,
          duration: 1.5,
          ease: 'power4.out'
        })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 100,
            duration: 1.5,
            ease: 'power4.out'
          },
          '-=1.4'
        )
    }, sectionRef)

    return () => {
      ctx1.revert()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  const base = import.meta.env.BASE_URL

  return (
    <section ref={sectionRef} className='work-section'>
      <div className='work-hero'>
        <div ref={canvasRef} className='canvas-wrapper'>
          <Canvas className='work-canvas'>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <SpinningShape />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
        <h1 ref={titleRef} className='work-title'>
          RECENT WORK
        </h1>
      </div>

      <div className='work-projects-wrapper'>
        <div className='work-projects-inner'>
          <WorkItem
            title='Dehaze'
            subtitle='Artist Portfolio Website'
            description='During my second semester, I created a portfolio website for an artist named Dehaze. The site showcases their work and provides a platform for potential clients to contact them.'
            image={`${base}assets/dehaze.png`}
            techStack={['HTML', 'CSS', 'JavaScript']}
            githubLink='https://github.com/Dimitar0902/DEHAZE'
          />
          <WorkItem
            title='PaveMind'
            subtitle='Burnout Prevention Web App'
            description='PaveMind is a web app aimed at helping users prevent and manage burnout through mood tracking and resources. Built as a final group project in semester 3.'
            image={`${base}assets/pavemind.png`}
            techStack={['JavaScript', 'Express.js', 'MongoDB']}
            githubLink='https://github.com/Dimitar0902/Pave-Mind'
          />
          <WorkItem
            title='Het Hornemann Huis'
            subtitle='Installation for Museum'
            description='An interactive installation for the Het Hornemann Huis museum, allowing visitors to explore the history of the building through a digital interface. Developed as a group project in semester 7.'
            image={`${base}assets/hornemann.png`}
            techStack={['JavaScript', 'TensorFlow', 'Three.js']}
            githubLink='https://github.com/Dimitar0902/The-Unremembered'
          />
        </div>
      </div>
    </section>
  )
}
