import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, useFrame } from "@react-three/fiber";
import { Renderer, TextureLoader } from "expo-three";
import { THREE } from "expo-three";
global.THREE = global.THREE || THREE;
import * as React from "react";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Asset } from "expo-asset";

// Create an Asset from a resource
// const asset = Asset.fromModule(require("./image.png"));

// await asset.downloadAsync();

// This is the local URI
// const uri = asset.localUri;

export default function App() {
  return (
    <GLView
      style={{ flex: 1 }}
      // onContextCreate={(gl) => {
      //   // Create a WebGLRenderer without a DOM element
      //   const renderer = new Renderer({ gl });
      //   renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
      // }}
      onContextCreate={(gl) => {
        onContextCreate(gl).then(console.log).catch(console.error);
      }}
    />
  );
}
// function onContextCreate(gl) {
//   gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
//   gl.clearColor(0, 1, 1, 1);

//   // Create vertex shader (shape & position)
//   const vert = gl.createShader(gl.VERTEX_SHADER);
//   gl.shaderSource(
//     vert,
//     `
//     void main(void) {
//       gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
//       gl_PointSize = 150.0;
//     }
//   `
//   );
//   gl.compileShader(vert);

//   // Create fragment shader (color)
//   const frag = gl.createShader(gl.FRAGMENT_SHADER);
//   gl.shaderSource(
//     frag,
//     `
//     void main(void) {
//       gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
//     }
//   `
//   );
//   gl.compileShader(frag);

//   // Link together into a program
//   const program = gl.createProgram();
//   gl.attachShader(program, vert);
//   gl.attachShader(program, frag);
//   gl.linkProgram(program);
//   gl.useProgram(program);

//   gl.clear(gl.COLOR_BUFFER_BIT);
//   gl.drawArrays(gl.POINTS, 0, 1);

//   gl.flush();
//   gl.endFrameEXP();
// }
const onContextCreate = async (gl) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    gl.drawingBufferWidth / gl.drawingBufferHeight,
    0.1,
    1000
  );

  const renderer = new Renderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
  renderer.setClearColor(0xffffff, 0);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    map: new TextureLoader().load(require("./assets/images/swmansion.png")),
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 3;

  const animate = () => {
    this.rafID = requestAnimationFrame(animate);

    cube.rotation.x += 0.02;
    cube.rotation.y += 0.03;
    cube.position.x = Math.sin(cube.rotation.x);
    cube.position.y = Math.cos(cube.rotation.y);

    renderer.render(scene, camera);

    gl.endFrameEXP();
  };
  animate();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
