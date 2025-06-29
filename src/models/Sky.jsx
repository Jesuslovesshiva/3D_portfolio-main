import { Sky as DreiSky } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CustomClouds } from "./CustomClouds";

export function Sky({ isRotating }) {
  const skyRef = useRef();

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.15 * delta; // Slightly slower rotation for a more majestic feel
    }
  });

  return (
    <mesh ref={skyRef}>
      <DreiSky
        distance={450000}
        sunPosition={[-1, 0.05, -1]} // Sun is low on the horizon
        turbidity={1} 
        rayleigh={2} // Intense Rayleigh scattering for deep blue
        mieDirectionalG={0.95} // Reduces the brightness of the sun disk itself
        inclination={0.4} // Angled sun
        azimuth={0.25}
      />

      <CustomClouds />
    </mesh>
  );
}
