import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function Building({ position = [0, 0, 0], scale = [1, 1, 1], ...props }) {
  const buildingGroupRef = useRef();

  const podPoints = useMemo(() => {
    const podScale = 2.8;
    return [
      new THREE.Vector2(0, -5 * podScale * 0.3),
      new THREE.Vector2(5.5 * podScale * 0.7, -4 * podScale * 0.3),
      new THREE.Vector2(5.5 * podScale, 0),
      new THREE.Vector2(5.5 * podScale, 3 * podScale * 0.3),
      new THREE.Vector2(5.0 * podScale, 4 * podScale * 0.3),
      new THREE.Vector2(4.5 * podScale, 4.5 * podScale * 0.3)
    ];
  }, []);

  return (
    <group ref={buildingGroupRef} position={position} scale={scale} {...props}>
      {/* Small round island base for the factory */}
      <mesh position={[0, -3, 0]} receiveShadow>
        <cylinderGeometry args={[25, 28, 6, 32]} />
        <meshStandardMaterial color={0x4a7c59} roughness={0.8} />
      </mesh>

      {/* Monument */}
      <group position={[-15, 0.2, -15]}>
        <mesh>
          <cylinderGeometry args={[2, 2, 0.4, 32]} />
          <meshStandardMaterial color={0xaaaaaa} roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <boxGeometry args={[0.8, 2.5, 0.8]} />
          <meshStandardMaterial color={0x444444} metalness={0.8} roughness={0.4} />
        </mesh>
      </group>

      {/* 1. Rectangular Office Building */}
      <group position={[-25, 0, 0]}>
        {/* Main building */}
        <mesh position={[0, 15, 0]} castShadow receiveShadow>
          <boxGeometry args={[40, 14, 25]} />
          <meshStandardMaterial color={0xe0e0e0} roughness={0.7} metalness={0.2} />
        </mesh>

        {/* Roof */}
        <mesh position={[0, 22.5, 0]}>
          <boxGeometry args={[40.5, 1, 25.5]} />
          <meshStandardMaterial color={0x666666} />
        </mesh>

        {/* Windows on front face */}
        {Array.from({ length: 3 }, (_, i) => (
          Array.from({ length: 12 }, (_, j) => (
            <group key={`${i}-${j}`} position={[-19 + j * 3.2, 11 + i * 4, 12.6]}>
              <mesh>
                <boxGeometry args={[2.4, 2.4, 0.3]} />
                <meshStandardMaterial color={0x2c3e50} transparent opacity={0.8} />
              </mesh>
              <mesh>
                <boxGeometry args={[2.5, 2.5, 0.3]} />
                <meshStandardMaterial color={0x444444} metalness={0.8} roughness={0.4} />
              </mesh>
            </group>
          ))
        ))}

        {/* Red pillars */}
        {Array.from({ length: 2 }, (_, i) => (
          Array.from({ length: 4 }, (_, j) => (
            <mesh key={`${i}-${j}`} position={[-15 + j * 10, 4, -8 + i * 16]} castShadow>
              <cylinderGeometry args={[0.7, 0.7, 8, 24]} />
              <meshStandardMaterial color={0xc12127} />
            </mesh>
          ))
        ))}
      </group>

      {/* 2. Glass Cube Building */}
      <group position={[0, 10, 0]}>
        {/* Main glass cube */}
        <mesh castShadow>
          <boxGeometry args={[20, 20, 20]} />
          <meshStandardMaterial color={0xaaddff} metalness={0.1} roughness={0.1} transparent opacity={0.65} />
        </mesh>

        {/* Frame lines */}
        {Array.from({ length: 5 }, (_, i) => (
          <group key={i}>
            {/* Horizontal frames */}
            <mesh position={[0, -10 + i * 5, 10]}>
              <boxGeometry args={[20.4, 0.4, 0.4]} />
              <meshStandardMaterial color={0x444444} metalness={0.8} roughness={0.4} />
            </mesh>
            <mesh position={[0, -10 + i * 5, -10]}>
              <boxGeometry args={[20.4, 0.4, 0.4]} />
              <meshStandardMaterial color={0x444444} metalness={0.8} roughness={0.4} />
            </mesh>
            {/* Vertical frames */}
            <mesh position={[-10 + i * 5, 0, 10]}>
              <boxGeometry args={[0.4, 20.4, 0.4]} />
              <meshStandardMaterial color={0x444444} metalness={0.8} roughness={0.4} />
            </mesh>
            <mesh position={[-10 + i * 5, 0, -10]}>
              <boxGeometry args={[0.4, 20.4, 0.4]} />
              <meshStandardMaterial color={0x444444} metalness={0.8} roughness={0.4} />
            </mesh>
          </group>
        ))}

        {/* Roof */}
        <mesh position={[0, 10.5, 0]}>
          <boxGeometry args={[20.5, 1, 20.5]} />
          <meshStandardMaterial color={0x666666} />
        </mesh>

        {/* Double door */}
        <group position={[0, -6.5, 10]}>
          <mesh>
            <boxGeometry args={[5, 7, 0.5]} />
            <meshStandardMaterial color={0x444444} metalness={0.8} roughness={0.4} />
          </mesh>
          <mesh position={[-1.25, 0, 0]}>
            <boxGeometry args={[2.3, 6.8, 0.4]} />
            <meshStandardMaterial color={0x2c3e50} transparent opacity={0.8} />
          </mesh>
          <mesh position={[1.25, 0, 0]}>
            <boxGeometry args={[2.3, 6.8, 0.4]} />
            <meshStandardMaterial color={0x2c3e50} transparent opacity={0.8} />
          </mesh>
        </group>
      </group>

      {/* 3. UFO/Pod Building */}
      <group position={[18, 12, -5]}>
        {/* Pod shape from LatheGeometry */}
        <mesh castShadow>
          <latheGeometry args={[podPoints, 64]} />
          <meshStandardMaterial color={0xfc4f00} roughness={0.4} metalness={0.1} />
        </mesh>
        
        {/* Top roof circle */}
        <mesh position={[0, 3.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[12.6, 64]} />
          <meshStandardMaterial color={0xfc4f00} roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Curved window around the pod */}
        <mesh>
          <cylinderGeometry args={[13.5, 13.5, 4, 64, 1, true]} />
          <meshStandardMaterial color={0x2c3e50} transparent opacity={0.8} />
        </mesh>

        {/* Window mullions */}
        {Array.from({ length: 32 }, (_, i) => {
          const angle = (i / 32) * Math.PI * 2;
          const x = Math.cos(angle) * 13.5;
          const z = Math.sin(angle) * 13.5;
          return (
            <mesh key={i} position={[x, 0, z]}>
              <cylinderGeometry args={[0.15, 0.15, 4, 8]} />
              <meshStandardMaterial color={0x444444} metalness={0.8} roughness={0.4} />
            </mesh>
          );
        })}

        {/* Support pillars */}
        <mesh position={[0, -10, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
          <cylinderGeometry args={[1.2, 1, 15, 20]} />
          <meshStandardMaterial color={0xe0e0e0} roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, -10, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
          <cylinderGeometry args={[1.2, 1, 15, 20]} />
          <meshStandardMaterial color={0xe0e0e0} roughness={0.7} metalness={0.2} />
        </mesh>
      </group>

      {/* 4. Connector */}
      <group position={[-5, 12, 0]}>
        <mesh>
          <boxGeometry args={[10, 6, 6]} />
          <meshStandardMaterial color={0xe0e0e0} roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, 3]}>
          <boxGeometry args={[10.1, 4, 0.2]} />
          <meshStandardMaterial color={0xaaddff} metalness={0.1} roughness={0.1} transparent opacity={0.65} />
        </mesh>
        <mesh position={[0, 0, -3]}>
          <boxGeometry args={[10.1, 4, 0.2]} />
          <meshStandardMaterial color={0xaaddff} metalness={0.1} roughness={0.1} transparent opacity={0.65} />
        </mesh>
      </group>
    </group>
  );
} 