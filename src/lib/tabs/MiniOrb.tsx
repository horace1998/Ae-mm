import { useEffect, useRef } from "react";
import * as THREE from "three";
import confetti from "canvas-confetti";

export default function MiniOrb({ onShatter }: { onShatter: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hitsRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const w = 300;
    const h = 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    const geo = new THREE.IcosahedronGeometry(1.2, 2);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xff00cc,
      emissive: 0x330033,
      wireframe: true,
      roughness: 0
    });
    const orb = new THREE.Mesh(geo, mat);
    scene.add(orb);

    const light = new THREE.PointLight(0xff4dcc, 1, 10);
    light.position.set(2, 2, 2);
    scene.add(light);
    
    scene.add(new THREE.AmbientLight(0x221133));

    let frameId: number;

    const animate = () => {
      orb.rotation.x += 0.01;
      orb.rotation.y += 0.015;
      
      // Scale bounces back slightly
      const currentScale = orb.scale.x;
      if (currentScale > 1) {
        orb.scale.setScalar(currentScale - 0.02);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleClick = () => {
      hitsRef.current += 1;
      orb.scale.setScalar(1 + hitsRef.current * 0.1);
      
      mat.emissive.setHex(0xff4dcc);
      setTimeout(() => {
        if(mat) mat.emissive.setHex(0x330033);
      }, 100);

      if (hitsRef.current >= 10) {
        // Shatter
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF4DCC', '#A78BFA', '#60A5FA']
        });
        onShatter();
        hitsRef.current = 0; // reset internally but maybe unmounted
      }
    };

    const canvas = renderer.domElement;
    canvas.style.cursor = 'pointer';
    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(frameId);
      containerRef.current?.removeChild(canvas);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [onShatter]);

  return <div ref={containerRef} className="w-[300px] h-[300px] flex-shrink-0" />;
}
