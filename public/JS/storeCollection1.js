import { animateElementOnScroll } from "./storePageScrollAnimationsFunction.js";

export const handleStoreCollection1Anim = () => {
  animateElementOnScroll({
    selector: ".collection1",
    initialX: 60,
    initialY: 0,
    moveToX: -1200,
    moveToY: -1300,
    firstDuration: 1.5,
    secondDuration: 1,
    ease: "power3.inOut",
    startInvisible: false,
  });

  // Info1 remains invisible by default and is controlled only by redRingFollow
};
