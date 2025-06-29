import { useEffect, useRef } from "react";
import { useGLTF, useAnimations, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import planeScene from "../assets/3d/plane.glb?url";

// Simple waving banner component
function WavingBanner({ planeRef }) {
  const bannerGroupRef = useRef();
  const bannerMeshRef = useRef();
  const textRef = useRef();
  const waveTime = useRef(0);

  useFrame((state, delta) => {
    if (!bannerMeshRef.current) return;
    
    waveTime.current += delta;
    
    // Create wave effect by modifying geometry vertices
    const geometry = bannerMeshRef.current.geometry;
    const positions = geometry.attributes.position;
    
    // Simple wave animation
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      // Create wave based on x position and time
      const waveOffset = Math.sin(x * 2 + waveTime.current * 3) * 0.1;
      const waveOffset2 = Math.sin(x * 3 + waveTime.current * 2) * 0.05;
      
      positions.setZ(i, waveOffset + waveOffset2);
    }
    
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    
    // Gentle movement of whole banner
    if (bannerGroupRef.current) {
      bannerGroupRef.current.rotation.z = Math.sin(waveTime.current * 1.5) * 0.03;
      bannerGroupRef.current.position.y = -0.3 + Math.sin(waveTime.current * 1.2) * 0.02;
    }

    // Make text wave with the banner
    if (textRef.current) {
      // Calculate wave at text position (similar to banner wave calculation)
      const textX = -0.8; // Text's relative X position
      const textWave = Math.sin(textX * 2 + waveTime.current * 3) * 0.08;
      const textWave2 = Math.sin(textX * 3 + waveTime.current * 2) * 0.04;
      
      // Apply wave motion to text position and rotation
      textRef.current.position.z = 1 + textWave + textWave2;
      textRef.current.rotation.x = 1 + textWave * 0.3;
      textRef.current.rotation.z = 1 + textWave2 * 0.2;
    }
  });

  return (
    <group ref={bannerGroupRef} position={[1.1, -2, -2.5]}>
      {/* Waving banner mesh */}
      <mesh ref={bannerMeshRef} rotation={[2.1, 1.6, 1]}>
        <planeGeometry args={[2.5, 0.65, 16, 4]} />
        <meshBasicMaterial 
          color="#ffffff" 
          side={THREE.DoubleSide}
          transparent
          opacity={1}
        />
      </mesh>
      
      {/* Banner text - positioned in front and not mirrored, with wave animation */}
      <Text
        ref={textRef}
        position={[-1.1, 0.45, 1.2]}
        rotation={[1, 1.6 + Math.PI, 1]}
        fontSize={0.15}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.8}
      >
       AUF JOBSUCHE
      </Text>
      

    </group>
  );
}

// 3D Model from: https://sketchfab.com/3d-models/stylized-ww1-plane-c4edeb0e410f46e8a4db320879f0a1db
export function Plane({ isRotating, ...props }) {
  const ref = useRef();
  // Load the 3D model and its animations
  const { scene, animations } = useGLTF(planeScene);
  // Get animation actions associated with the plane
  const { actions } = useAnimations(animations, ref);

  // Use an effect to control the plane's animation based on 'isRotating'
  useEffect(() => {
    if (isRotating) {
      actions["Take 001"]?.play();
    } else {
      actions["Take 001"]?.stop();
    }
  }, [actions, isRotating]);

  return (
    <group {...props}>
      <mesh ref={ref}>
        {/* use the primitive element when you want to directly embed a complex 3D model or scene */}
        <primitive object={scene} />
      </mesh>
      <WavingBanner planeRef={ref} />
    </group>
  );
}