import { disabledScroll, enabledScroll } from './block-scroll.js';

const modal = (
  modal = '.modal',
  button = '.more',
  modalOverlay = '.overlay',
  modalCloseButton = '.modal__close',
  modalHidden = 'hidden',
  parentClass = '.design-block',
) => {

  // get modal and button
  const parentElem = document.querySelector(parentClass);
  const modalElem = document.querySelector(modal);

  // open modal fn()
  const openModal = () => {
    modalElem.classList.remove(modalHidden);
    disabledScroll();
  };

  // close modal fn()
  const closeModal = () => {
    modalElem.classList.add(modalHidden);
    enabledScroll();
  };

  // open modal window
  parentElem.addEventListener('click', (event) => {
    const target = event.target;

    if (target.matches(button)) {
      openModal();
    }
  });

  // close modal window eventListener
  modalElem.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest(modalOverlay) || target.closest(modalCloseButton)) {
      closeModal();
    }
  });
};

export default modal;