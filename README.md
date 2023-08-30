# sandfaller

Recreating the "sand falling" game.

This application uses HTML5 canvas to draw a "sand falling game" simulation. Players can "draw" various "elements" on the canvas that interact with each other. Three states of matter are modeled with different densities which affect its behavior.

Key problems in this application surround optimizing the simulation, as more "elements" on the screen require increasingly complex processing. HTML5 canvas will use hardware acceleration when available, but optimizing the computation of the game logic is critical.

## Spatial Indexing and Collision Detection

Collision detection is a "hot" area of the application in terms of computation.

The approach taken here is index the game world with a 2D grid of "cells" which acts as a "lookup table" for spatial information. Each "cell" could contain an "element". The game keeps track of and iterates an adjacent structure (an array of elements) and use the 2D array as a "lookup" table in order to optimize findings neighbors and collision detection. Using a parallel structure to spatially index the world is critical for optimization here.

A consideration for a quadtree was made, however I anticipate only implementing localized interaction between elements (its direct or near-direct neighbors) in a simple simulation with limited scope. A quadtree would excel if I need to perform operations on elements that are not closely localized, however I will keep the scope of the simulation small.

## Some properties of elements to "simulate"

- Three states of matter (solid, liquid, gas)
- Density
- Gravity
- Liquid and gasses propagating using diffusion


# Usage

- `npm run start` - start dev server w/ hot reload
- `npm run build` - bundle and optimize the project for prod. Builds to `/dist`
