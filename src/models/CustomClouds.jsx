import * as THREE from 'three';
import { useRef, useMemo } from 'react';

// Helper function to create a single cloud group made of several "puffs"
const createCloud = () => {
  const cloudGroup = new THREE.Group();
  const cloudMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0,
    opacity: 0.8,
    transparent: true,
    roughness: 1,
  });

  const puffGeometry = new THREE.SphereGeometry(1, 8, 8); // Low-poly spheres for performance

  const puffs = [
    { pos: [0, 0, 0], scale: [5, 4, 5] },
    { pos: [3, -1, -2], scale: [3, 3, 3] },
    { pos: [-3, -0.5, 1], scale: [4, 3, 4] },
    { pos: [0, 1.5, -3], scale: [3, 3, 3] },
  ];

  puffs.forEach((puff) => {
    const mesh = new THREE.Mesh(puffGeometry, cloudMaterial);
    mesh.position.set(...puff.pos);
    mesh.scale.set(...puff.scale);
    cloudGroup.add(mesh);
  });
  
  // To avoid recalculating this on every render
  puffGeometry.dispose();
  
  return cloudGroup;
};

export function CustomClouds() {
  const clouds = useMemo(() => [
    { position: [-40, 25, -60], cloud: createCloud() },
    { position: [40, 20, -80], cloud: createCloud() },
    { position: [0, 30, -100], cloud: createCloud() },
    { position: [-50, 15, -120], cloud: createCloud() },
  ], []);

  return (
    <group>
      {clouds.map(({ cloud, position }, i) => (
        <primitive key={i} object={cloud} position={position} />
      ))}
    </group>
  );
} 