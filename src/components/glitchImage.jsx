// src/components/GlitchImage.jsx
import React, { useRef } from 'react'
import './glitchImage.css'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { shaderMaterial, useTexture, OrbitControls } from '@react-three/drei'
import { gsap } from 'gsap'

const GlitchShaderMaterial = shaderMaterial(
  { uTexture: null, uTime: 0, uGlitchStrength: 0 },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uGlitchStrength;
    varying vec2 vUv;
    float rand(float x) {
      return fract(sin(x * 12.9898 + 78.233) * 43758.5453);
    }
    void main() {
      vec2 uv = vUv;
      const float BANDS = 8.0;
      float h = 1.0 / BANDS;
      float shift = 0.0;
      for (float i = 0.; i < BANDS; i++) {
        float y0 = i * h;
        if (uv.y > y0 && uv.y < y0 + h) {
          float r = rand(i + floor(uTime * 20.0));
          if (r < uGlitchStrength * 0.6) shift = (r - 0.3) * 0.7 * uGlitchStrength;
        }
      }
      uv.x += shift;
      vec4 col = texture2D(uTexture, uv);
      float r = texture2D(uTexture, uv + vec2(0.04 * uGlitchStrength, 0)).r;
      float g = texture2D(uTexture, uv + vec2(-0.04 * uGlitchStrength, 0)).g;
      float b = col.b;
      gl_FragColor = vec4(r, g, b, col.a);
    }
  `
)

extend({ GlitchShaderMaterial })

function GlitchMesh ({ imageUrl }) {
  const mat = useRef()
  const tex = useTexture(imageUrl)

  useFrame(({ clock }) => {
    if (mat.current) mat.current.uTime = clock.getElapsedTime()
  })

  const handlePointerOver = () => {
    gsap.to(mat.current, { uGlitchStrength: 1, duration: 0.2 })
  }

  const handlePointerOut = () => {
    gsap.to(mat.current, { uGlitchStrength: 0, duration: 0.6 })
  }

  return (
    <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <planeGeometry args={[10, (10 * 9) / 16]} />
      <glitchShaderMaterial ref={mat} uTexture={tex} />
    </mesh>
  )
}

export default function GlitchImage ({ imageUrl }) {
  return (
    <div className='glitch-canvas-wrapper'>
      <div className='canvas-inner-wrapper'>
        <Canvas orthographic camera={{ zoom: 80, position: [0, 0, 10] }}>
          <ambientLight intensity={1} />
          <GlitchMesh imageUrl={imageUrl} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>
    </div>
  )
}
