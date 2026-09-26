import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// The hero object: a single form that is never quite the same shape twice.
// It stands in for the portfolio's thesis, thinking made tangible: an idea
// (noise) given a surface you can almost touch (lighting, fresnel rim).

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`

const vertex = /* glsl */ `
uniform float uTime; uniform float uAmp; uniform vec3 uPointer;
varying vec3 vNormal; varying vec3 vView; varying float vDisp;
${noise}
float field(vec3 p){
  float n = snoise(p*.9 + vec3(0., uTime*.16, 0.));
  n += .22*snoise(p*1.7 - vec3(uTime*.1));
  // the form leans toward the pointer
  n += .35*max(0., dot(normalize(p), normalize(uPointer + vec3(0.,0.,.001)))) * length(uPointer);
  return n;
}
void main(){
  vec3 p = position;
  float d = field(p) * uAmp;
  vec3 displaced = p + normal * d;
  // recompute the normal from neighbouring samples so lighting follows the morph
  vec3 t = normalize(cross(normal, vec3(0.,1.,.01)));
  vec3 b = normalize(cross(normal, t));
  float e = .01;
  vec3 pt = p + t*e; vec3 pb = p + b*e;
  vec3 dt = pt + normalize(pt) * field(pt) * uAmp;
  vec3 db = pb + normalize(pb) * field(pb) * uAmp;
  vec3 n = normalize(cross(dt - displaced, db - displaced));
  vNormal = normalize(normalMatrix * n);
  vec4 mv = modelViewMatrix * vec4(displaced, 1.);
  vView = normalize(-mv.xyz);
  vDisp = d;
  gl_Position = projectionMatrix * mv;
}`

const fragment = /* glsl */ `
uniform vec3 uAccent; uniform vec3 uInk; uniform vec3 uBase; uniform float uTime;
varying vec3 vNormal; varying vec3 vView; varying float vDisp;
void main(){
  vec3 n = normalize(vNormal);
  float fres = pow(1. - max(dot(n, vView), 0.), 2.6);
  vec3 L1 = normalize(vec3(-.6, .8, .6));
  vec3 L2 = normalize(vec3(.8, -.3, .4));
  float diff = max(dot(n, L1), 0.);
  float spec = pow(max(dot(reflect(-L1, n), vView), 0.), 48.);
  float spec2 = pow(max(dot(reflect(-L2, n), vView), 0.), 16.);
  // chrome-like banding driven by the normal, tinted into the palette
  float band = .5 + .5*sin(n.y*6. + n.x*3. + uTime*.4 + vDisp*4.);
  vec3 col = mix(uBase, uInk*.55, band*.35 + diff*.25);
  col += uAccent * fres * 1.1;
  col += uAccent * spec2 * .35;
  col += vec3(1.) * spec * .9;
  gl_FragColor = vec4(col, 1.);
}`

function Blob({ progress }) {
  // ~20k vertices on phones, ~60k on desktops: smooth silhouette, cheap shader
  const detail = useMemo(() => (window.matchMedia('(max-width: 767px)').matches ? 32 : 56), [])
  const mesh = useRef()
  const pointer = useRef(new THREE.Vector3())
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.2 },
      uPointer: { value: new THREE.Vector3() },
      uAccent: { value: new THREE.Color('#d4ff3f') },
      uInk: { value: new THREE.Color('#ecefe3') },
      uBase: { value: new THREE.Color('#12150e') },
    }),
    []
  )

  useFrame((state, dt) => {
    const u = uniforms
    const p = progress.current
    u.uTime.value += dt
    // pointer is normalised -1..1; ease it so the form responds like a body
    pointer.current.lerp(new THREE.Vector3(state.pointer.x * 1.2, state.pointer.y * 1.2, 0.6), 0.06)
    u.uPointer.value.copy(pointer.current)
    // scrolling away agitates the form, then lets it drift off
    u.uAmp.value = THREE.MathUtils.lerp(u.uAmp.value, 0.2 + p * 0.45, 0.08)
    const m = mesh.current
    m.rotation.y += dt * (0.12 + p * 0.6)
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, state.pointer.y * 0.35 + p * 0.8, 0.05)
    m.position.y = THREE.MathUtils.lerp(m.position.y, p * 1.4, 0.08)
    const s = 1 - p * 0.35
    m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, s, 0.08))
  })

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.05, detail]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  )
}

function Dust() {
  const ref = useRef()
  const positions = useMemo(() => {
    const n = 700
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = 2.1 + Math.random() * 1.6
      const t = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      arr.set([r * Math.sin(ph) * Math.cos(t), r * Math.cos(ph) * 0.6, r * Math.sin(ph) * Math.sin(t)], i * 3)
    }
    return arr
  }, [])
  useFrame((_, dt) => {
    ref.current.rotation.y -= dt * 0.03
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#d4ff3f" transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

export default function HeroScene({ progress, still = false }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.6], fov: 40 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      frameloop={still ? 'demand' : 'always'}
      aria-hidden="true"
    >
      <Blob progress={progress} />
      <Dust />
    </Canvas>
  )
}
