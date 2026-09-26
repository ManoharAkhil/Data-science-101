import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/*
  The Levonor L, filled with people.
  It starts as a flat montage wall (the 200+ testimonials), then each tile
  flips and flies into the L. Twenty tiles stay; the rest recede. The
  chamfered corner, the brand's signature cut, is edged in amber.

  One principle, used across the page: many voices, one letterform.
*/

const COLS = 10
const ROWS = 6
const CELL = 1
const GAP = 0.07

// L on a 5 x 7 grid, origin bottom-left: 2-wide stem, 2-high foot
function lCells() {
  const cells = []
  for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) if (c < 2 || r < 2) cells.push([c, r])
  return cells // 20 cells
}

const vertex = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aDelay;
  attribute float aKeep;
  attribute float aCell;
  attribute float aChamfer;
  uniform float uP;
  uniform float uSpread;
  uniform float uTime;
  varying vec2 vUv;
  varying float vCell;
  varying float vChamfer;
  varying float vFade;
  varying float vFace;

  float ease(float t) { return t < .5 ? 4.*t*t*t : 1. - pow(-2.*t + 2., 3.) / 2.; }

  mat3 rotY(float a) { float s = sin(a), c = cos(a); return mat3(c,0.,-s, 0.,1.,0., s,0.,c); }
  mat3 rotX(float a) { float s = sin(a), c = cos(a); return mat3(1.,0.,0., 0.,c,s, 0.,-s,c); }

  void main() {
    vUv = uv;
    vCell = aCell;
    vChamfer = aChamfer;
    float t = clamp((uP - aDelay) / .5, 0., 1.);
    float e = ease(t);

    vec3 target = aTo;
    // tiles that do not belong to the L drift back and away
    if (aKeep < .5) target = aFrom + vec3(sign(aFrom.x) * 1.6, sign(aFrom.y) * .9, -7.);
    vec3 pos = mix(aFrom, target, e);

    // scroll spread: the L gently comes apart as the hero leaves
    pos += vec3(aTo.xy * .18, aDelay * 6.) * uSpread * aKeep;

    // a half flip during travel, like a card turned over
    float flip = sin(e * 3.14159) * 3.14159 * .5;
    float idle = sin(uTime * .6 + aDelay * 12.) * .04 * e;
    vec3 p = rotX(idle) * rotY(flip) * position;

    float scale = aKeep > .5 ? 1. : 1. - e;
    vFade = aKeep > .5 ? 1. : 1. - e * .9;
    vFace = cos(flip);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p * scale + pos, 1.);
  }
`

const fragment = /* glsl */ `
  uniform sampler2D uAtlas;
  uniform vec3 uAmber;
  uniform vec3 uGround;
  varying vec2 vUv;
  varying float vCell;
  varying float vChamfer;
  varying float vFade;
  varying float vFace;

  void main() {
    // the chamfer: the bottom-left tile keeps only its upper-right half
    float d = vUv.x + vUv.y - 1.;
    if (vChamfer > .5 && d < 0.) discard;

    float i = floor(vCell + .5);
    vec2 cellUv = (vec2(mod(i, 4.), 3. - floor(i / 4.)) + vUv) / 4.;
    vec3 col = texture2D(uAtlas, cellUv).rgb;

    // soft tile edge so the grid reads as separate voices
    vec2 e = min(vUv, 1. - vUv);
    float edge = smoothstep(0., .03, min(e.x, e.y));
    col = mix(uGround, col, .35 + .65 * edge);

    // the back of a tile, seen mid-flip, is plain amber-warm charcoal
    col = mix(uGround * 1.6, col, smoothstep(-.1, .2, vFace));

    // amber hairline on the chamfer cut
    if (vChamfer > .5) col = mix(uAmber, col, smoothstep(.0, .035, d));

    gl_FragColor = vec4(col * vFade, 1.);
  }
