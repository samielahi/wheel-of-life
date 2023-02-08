import * as THREE from "three";

/**
 * Generates the points for custom plane buffer geometry
 * @returns THREE.Vector3[]
 */
function createStripPoints(): THREE.Vector3[] {
  // Define a custom buffer geometry for Zoetrope strip
  const numPoints = 200;
  const curvePoints: THREE.Vector3[] = [];
  const stripPoints: THREE.Vector3[] = [];
  const bounds = [-0.25, 0.25];

  // Create an array of points that make up a circle curve
  for (let i = 0; i < numPoints; i++) {
    let angle = (i / numPoints) * 2 * Math.PI;
    curvePoints.push(new THREE.Vector3().setFromSphericalCoords(1, Math.PI / 2, angle));
  }

  // Make the set of points above into a curve
  const curve = new THREE.CatmullRomCurve3(curvePoints, true);
  // Generate orthogonal unit vectors for each point on the curve
  const frenetFrames = curve.computeFrenetFrames(numPoints, true);
  const spacedPoints = curve.getSpacedPoints(numPoints);
  // An offset in the direction the curve is turning that we'll add to our spaced points
  let normalShift = new THREE.Vector3();
  bounds.forEach((bound) => {
    for (let i = 0; i <= numPoints; i++) {
      // Take the unit normal to each point scale it and add it to create the top and bottom of strip
      normalShift.copy(frenetFrames.normals[i]).multiplyScalar(bound);
      stripPoints.push(new THREE.Vector3().copy(spacedPoints[i]).add(normalShift));
    }
  });

  return stripPoints;
}

/**
 * Loads specified image path and creates a threejs Texture object
 * @param  {string} image
 * @returns THREE.Texture
 */
function createTexture(image: string): THREE.Texture {
  let texture = new THREE.TextureLoader().load(image);
  texture.wrapS = 1000;
  texture.wrapT = 1000;
  texture.repeat.set(1, 1);
  texture.offset.setX(0.5);
  return texture;
}

export { createStripPoints, createTexture };
