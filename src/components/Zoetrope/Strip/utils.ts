import * as THREE from "three";

export function createPointsAlongSphere(numPoints: number = 5): THREE.Vector3[] {
  let points = [];
  let phi = Math.PI / 2;

  for (let i = 0; i < numPoints; i++) {
    let theta = (i / numPoints) * 2 * Math.PI;
    points.push(new THREE.Vector3().setFromSphericalCoords(1, phi, theta));
  }
  return points;
}

export function createCurveFromPoints(points: THREE.Vector3[]): THREE.CatmullRomCurve3 {
  const curve = new THREE.CatmullRomCurve3(points, true);
  return curve;
}

export function createStripGeometryPointsFromCurve(
  curve: THREE.CatmullRomCurve3,
  numFrames: number,
  scale: number
): THREE.Vector3[] {
  // Generate orthogonal unit vectors for the curve
  const frenetFrames = curve.computeFrenetFrames(numFrames);
  // Generate some evenly spaces points along the curve
  const spacedPoints = curve.getSpacedPoints(numFrames);
  const stripPoints: THREE.Vector3[] = [];
  const bounds = [-scale, scale];

  // Offset we add to every spaced point to generate two new points above it and below it
  // This is why we define bounds as we do
  let offset = new THREE.Vector3();
  bounds.forEach((bound) => {
    for (let i = 0; i <= numFrames; i++) {
      // Take the unit normal to each point scale it and add it to create points that will be the top and bottom of strip geometry
      offset.copy(frenetFrames.normals[i]).multiplyScalar(bound);
      stripPoints.push(new THREE.Vector3().copy(spacedPoints[i]).add(offset));
    }
  });

  return stripPoints;
}

/**
 * Generates the points for custom plane buffer geometry
 * @returns THREE.Vector3[]
 */
export function createStripPoints(
  numPoints: number = 200,
  numFrames: number = 200,
  offset: number = 0.35
): THREE.Vector3[] {
  // Define a custom buffer geometry for Zoetrope strip
  const curvePoints = createPointsAlongSphere(numPoints);
  const curve = createCurveFromPoints(curvePoints);
  const stripGeometryPoints = createStripGeometryPointsFromCurve(
    curve,
    numFrames,
    offset
  );
  return stripGeometryPoints;
}

/**
 * Loads specified image path and creates a threejs Texture object
 * @param  {string} image
 * @returns THREE.Texture
 */
export function createTexture(image: string): THREE.Texture {
  let texture = new THREE.TextureLoader().load(image);
  texture.wrapS = 1000;
  texture.wrapT = 1000;
  texture.repeat.set(1, 1);
  texture.offset.setX(0.5);
  return texture;
}