`

function Tiles({ progress, spread, atlasUrl, onReady }) {
  const mesh = useRef()
  const mat = useRef()
  const { viewport, invalidate } = useThree()
  const ready = useRef(onReady)
  ready.current = onReady
  const texture = useMemo(() => {
    const t = new THREE.TextureLoader().load(atlasUrl, () => {
      invalidate() // redraw once in reduced-motion (demand) mode
      ready.current?.()
    })
    t.colorSpace = THREE.NoColorSpace
    t.anisotropy = 4
    return t
  }, [atlasUrl, invalidate])

  const { geometry, uniforms } = useMemo(() => {
    const cells = lCells()
    const n = COLS * ROWS
    const from = new Float32Array(n * 3)
    const to = new Float32Array(n * 3)
    const delay = new Float32Array(n)
    const keep = new Float32Array(n)
    const cell = new Float32Array(n)
    const chamfer = new Float32Array(n)
    const step = CELL + GAP
    // pick which wall tiles become the L: a spread-out, repeatable selection
    const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => ((a * 37) % n) - ((b * 37) % n))
    const lTile = new Map(order.slice(0, cells.length).map((tileIdx, k) => [tileIdx, cells[k]]))
    for (let i = 0; i < n; i++) {
      const c = i % COLS
      const r = Math.floor(i / COLS)
      from.set([(c - (COLS - 1) / 2) * step, ((ROWS - 1) / 2 - r) * step, -1.5], i * 3)
      const lc = lTile.get(i)
      if (lc) {
        keep[i] = 1
        to.set([(lc[0] - 2) * step, (lc[1] - 3) * step, 0], i * 3)
        chamfer[i] = lc[0] === 0 && lc[1] === 0 ? 1 : 0
        delay[i] = 0.1 + (lc[1] * 5 + lc[0]) * 0.012 // the L builds from the foot up
      } else {
        to.set([0, 0, 0], i * 3)
        delay[i] = 0.02 + ((i * 13) % n) * 0.004
      }
      cell[i] = (i * 7) % 16
    }
    const g = new THREE.InstancedBufferGeometry()
    const base = new THREE.PlaneGeometry(CELL, CELL)
    g.index = base.index
    g.setAttribute('position', base.getAttribute('position'))
    g.setAttribute('uv', base.getAttribute('uv'))
    g.setAttribute('aFrom', new THREE.InstancedBufferAttribute(from, 3))
    g.setAttribute('aTo', new THREE.InstancedBufferAttribute(to, 3))
    g.setAttribute('aDelay', new THREE.InstancedBufferAttribute(delay, 1))
    g.setAttribute('aKeep', new THREE.InstancedBufferAttribute(keep, 1))
    g.setAttribute('aCell', new THREE.InstancedBufferAttribute(cell, 1))
    g.setAttribute('aChamfer', new THREE.InstancedBufferAttribute(chamfer, 1))
    g.instanceCount = n
    return {
      geometry: g,
      uniforms: {
        uP: { value: 0 },
        uSpread: { value: 0 },
        uTime: { value: 0 },
        uAtlas: { value: null },
        uAmber: { value: new THREE.Color('#f2a33a') },
        uGround: { value: new THREE.Color('#161513') },
      },
    }
  }, [])
  uniforms.uAtlas.value = texture

  useEffect(() => () => { geometry.dispose(); texture.dispose() }, [geometry, texture])

  useFrame((state, dt) => {
    // write to the material's own uniforms: R3F copies the object on creation
    const u = mat.current.uniforms
    u.uAtlas.value = texture
    u.uTime.value += dt
    u.uP.value = progress.current
    u.uSpread.value = THREE.MathUtils.lerp(u.uSpread.value, spread.current, 0.1)
    const m = mesh.current
    // the finished L leans toward the pointer, like an object on a table
    const done = Math.min(1, progress.current * 1.2)
    m.rotation.y = THREE.MathUtils.lerp(m.rotation.y, state.pointer.x * 0.35 * done - 0.18 * done, 0.05)
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, -state.pointer.y * 0.2 * done, 0.05)
    // fit: the wall fills the frame, the L sits a little smaller
    const s = Math.min(viewport.width / (COLS * 1.1), viewport.height / (ROWS * 1.15))
    const sL = Math.min(viewport.width / 6.4, viewport.height / 8.4)
    m.scale.setScalar(THREE.MathUtils.lerp(s, sL, done))
  })

  return <mesh ref={mesh} geometry={geometry} frustumCulled={false}>
    <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} side={THREE.DoubleSide} />
  </mesh>
}

export default function LMotif({ progress, spread, atlasUrl, still = false, onReady }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 12], fov: 35 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      frameloop={still ? 'demand' : 'always'}
      aria-hidden="true"
    >
      <Tiles progress={progress} spread={spread} atlasUrl={atlasUrl} onReady={onReady} />
    </Canvas>
  )
}
