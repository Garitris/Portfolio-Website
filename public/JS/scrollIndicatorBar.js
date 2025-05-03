import { gsap } from "https://cdn.skypack.dev/gsap";

export const initializeScrollIndicator = () => {
    const dotTop = document.getElementById("dotTop");
    const dotBottom = document.getElementById("dotBottom");

    if (!dotTop || !dotBottom) {
        console.warn("Scroll indicator dots not found");
        return;
    }

    // Set initial positions
    const initialTop = { x: -8, y: 50 };
    const initialBottom = { x: 0, y: 50 };

    gsap.set(dotTop, { ...initialTop, scale: 1 });
    gsap.set(dotBottom, { ...initialBottom, scale: 1 });

    // Adjustable movement for Phase 1
    const moveAmountTop = 19;     // Move dotTop downward by this amount
    const moveAmountBottom = 19;  // Move dotBottom upward by this amount

    // Scroll Down Animation
    const activateScrollDown = () => {
        const tl = gsap.timeline();

        // Phase 1: move independently by specified amounts
        tl.to(dotTop, {
            y: initialTop.y + moveAmountTop,
            duration: 1.55,
            scale: 0.5,
            ease: "power3.inOut",
        }, 0);

        tl.to(dotBottom, {
            y: initialBottom.y - moveAmountBottom,
            duration: 1.55,
            scale: 2,
            ease: "power3.inOut",
        }, 0);

        // Phase 2: move to final positions and scale
        tl.to(dotTop, {
            y: initialTop.y - moveAmountTop +50,
           
            duration: 1,
            ease: "power3.inOut",
        }, ">");

        tl.to(dotBottom, {
            y: initialBottom.y + moveAmountBottom - 50,
            
            duration: 1,
            ease: "power3.inOut",
        }, "<");
    };

    // Scroll Up Animation
    const activateScrollUp = () => {
        const tl = gsap.timeline();

        // Phase 1: move to intermediate offset again
        tl.to(dotTop, {
            y: initialTop.y + moveAmountTop,
            duration: 1,
            scale: 2,
            ease: "power3.inOut",
        }, 0);

        tl.to(dotBottom, {
            y: initialBottom.y - moveAmountBottom,
            duration: 1,
            scale: 0.5,
            ease: "power3.inOut",
        }, 0);

        // Phase 2: return to initial positions
        tl.to(dotTop, {
            ...initialTop,
           
            duration: 1.55,
            ease: "power3.inOut",
        }, ">");

        tl.to(dotBottom, {
            ...initialBottom,
          
            duration: 1.55,
            ease: "power3.inOut",
        }, "<");
    };

    // Scroll Locking
    let isAnimating = false;
    let lastScrollY = window.scrollY;

    const lockScroll = () => {
        document.body.style.overflow = 'hidden';
        console.log("Scroll locked");
    };

    const unlockScroll = () => {
        document.body.style.overflow = '';
        console.log("Scroll unlocked");
    };

    const handleScroll = (event) => {
        const currentScrollY = window.scrollY;
        const deltaY = event.deltaY || (event.touches?.[0]?.clientY || 0);
        const isScrollingDown = currentScrollY > lastScrollY || deltaY > 0;

        if (isAnimating) {
            console.log("Animation in progress, scroll ignored");
            event.preventDefault();
            return;
        }

        isAnimating = true;
        lockScroll();

        if (isScrollingDown) {
            console.log("Triggering DOWN animation");
            activateScrollDown();
        } else {
            console.log("Triggering UP animation");
            activateScrollUp();
        }

        setTimeout(() => {
            isAnimating = false;
            unlockScroll();
        }, 2550);

        event.preventDefault();
        lastScrollY = currentScrollY;
    };

    document.addEventListener("wheel", handleScroll, { passive: false });
    document.addEventListener("touchstart", handleScroll, { passive: false });
    console.log("ScrollController initialized");

    dotTop.classList.add("active");
    dotBottom.classList.remove("active");
    console.log("Scroll indicator initial state set: top active");
};
