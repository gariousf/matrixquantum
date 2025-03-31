// Matrix utility functions for quantum algorithms

/**
 * Represents a complex number
 */
export type Complex = {
  re: number;
  im: number;
}

/**
 * Adds two complex numbers
 */
export function addComplex(a: Complex, b: Complex): Complex {
  return {
    re: a.re + b.re,
    im: a.im + b.im
  };
}

/**
 * Multiplies two complex numbers
 */
export function multiplyComplex(a: Complex, b: Complex): Complex {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re
  };
}

/**
 * Divides complex number a by b
 */
export function divideComplex(a: Complex, b: Complex): Complex {
  const denominator = b.re * b.re + b.im * b.im;
  return {
    re: (a.re * b.re + a.im * b.im) / denominator,
    im: (a.im * b.re - a.re * b.im) / denominator
  };
}

/**
 * Evaluates a function f at a complex point z
 */
export function evaluateFunction(f: (z: Complex) => Complex, z: Complex): Complex {
  return f(z);
}

/**
 * Computes points on a circular contour
 */
export function circularContour(center: Complex, radius: number, numPoints: number): Complex[] {
  const points: Complex[] = [];
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    points.push({
      re: center.re + radius * Math.cos(angle),
      im: center.im + radius * Math.sin(angle)
    });
  }
  
  return points;
}

/**
 * Simulates the quantum algorithm for computing f(A)b using Cauchy's integral formula
 */
export function simulateCauchyIntegral(
  f: (z: Complex) => Complex,
  eigenvalues: Complex[],
  contourPoints: Complex[]
): string {
  // This is a simplified simulation for visualization purposes
  
  // Check if eigenvalues are inside the contour
  const allInside = eigenvalues.every(lambda => {
    const center = { re: 0, im: 0 }; // Assuming contour is centered at origin
    const radius = 1; // Assuming unit circle contour
    const distance = Math.sqrt(
      Math.pow(lambda.re - center.re, 2) + 
      Math.pow(lambda.im - center.im, 2)
    );
    return distance < radius;
  });
  
  if (!allInside) {
    return "Error: Not all eigenvalues are inside the contour";
  }
  
  // In a real implementation, we would:
  // 1. Compute (zI-A)^(-1)b for each contour point
  // 2. Multiply by f(z)
  // 3. Sum the results with appropriate weights
  
  return "1/√2(|f(λ₁)⟩ + |f(λ₂)⟩)";
} 