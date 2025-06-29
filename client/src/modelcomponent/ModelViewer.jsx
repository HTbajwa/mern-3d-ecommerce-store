import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

function ModelViewer({ modelPath }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const modelRef = useRef();

  useEffect(() => {
    if (!gltf.scene) return;

    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    gltf.scene.position.sub(center);

    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scaleFactor = maxDim > 0 ? 2.5 / maxDim : 1;
    gltf.scene.scale.setScalar(scaleFactor);
    gltf.scene.rotation.y = -Math.PI / 2;
   
  }, [gltf]);

  return <primitive object={gltf.scene} ref={modelRef} />;
}

export default ModelViewer;
