import { animateElementOnScroll } from './storePageScrollAnimationsFunction.js';

export const handleStoreInfo2Anim = () => {
  animateElementOnScroll({
    selector: '.info2',
    initialX: 1280,
    initialY: 900,
    moveToX: 50,
    moveToY: 420,
    firstDuration: 1.5,
    secondDuration: 1,
    startTrigger: "top top%",
    scrollMarkerId: "moveLeft2", // Different ID for debugging markers
    ease: "power3.inOut", 
  });
};
