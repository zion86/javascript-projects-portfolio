export const disabledScroll = () => {
  // get scroll width
  const scrollWidth = window.innerWidth - document.body.offsetWidth;

  // save current pageY position in dataset attribute
  document.body.dataset.scrollY = window.scrollY;

  document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    left: 0;
    width: 100%;
    heigth: 100vh;
    overflow: hidden;
    padding-right: ${scrollWidth}px;
  `;
};

export const enabledScroll = () => {
  document.body.style.cssText = ``;
  window.scroll({
    top: document.body.dataset.scrollY,
  });
};