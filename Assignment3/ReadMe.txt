Solar System Simulation Program

This solar system simulation program is written using WebGL1. It depicts the Sun, the 8 major planets, and their orbits, while also implementing the Phong lighting model. Additionally, the program includes a point light source that rotates around the center of the scene.

Features:

Renders the Sun, 8 major planets, and their orbits.
Incorporates the Phong lighting model, bringing realistic illumination effects to the planetary surfaces.
Contains a point light source that orbits around the center of the scene, providing illumination effects on the planetary surfaces.
Technical Highlights:

Utilizes trigonometric functions to generate points on a circumference for depicting planet orbits.
Also employs trigonometric functions to calculate formulas for rotation around any given point.
Incorporates Lambert diffuse reflection and Phong specular reflection for lighting.
Added high-definition texture maps for each planet. The asynchronous loading of these textures is facilitated using the Image object, ensuring texture creation only post successful loading via the await mechanism.
How to Use:

Download all the project files locally, ensuring they all remain in the same directory.

Run the built-in server.py to launch a local server.

Controls:

Press the 'P' key to initiate the point light source animation.
Arrow keys (up, down, left, right) control the camera.
Additionally, the whole system can be dragged using the left mouse button