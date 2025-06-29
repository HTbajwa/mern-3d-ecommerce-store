import React from 'react';
import '@google/model-viewer';

const ModelARViewer = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <model-viewer
        src="/models/shoe.glb"  // Replace with your model
        alt="AR Product Model"
        ar
        ar-modes="scene-viewer webxr quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{ width: '100%', height: '100%' }}
      ></model-viewer>
    </div>
  );
};

export default ModelARViewer;
