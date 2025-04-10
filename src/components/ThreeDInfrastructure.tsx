
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useSound } from './SoundContext';
import * as THREE from 'three';

// Node component with proper typings
const Node: React.FC<{
  position: [number, number, number];
  name: string;
  color?: string;
  onClick?: () => void;
  onPointerOver?: () => void;
}> = ({ position, name, color = 'dodgerblue', onClick, onPointerOver }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (onPointerOver) onPointerOver();
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
      >
        <boxGeometry args={[1, 0.5, 0.5]} />
        <meshStandardMaterial 
          color={hovered ? 'white' : color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

// Connection component with proper typings
const Connection: React.FC<{ 
  start: [number, number, number]; 
  end: [number, number, number]; 
}> = ({ start, end }) => {
  const points = [
    new THREE.Vector3(...start), 
    new THREE.Vector3(...end)
  ];
  
  const lineGeometry = React.useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(points);
    return geometry;
  }, [points]);
  
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="white" opacity={0.4} transparent />
    </line>
  );
};

// Main CI Pipeline component
const CIPipeline: React.FC = () => {
  const { playHover, playClick, playSuccess } = useSound();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  
  const nodes = [
    { name: 'Code', position: [-4, 1, 0] as [number, number, number], color: '#22a7f0' },
    { name: 'Build', position: [-2, 1, 0] as [number, number, number], color: '#f3a935' },
    { name: 'Test', position: [0, 1, 0] as [number, number, number], color: '#b3c4d4' },
    { name: 'Deploy', position: [2, 1, 0] as [number, number, number], color: '#2ecc71' },
    { name: 'Monitor', position: [4, 1, 0] as [number, number, number], color: '#9b59b6' },
    
    { name: 'Docker', position: [-3, -1, 0] as [number, number, number], color: '#34b4eb' },
    { name: 'Kubernetes', position: [-1, -1, 0] as [number, number, number], color: '#3970e4' },
    { name: 'Terraform', position: [1, -1, 0] as [number, number, number], color: '#7B42BC' },
    { name: 'AWS', position: [3, -1, 0] as [number, number, number], color: '#FF9900' },
  ];

  const connections = [
    { start: [-4, 1, 0] as [number, number, number], end: [-2, 1, 0] as [number, number, number] },
    { start: [-2, 1, 0] as [number, number, number], end: [0, 1, 0] as [number, number, number] },
    { start: [0, 1, 0] as [number, number, number], end: [2, 1, 0] as [number, number, number] },
    { start: [2, 1, 0] as [number, number, number], end: [4, 1, 0] as [number, number, number] },
    { start: [-3, -1, 0] as [number, number, number], end: [-1, -1, 0] as [number, number, number] },
    { start: [-1, -1, 0] as [number, number, number], end: [1, -1, 0] as [number, number, number] },
    { start: [1, -1, 0] as [number, number, number], end: [3, -1, 0] as [number, number, number] },
    { start: [-3, -1, 0] as [number, number, number], end: [-2, 1, 0] as [number, number, number] },
    { start: [-1, -1, 0] as [number, number, number], end: [0, 1, 0] as [number, number, number] },
    { start: [1, -1, 0] as [number, number, number], end: [2, 1, 0] as [number, number, number] },
  ];

  const handleNodeClick = (nodeName: string) => {
    playClick();
    setActiveNode(nodeName);
    setTimeout(() => playSuccess(), 300);
  };

  return (
    <>
      {connections.map((connection, i) => (
        <Connection key={i} start={connection.start} end={connection.end} />
      ))}
      
      {nodes.map((node) => (
        <Node 
          key={node.name}
          position={node.position}
          name={node.name}
          color={node.color}
          onClick={() => handleNodeClick(node.name)} 
          onPointerOver={playHover}
        />
      ))}
      
      {activeNode && (
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={10}
        >
          {`${activeNode} - DevOps Pipeline Component`}
        </Text>
      )}
    </>
  );
};

const ThreeDInfrastructure: React.FC = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] bg-terminal-dark/50 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <CIPipeline />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          makeDefault
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/70 p-2 rounded">
        Click and drag to rotate | Scroll to zoom
      </div>
    </div>
  );
};

export default ThreeDInfrastructure;
