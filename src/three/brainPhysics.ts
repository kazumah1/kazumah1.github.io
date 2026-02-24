import {
  DAMPING,
  MAX_DISPLACEMENT,
  REPULSION_RADIUS,
  REPULSION_STRENGTH,
  SPRING_K
} from "./brainTuning";

export interface BrainPhysicsState {
  restPositions: Float32Array;
  currentPositions: Float32Array;
  velocities: Float32Array;
  pointCount: number;
  brainRadius: number;
}

export interface BrainPhysicsUpdateInput {
  dt: number;
  isActive: boolean;
  cursorPoint: { x: number; y: number; z: number } | null;
  springK?: number;
  damping?: number;
  repulsionRadius?: number;
  repulsionStrength?: number;
  maxDisplacement?: number;
}

const smoothstep = (x: number): number => {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
};

export const createBrainPhysicsState = (
  restPositions: Float32Array,
  brainRadius: number
): BrainPhysicsState => ({
  restPositions,
  currentPositions: new Float32Array(restPositions),
  velocities: new Float32Array(restPositions.length),
  pointCount: restPositions.length / 3,
  brainRadius
});

export const updateBrainPhysics = (
  state: BrainPhysicsState,
  input: BrainPhysicsUpdateInput
): void => {
  const dt = Math.min(input.dt, 1 / 30);
  const dampingBase = input.damping ?? DAMPING;
  const springK = input.springK ?? SPRING_K;
  const repulsionRadius = input.repulsionRadius ?? REPULSION_RADIUS;
  const repulsionStrength = input.repulsionStrength ?? REPULSION_STRENGTH;
  const maxDisplacement =
    (input.maxDisplacement ?? MAX_DISPLACEMENT) * state.brainRadius;

  const dampingFactor = Math.pow(dampingBase, dt * 60);
  const repulsionRadiusSq = repulsionRadius * repulsionRadius;
  const maxDisplacementSq = maxDisplacement * maxDisplacement;

  for (let i = 0; i < state.pointCount; i += 1) {
    const idx = i * 3;

    const restX = state.restPositions[idx];
    const restY = state.restPositions[idx + 1];
    const restZ = state.restPositions[idx + 2];

    let currentX = state.currentPositions[idx];
    let currentY = state.currentPositions[idx + 1];
    let currentZ = state.currentPositions[idx + 2];

    let velX = state.velocities[idx];
    let velY = state.velocities[idx + 1];
    let velZ = state.velocities[idx + 2];

    const springX = (restX - currentX) * springK;
    const springY = (restY - currentY) * springK;
    const springZ = (restZ - currentZ) * springK;

    let repulseX = 0;
    let repulseY = 0;
    let repulseZ = 0;

    if (input.isActive && input.cursorPoint) {
      const deltaX = currentX - input.cursorPoint.x;
      const deltaY = currentY - input.cursorPoint.y;
      const deltaZ = currentZ - input.cursorPoint.z;
      const distanceSq =
        deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ;

      if (distanceSq < repulsionRadiusSq) {
        const distance = Math.sqrt(distanceSq) + 1e-6;
        const normalized = 1 - distance / repulsionRadius;
        const falloff = smoothstep(normalized);
        const force = (repulsionStrength * falloff) / distance;

        repulseX = deltaX * force;
        repulseY = deltaY * force;
        repulseZ = deltaZ * force;
      }
    }

    velX = (velX + (springX + repulseX) * dt) * dampingFactor;
    velY = (velY + (springY + repulseY) * dt) * dampingFactor;
    velZ = (velZ + (springZ + repulseZ) * dt) * dampingFactor;

    currentX += velX * dt;
    currentY += velY * dt;
    currentZ += velZ * dt;

    const dispX = currentX - restX;
    const dispY = currentY - restY;
    const dispZ = currentZ - restZ;
    const displacementSq = dispX * dispX + dispY * dispY + dispZ * dispZ;

    if (displacementSq > maxDisplacementSq) {
      const scale = maxDisplacement / Math.sqrt(displacementSq);
      currentX = restX + dispX * scale;
      currentY = restY + dispY * scale;
      currentZ = restZ + dispZ * scale;

      velX *= 0.5;
      velY *= 0.5;
      velZ *= 0.5;
    }

    state.currentPositions[idx] = currentX;
    state.currentPositions[idx + 1] = currentY;
    state.currentPositions[idx + 2] = currentZ;

    state.velocities[idx] = velX;
    state.velocities[idx + 1] = velY;
    state.velocities[idx + 2] = velZ;
  }
};

export const syncCurrentToRest = (state: BrainPhysicsState): void => {
  state.currentPositions.set(state.restPositions);
  state.velocities.fill(0);
};
