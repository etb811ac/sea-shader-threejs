<h1 align="center">🌊 Sea Shader</h1>

<p align="center">An animated ocean surface built from scratch with custom GLSL shaders — layered waves, depth-based color, and per-vertex displacement, all running on the GPU.</p>

<p align="center">
  <!-- TODO: replace with your deployed demo URL -->
  🔗 <b>Live Demo:</b> <i>coming soon</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white">
  <img src="https://img.shields.io/badge/GLSL-5586A4">
  <img src="https://img.shields.io/badge/WebGL-990000?logo=webgl&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white">
</p>

## About

A flat plane turned into a living sea by a pair of custom shaders. The **vertex shader** raises and lowers each point using big rolling waves plus layered Perlin noise for the smaller surface chop. The **fragment shader** mixes a deep-water and surface color based on wave height, so crests look lighter than troughs.

- 🌊 Multi-layer wave displacement (elevation + noise) in the vertex shader
- 🎨 Depth-based color mixing in the fragment shader
- 🎛️ Every wave and color parameter exposed through lil-gui
- ⏱️ Time-driven animation via shader uniforms

## Tech

Three.js · GLSL (custom vertex + fragment shaders) · Perlin noise · WebGL · lil-gui · Vite (`vite-plugin-glsl`)

## Run locally

```bash
npm install   # first time only
npm run dev   # local server at localhost:8080
npm run build # production build in dist/
```

---

<p align="center"><i>Part of my Three.js journey · <a href="https://estebanacuna.dev">estebanacuna.dev</a></i></p>
