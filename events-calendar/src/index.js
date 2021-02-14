// main data
const HOURS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const MEMBERS = ['Maria', 'Bob', 'Alex'];
let filteredList = [];

// create initial table body data
const tableBodyData = HOURS.map((hour) => {
  const row = new Array(DAYS.length + 1).fill(null);
  return row.map((column, i) => (i === 0 ? hour : ''));
});

const filterSelect = ['All members', ...MEMBERS];
const tableDataFull = [['Name', ...DAYS], tableBodyData];
const [tHead, tBody] = tableDataFull;

// HTML elements
const app = document.querySelector('.app');
const filterTable = document.querySelector('.filter');
const btnNewEvent = document.querySelector('.btn--new-event');
// modal
const modal = document.querySelector('.modal');
const modalAlert = document.querySelector('.modal__alert');
const modalDel = document.querySelector('.modal-delete-event');
const btnDel = document.querySelector('.btn--delete');
const btnCancelDel = document.querySelector('.btn--cancel-del');
// form new event
const formNewEvent = document.querySelector('.form--new-event');
const selectTime = document.querySelector('[name=time]');
const selectMember = document.querySelector('[name=members]');
const selectDay = document.querySelector('[name=day]');
const btnCancelEvent = document.querySelector('.btn--cancel-event');

// FUNCTIONS
function renderTable(data) {
  const shortTHead = tHead.map((name, i) => ((i === 0) ? name : name.slice(0, 3)));

  const columns = (tb, type) => tb.map((column, i) => {
    if (type === 'td' && column !== '' && i !== 0) {
      return `<${type} class="td--active">${column.eName}</${type}>`;
    }
    return `<${type}>${column}</${type}>`;
  }).join('');

  const rows = (tb) => tb.map((row) => `
    <tr>${columns(row, 'td')}</tr>
  `).join('');

  const showSTable = `
    <table>
      <thead>
        <tr>${columns(shortTHead, 'th')}</tr>
      </thead>
      <tbody>${rows(data)}</tbody>
    </table>
  `;

  app.querySelector('.app__body').innerHTML = showSTable;

  document.querySelector('tbody').addEventListener('click', ({ target }) => {
    if (target.closest('.td--active')) {
      const row = target.parentElement.rowIndex - 1;
      const column = target.cellIndex;

      modalDel.classList.add('modal--open');
      app.classList.add('app--blur');
      modalDel.querySelector('.modal-delete-event__title')
        .textContent = `A you sure want to delete "${target.textContent}" event?`;
      btnDel.addEventListener('click', () => {
        tBody[row][column] = '';
        modalDel.classList.remove('modal--open');
        app.classList.remove('app--blur');
        renderTable(tBody);
      });
    }
  });
}

function filterTableByName(tableData, filterName) {
  if (filterName !== 'All members') {
    const filterByName = (name, i) => {
      if (i === 0) return name;
      if (name.eMember === filterName) return name;
      return '';
    };

    filteredList = tableData.map((row) => row.map(filterByName));
    renderTable(filteredList);
  } else {
    renderTable(tableData);
  }
}

function selectOptions(elem, arr) {
  const options = arr.map((option, i) => `
    <option value="${i}">${option}</option>
  `).join('');
  elem.insertAdjacentHTML('beforeend', options);
}

function resetForm(formName) {
  formName.reset();
}

renderTable(tBody);
selectOptions(filterTable, filterSelect);
selectOptions(selectTime, HOURS);
selectOptions(selectMember, MEMBERS);
selectOptions(selectDay, DAYS);

// events listeners
filterTable.addEventListener('change', () => {
  const filteredMember = filterSelect[filterTable.value];
  filterTableByName(tBody, filteredMember);
});

btnNewEvent.addEventListener('click', (e) => {
  e.preventDefault();
  filterTable.value = 0;
  modal.classList.toggle('modal--open');
  app.classList.add('app--blur');
  renderTable(tBody);
});

formNewEvent.addEventListener('submit', (e) => {
  e.preventDefault();
  const eName = formNewEvent.eventName.value;
  const eTime = +formNewEvent.time.value;
  const eDay = +formNewEvent.day.value + 1;
  const eMember = +formNewEvent.members.value;

  if (tBody[eTime][eDay] !== '') {
    modalAlert.classList.add('modal__alert--open');
  }

  if (tBody[eTime][eDay] === '') {
    tBody[eTime][eDay] = {
      eName,
      eMember: MEMBERS[eMember],
    };

    modalAlert.classList.remove('modal__alert--open');
    modal.classList.toggle('modal--open');
    app.classList.remove('app--blur');
    resetForm(formNewEvent);
    renderTable(tBody);
  }
});

btnCancelEvent.addEventListener('click', (e) => {
  e.preventDefault();

  if (modalAlert.classList.contains('modal__alert--open')) {
    modalAlert.classList.remove('modal__alert--open');
  }

  app.classList.remove('app--blur');
  modal.classList.toggle('modal--open');
  resetForm(formNewEvent);
});

btnCancelDel.addEventListener('click', () => {
  modalDel.classList.remove('modal--open');
  app.classList.remove('app--blur');
});
