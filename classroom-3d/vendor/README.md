# Three.js r170 (0.170.0)

Pinned, self-hosted ES modules. MIT licence in `LICENSE`.

- `three.module.min.js`: unchanged from [mrdoob/three.js, tag r170](https://github.com/mrdoob/three.js/blob/r170/build/three.module.min.js).
- `OrbitControls.js`: from [the same tag](https://github.com/mrdoob/three.js/blob/r170/examples/jsm/controls/OrbitControls.js). Only the `three` import was changed to `./three.module.min.js`, with a version comment.
- `LICENSE`: [upstream MIT licence](https://github.com/mrdoob/three.js/blob/r170/LICENSE).

SHA-256 of the unchanged Three.js module:
`08fd7545d13d2c7fb65ab691530a802dafefd638596501854f267d0fb13c39e7`

No CDN, npm install, import map, build step or remote resource is needed at runtime.
