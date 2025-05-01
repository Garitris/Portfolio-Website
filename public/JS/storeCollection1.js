import { animateElementOnScroll } from './storePageScrollAnimationsFunction.js';

export const handleStoreCollection1Anim = () => {
  animateElementOnScroll({
    selector: '.collection1',
    initialX: 50,
    initialY: 0,
    moveToX: -1500,
    moveToY: 0,
    firstDuration: 1.55,
    secondDuration: 1,
    ease: "power3.inOut", 
  });
};
