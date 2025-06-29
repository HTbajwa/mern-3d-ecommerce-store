import React from "react";


function ModelARPage() {
  const query = new URLSearchParams(window.location.search);
  let modelUrl = query.get("model");

  // Replace localhost with your actual IP if needed
  if (modelUrl?.includes("localhost")) {
    modelUrl = modelUrl.replace("localhost", "192.168.187.227");
  }

  console.log("Model URL:", modelUrl);

  return (
    <div className="flex justify-center items-center h-screen">
     <model-viewer
  src={modelUrl}
  alt="AR Model"
  auto-rotate
  camera-controls
  ar
  ar-modes="scene-viewer quick-look webxr"
  style={{ width: "100%", height: "100%" }}
  onError={(e) => {
    alert("Model failed to load");
    console.error("Model loading error:", e);
  }}
></model-viewer>

    </div>
  );
}

export default ModelARPage;
