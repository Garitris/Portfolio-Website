// Handles launch black screen fade
export const showBlackScreenAndFade = () => {
  return new Promise((resolve) => {
    const blackScreen = document.getElementById('blackScreen');

    setTimeout(() => {
      blackScreen.style.opacity = '0';        // fade out
      document.body.classList.add("loaded");  // reveal page

      setTimeout(() => {
        blackScreen.remove();
        resolve(); // launch animation finished
      }, 1500); // match fade duration
    }, 200);
  });
};
