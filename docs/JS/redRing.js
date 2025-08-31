// ========== RED RING FOLLOW WITH GSAP ========== 
import { gsap } from "https://cdn.skypack.dev/gsap"; 

let isFollowing = false;
let hasSnapped = false;

// Offsets for manual tweaking
let offsetX = 1100;
let offsetY = 20;

// Function to adjust offsets
export function adjustOffsets(newOffsetX, newOffsetY) {
  offsetX = newOffsetX;
  offsetY = newOffsetY;
  positionRing();
}

export function redRingFollow() {
    console.log("redRingFollow has been called."); 
  if (isFollowing) return;  
  isFollowing = true;

  const leader = document.querySelector('.collection1');
  const follower = document.querySelector('.red-ring'); 
  const info = document.querySelector('.info1');

  if (!leader || !follower || !info) { 
    console.warn("Leader, follower, or info1 not found. Exiting redRingFollow.");
    return; 
  }

  console.log("redRingFollow initiated.");

  // Apply initial ring position
  positionRing();

  // Hide info1 initially
  gsap.set(info, { opacity: 0 });

  // GSAP ticker for continuous updates
  gsap.ticker.add(() => {
    const leaderRect = leader.getBoundingClientRect();
    const followerRect = follower.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Adjust follower position
    const adjustedLeft = leaderRect.left + scrollX + offsetX; 
    const adjustedTop = leaderRect.top + scrollY + offsetY;

    follower.style.left = `${adjustedLeft}px`;  
    follower.style.top = `${adjustedTop}px`;

    // Determine `hasSnapped` based on overlap logic
    const isInside = (
      followerRect.left >= leaderRect.left &&
      followerRect.top >= leaderRect.top &&
      followerRect.right <= leaderRect.right &&
      followerRect.bottom <= leaderRect.bottom
    );

    if (isInside !== hasSnapped) {
      hasSnapped = isInside;
      handleInfoVisibility(hasSnapped, info);
    }
  });
}

// Handle visibility of info1
function handleInfoVisibility(visible, info) {
  gsap.to(info, {
    opacity: visible ? 1 : 0,
    duration: 0.5,
    ease: "power2.out",
  });
}

// Function to set the ring's initial position based on offsets
function positionRing() {
  const follower = document.querySelector('.red-ring');
  if (!follower) return;

  gsap.set(follower, {
    left: `${offsetX}px`,
    top: `${offsetY}px`,
  });

  console.log(`Ring positioned at offsetX: ${offsetX}, offsetY: ${offsetY}`);
}
