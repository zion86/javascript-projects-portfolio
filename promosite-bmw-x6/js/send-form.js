const server = 'https://jsonplaceholder.typicode.com/posts';

const sendData = (data, callBack, falseCallBack) => {
  const request = new XMLHttpRequest();
  request.open('POST', server);

  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return;
    if (request.status === 200 || request.status === 201) {
      const response = JSON.parse(request.responseText);
      callBack(response.id);
    } else {
      falseCallBack(request.status);
      throw new Error(request.statusText);
    }
  });

  request.send(data);
};


const formElems = document.querySelectorAll('.form');

const formHandler = (form) => {
  const smallElem = document.createElement('small');
  form.append(smallElem);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {};
    let flag = true;

    const btnSubmit = form.querySelector('.button[type="submit"]');

    for (const elem of form.elements) {
      const { name, value } = elem;

      if (name) {
        if (value.trim()) {
          elem.style.border = '';
          data[name] = value.trim();
        } else {
          elem.style.border = '1px solid red';
          elem.value = '';
          flag = false;
        }
      }
    }

    if (!flag) {
      return smallElem.textContent = 'Заполните все поля';
    }

    sendData(
      JSON.stringify(data),
      (data) => {
        smallElem.textContent = data;
        btnSubmit.disabled = true;

        setTimeout(() => {
          smallElem.textContent = '';
          btnSubmit.disabled = false;
        }, 5000);
      },
      (err) => smallElem.textContent = `Error: ${err}`,
    );

    form.reset();
  });
};

formElems.forEach(formHandler);