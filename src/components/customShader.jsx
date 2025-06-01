import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// No macro import needed with vite-plugin-glsl

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform vec2 uMouse;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    float dist = distance(vUv, uMouse);
    vec3 color = mix(uColor, vec3(1.0, 0.0, 0.0), dist * 2.0);
    gl_FragColor = vec4(color, 1.0);
  }
`

const ColorShaderMaterial = shaderMaterial(
  {
    uMouse: new THREE.Vector2(),
    uColor: new THREE.Color(0.4, 0.7, 0.9)
  },
  vertexShader,
  fragmentShader
)

export default ColorShaderMaterial
