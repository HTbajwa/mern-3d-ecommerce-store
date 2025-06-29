import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import "@google/model-viewer"; // Import the model-viewer library
import ModelViewer from "../modelcomponent/ModelViewer";
function ModelPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { modelPath } = location.state || {};

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="addnew d-block mb-2">
      <div className="d-flex justify-content-end mt-3 pe-3">
        <button onClick={handleClose} className="btn btn-secondary text-white closebtn">
          Close
        </button>
      </div>

      <div style={{ height: "100vh", width: "100%", marginTop: "20px" }}>
        {/* Use <model-viewer> for AR support */}
        {modelPath && (
          <Suspense
  fallback={
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white", // optional: prevent underlying 3D canvas flicker
        zIndex: 9999,
      }}
    >
      <Loader size={80} />
    </div>
  }
>

            <Canvas
              camera={{ position: [0, 1, 5], fov: 50 }}
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              {/* Lights */}
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} intensity={1} />

              {/* Model Viewer */}
              <ModelViewer modelPath={modelPath} />

              {/* Controls */}
              <OrbitControls enableZoom={true} />
            </Canvas>

            {/* Use <model-viewer> for AR */}
            <model-viewer
              src={modelPath}
              alt="3D Model"
              ar
              ar-modes="scene-viewer quick-look"
              camera-controls
              style={{ width: "100%", height: "500px" }}
            ></model-viewer>
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default ModelPage;
