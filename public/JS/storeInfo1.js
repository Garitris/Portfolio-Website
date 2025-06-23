import { animateElementOnScroll } from './storePageScrollAnimationsFunction.js';

export const handleStoreInfo1Anim = () => {
  animateElementOnScroll({
    selector: '.info1',
    initialX: 1280,
    initialY: 0,
    moveToX: 50,
    moveToY: -1300,
    firstDuration: 1.5,
    secondDuration: 1,
    scrollMarkerId: "moveLeft2", // Different ID for debugging markers
    ease: "power3.inOut", 
    startInvisible: true,
  });
};
