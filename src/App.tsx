import * as React from "react";
import useWindowSize from "@rooks/use-window-size";
import ParticleImage, {
  ParticleOptions,
  Vector,
  forces,
  ParticleForce,
} from "react-particle-image";
import omParticle from "./images/omParticles.jpg";
import "./index.css";

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    // Get pixel
    const pixel = image.get(x, y);
    // Make a particle for this pixel if blue > 50 (range 0-255
    return pixel.b > 50 && pixel.b < 255;
  },
  color: ({ x, y, image }) => "white",
  radius: () => Math.random() * 1.5 + 0.5,
  mass: () => 40,
  friction: () => 0.15,
  initialPosition: ({ canvasDimensions }) => {
    return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2);
  },
};

const motionForce = (x: number, y: number): ParticleForce => {
  return forces.disturbance(x, y, 40);
};

export default function App() {
  const { innerWidth, innerHeight } = useWindowSize();

  return (
    <ParticleImage
      src={omParticle}
      width={Number(innerWidth)}
      height={Number(innerHeight)}
      scale={1.2}
      entropy={5}
      maxParticles={6000}
      particleOptions={particleOptions}
      mouseMoveForce={motionForce}
      touchMoveForce={motionForce}
      backgroundColor="#191D1F"
    />
  );
}
