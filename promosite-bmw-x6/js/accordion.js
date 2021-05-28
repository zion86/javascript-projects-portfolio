const accordion = (
  button = '.feature__link',
  description = '.feature-sub',
  buttonActive = 'feature__link_active',
  descriptionHide = 'hidden',
) => {
  const buttonsElems = document.querySelectorAll(button);
  const descriptionElems = document.querySelectorAll(description);

  buttonsElems.forEach((btn, idx) => {
    btn.addEventListener('click', () => {

      // check click in active tab button
      if (btn.classList.contains(buttonActive)) {
        btn.classList.remove(buttonActive);
        descriptionElems[idx].classList.add(descriptionHide);
      } else {
        // close all tab buttons and descriptions
        buttonsElems.forEach((btn) => btn.classList.remove(buttonActive));
        descriptionElems.forEach((descr) => descr.classList.add(descriptionHide));

        // open tab button and description
        btn.classList.add(buttonActive);
        descriptionElems[idx].classList.remove(descriptionHide);
      }

    });
  });
};

export default accordion;