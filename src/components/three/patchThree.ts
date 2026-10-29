import * as THREE from "three";

/**
 * Monkey-patches THREE.WebGLCubeRenderTarget.prototype.dispose to prevent
 * Three.js r186 crash: "Cannot read properties of undefined (reading '0')"
 * which occurs when deallocateRenderTarget accesses unallocated framebuffers.
 */
if (typeof window !== "undefined" && THREE.WebGLCubeRenderTarget) {
  const proto = THREE.WebGLCubeRenderTarget.prototype as {
    dispose?: () => void;
    __safe_dispose__?: boolean;
  };
  const origDispose = proto.dispose;
  if (origDispose && !proto.__safe_dispose__) {
    proto.dispose = function (this: THREE.WebGLCubeRenderTarget) {
      try {
        origDispose.call(this);
      } catch {
        // Suppress Three.js r186 unallocated framebuffer deallocation error
      }
    };
    proto.__safe_dispose__ = true;
  }
}
