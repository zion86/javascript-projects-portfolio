// v2
const smoothScroll = (event) => {
  const SPEED = 0.3;
  const target = event.target;

  if (target.matches('[href^="#"]:not([href="#"])')) {
    event.preventDefault();
    let start = 0;

    const pageYpossition = window.pageYOffset;
    const hash = target.getAttribute('href');
    const section = document.querySelector(hash);
    const coordinateYElem = section.getBoundingClientRect().top;

    if (hash === '#') return;

    const step = (timestamp) => {
      if (!start) start = timestamp;

      const progress = timestamp - start;

      const r = coordinateYElem < 0
        // scroll down
        ? Math.max(pageYpossition - progress / SPEED, pageYpossition + coordinateYElem)
        // scroll up
        : Math.min(pageYpossition + progress / SPEED, pageYpossition + coordinateYElem);

      window.scrollTo(0, r);

      if (r !== pageYpossition + coordinateYElem) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  }

};

document.body.addEventListener('click', smoothScroll);

export default smoothScroll;



// // v1
// const smoothScroll = (
//   link = 'a[href^="#"]:not(a[href="#"])',
// ) => {
//   // get all scroll links
//   const smoothScrollElems = document.querySelectorAll(link);

//   // add eventListener for each link
//   smoothScrollElems.forEach((link) => {
//     link.addEventListener('click', (event) => {
//       event.preventDefault();

//       // find all links by href ID
//       const id = link.getAttribute('href').substring(1);

//       // add smooth scroll to each link
//       document.getElementById(id).scrollIntoView({
//         behavior: 'smooth',
//       });
//     });
//   });
// };

// export default smoothScroll;