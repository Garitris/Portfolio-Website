import { animateElementOnScroll } from './storePageScrollAnimationsFunction.js';

export const handleStoreCollection2Anim = () => {
  animateElementOnScroll({
    selector: '.collection2',
    initialX: 2000,
    initialY: 0,
    moveToX: 680,
    moveToY: 0,
    firstDuration: 1.55,
    secondDuration: 1,
    scrollMarkerId: "moveLeft1", // Different ID for debugging markers
    ease: "power3.inOut", 
  });
};
