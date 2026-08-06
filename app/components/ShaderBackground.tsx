"use client";

import React from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

type ShaderType = "plane" | "sphere" | "waterPlane";

type ShaderBackgroundProps = {
  className?: string;
  type?: ShaderType;
  color1?: string;
  color2?: string;
  color3?: string;
};

const ShaderBackground = ({
  className = "",
  type = "sphere",
  color1 = "#92dbe0",
  color2 = "#ffa100",
  color3 = "#d5651e",
}: ShaderBackgroundProps) => {
  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
        <ShaderGradientCanvas
          style={{ width: "100%", height: "100%" }}
          lazyLoad={undefined}
          fov={undefined}
          pixelDensity={1}
          pointerEvents="none"
        >
        <ShaderGradient
          animate="on"
          type={type}
          wireframe={false}
          shader="defaults"
          uTime={0}
          uSpeed={0.3}
          uStrength={0.3}
          uDensity={0.8}
          uFrequency={5.5}
          uAmplitude={3.2}
          positionX={-0.1}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={130}
          rotationZ={70}
          color1={color1}
          color2={color2}
          color3={color3}
          reflection={0.4}
          cAzimuthAngle={270}
          cPolarAngle={180}
          cDistance={0.5}
          cameraZoom={15.1}
          lightType="env"
          brightness={0.8}
          envPreset="city"
          grain="on"
          toggleAxis={false}
          zoomOut={false}
          hoverState=""
          enableTransition={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
};

export default ShaderBackground;
