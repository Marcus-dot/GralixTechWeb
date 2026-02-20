import { useRef } from "react";
import { useFrame, useThree, Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const FluidBlob = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { mouse } = useThree();

    // Detect light vs dark mode by checking the document class
    const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
    const blobColor = isDark ? "hsl(233, 50%, 15%)" : "hsl(233, 70%, 50%)";

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        // Subtle organic rotation
        meshRef.current.rotation.x = Math.cos(time * 0.2) * 0.1;
        meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;

        // Mouse reactivity - move the blob slightly to react to user presence
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 2, 0.05);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 1, 0.05);
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={[3, 3, 3]}>
                <sphereGeometry args={[1, 128, 128]} />
                <MeshDistortMaterial
                    color={blobColor}
                    speed={3}
                    distort={0.45}
                    radius={1}
                    metalness={0.6}
                    roughness={0.3}
                />
            </mesh>
        </Float>
    );
};

const Lights = () => {
    return (
        <>
            <ambientLight intensity={0.4} />
            {/* Brand-inspired colorful lights for the lava lamp/aurora effect */}
            <spotLight position={[10, 10, 10]} intensity={3} color="#f97316" penumbra={1} /> {/* Orange */}
            <pointLight position={[-10, -10, -5]} intensity={2} color="#4f46e5" /> {/* Indigo */}
            <pointLight position={[5, -5, 5]} intensity={1.5} color="#fbbf24" /> {/* Gold */}
        </>
    );
};

/**
 * Replace particles with a fluid/liquid gradient simulation.
 * Ambient and calming morphing blob using R3F.
 */
const HeroScene = () => {
    return (
        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
            <Canvas
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <Lights />
                <FluidBlob />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
};

export default HeroScene;
