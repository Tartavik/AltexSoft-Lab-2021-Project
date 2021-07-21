const requestUrl = 'http://localhost:3000/users';
const mainCheckbox = document.getElementById('main-checkbox');
const userCompany = document.getElementById('user-company');
const userName = document.getElementById('user-name');
const userAddress = document.getElementById('user-address');
const userCity = document.getElementById('user-city');
const userCountry = document.getElementById('user-country');
const formUser = document.getElementsByClassName('form-user')[0];
const editUserBtn = document.getElementsByClassName('edit-user')[0];
const createUserBtn = document.getElementsByClassName('create-user')[0];
const addUserBtn = document.getElementsByClassName('add-user')[0];
const allDelete = document.getElementById('all-delete');
const arrUserCheckbox = document.getElementsByClassName('user-checkbox');
const companyInput = document.getElementById('company-input');
const nameInput = document.getElementById('name-input');
const addressInput = document.getElementById('address-input');
const inputFilter = document.getElementsByClassName('input-filter');
const titleNewUser = document.getElementById('title-new-user');
const titleEditUser = document.getElementById('title-edit-user');
const paginator = document.getElementById('paginator');
const paginations = document.getElementsByClassName('paginator-number');
const limitOfItems = 10;

document.addEventListener('DOMContentLoaded', () => {
  findArrLenghtUsers();
  addInputListener();
});

addUserBtn.addEventListener('click', () => {
  const arrFormUserInput = document.getElementsByClassName('form-user-input');
  formUser.classList.remove('is-hide');
  createUserBtn.classList.remove('is-hide');
  titleNewUser.classList.remove('is-hide');
  createUserBtn.setAttribute('disabled', 'disabled');
  createUserBtn.classList.add('is-translucent');
  for (let i = 0; i < arrFormUserInput.length; i++) {
    arrFormUserInput[i].addEventListener('keyup', formCheck);
  }
});

createUserBtn.addEventListener('click', () => {
  createUser();
  formUser.classList.add('is-hide');
  createUserBtn.classList.add('is-hide');
  titleNewUser.classList.add('is-hide');
  userCompany.value = '';
  userName.value = '';
  userAddress.value = '';
  userCity.value = '';
  userCountry.value = '';
});

allDelete.addEventListener('click', () => {
  deleteSelectedUsers();
});

mainCheckbox.addEventListener('click', () => {
  for (let i = 0; i < arrUserCheckbox.length; i++) {
    if (mainCheckbox.checked !== arrUserCheckbox[i].checked) {
      arrUserCheckbox[i].checked = !arrUserCheckbox[i].checked;
    }
  }
  allDelete.classList.toggle('is-hide');
});

editUserBtn.addEventListener('click', () => {
  editUser();
  userCompany.value = '';
  userName.value = '';
  userAddress.value = '';
  userCity.value = '';
  userCountry.value = '';
  formUser.classList.add('is-hide');
  editUserBtn.classList.add('is-hide');
  titleEditUser.classList.add('is-hide');
});

function findArrLenghtUsers() {
  sendRequsest('GET',requestUrl).then((data) => {
    createPaginator(data.length)
  })
  .catch((err) => console.log(err));
}

function createPaginator(length) {
  const quantityPagination = Math.ceil(length / limitOfItems);
  const startResult = quantityPagination * limitOfItems - 10;
  for (let i = 1; i <= quantityPagination; i++) {
    let button = document.createElement('button');
    button.innerText = i;
    button.name = i * limitOfItems;
    button.classList.add('paginator-number');
    paginator.appendChild(button);
    if (i === 1) {
      button.classList.add('active');
    }
    button.addEventListener('click',showPagination);
  }
  getUsersInfo(`_start=${startResult}&_limit=50`);
}

function showPagination() {
  const startResult = paginations.length * limitOfItems - this.name;
  getUsersInfo(`_start=${startResult}&_limit=50`);
  changeStylePagination(this);
}

function changeStylePagination(el) {
  const arrPaginations = document.getElementsByClassName('paginator-number');
  for (let i = 0; i < arrPaginations.length; i++) {
    arrPaginations[i].classList.remove('active');
  }
  el.classList.add('active');
}

function addInputListener() {
    for (let i = 0; i < inputFilter.length; i++) {
        inputFilter[i].addEventListener('keyup',e => {
            if (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 8) {
                let resultSort = '';
                const startResult = paginations.length * limitOfItems - document.querySelector('.active').name;
                if (companyInput.value !== '') {
                    resultSort += `company_like=${companyInput.value}&&`;
                }
                if (nameInput.value !== '') {
                    resultSort += `name_like=${nameInput.value}&&`;
                }
                if (addressInput.value !== '') {
                    resultSort += `address_like=${addressInput.value}&&`;
                }
                if (e.keyCode === 8 && companyInput.value === '' && nameInput.value === '' && addressInput.value === '') {
                  getUsersInfo(`_start=${startResult}&_limit=50`);
                } else {
                  getUsersInfo(resultSort);
                }
            }
        })
    }
}

function createUser() {
  sendRequsest('POST', requestUrl, 
  {
    company: userCompany.value,
    name: userName.value,
    address: userAddress.value,
    city: userCity.value,
    country: userCountry.value,
  })
    .then((data) => {
      createTableUsers([data],'dont-delete');
    })
    .catch((err) => console.log(err));
}

function formCheck() {
  if (
    userCompany.value !== '' &&
    userName.value !== '' &&
    userAddress.value !== '' &&
    userCity.value !== '' &&
    userCountry.value !== ''
  ) {
    createUserBtn.removeAttribute('disabled', 'disabled');
    createUserBtn.classList.remove('is-translucent');
  } else {
    createUserBtn.classList.add('is-translucent');
  }
}

function getUsersInfo(arg) {
  sendRequsest('GET', requestUrl + '?' + arg)
    .then((data) => createTableUsers(data))
    .catch((err) => console.log(err));
}

function createTableUsers(arr, check) {
  const tableUser = document.getElementsByClassName('table-user')[0];
  if (check !== 'dont-delete') {
    tableUser.innerHTML = '';
  }
  for (let i = 0; i < arr.length; i++) {
    const tr = document.createElement('tr');
    tr.id = arr[i].id;
    tr.classList.add('row');

    const tdCheckbox = document.createElement('td');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    const span = document.createElement('span');
    checkbox.classList.add('custom-input');
    checkbox.classList.add('user-checkbox');
    checkbox.name = arr[i].id;
    span.classList.add('custom-span');
    label.classList.add('custom-checkbox');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    label.appendChild(span);
    tdCheckbox.appendChild(label);
    tr.appendChild(tdCheckbox);

    createTdElement(arr[i].company, tr);
    createTdElement(arr[i].name, tr);
    createTdElement(arr[i].address, tr);
    createTdElement(arr[i].city, tr);
    createTdElement(arr[i].country, tr);
    createTdButtonElement(arr[i].id, tr, 'btn-edit');
    createTdButtonElement(arr[i].id, tr, 'btn-delete');

    tableUser.insertBefore(tr, tableUser.firstChild);
  }
}

function createTdElement(value, parent) {
  const td = document.createElement('td');
  td.innerText = value;
  parent.appendChild(td);
}

function createTdButtonElement(value, parent, editMode) {
  const button = document.createElement('button');
  const td = document.createElement('td');
  button.name = value;
  button.classList.add(editMode);
  td.appendChild(button);
  parent.appendChild(td);
  if (editMode === 'btn-edit') {
    button.addEventListener('click', showUserForm);
  } else {
    button.addEventListener('click', checkCheckbox);
  }
}

function checkCheckbox(el) {
  if (
    el.currentTarget.closest('tr').querySelector('.custom-input').checked
  ) {
    deleteUser( el.currentTarget.closest('tr').querySelector('.custom-input') );
  } else {
    alert('The checkbox should be highlighted!');
  }
}

function deleteUser(el) {
  sendRequsest('DELETE', requestUrl + '/' + el.name)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
    el.closest('tr').remove();
}

function showUserForm(el) {
  formUser.classList.remove('is-hide');
  editUserBtn.classList.remove('is-hide');
  titleEditUser.classList.remove('is-hide');
  getEditObj(el.currentTarget.name);
}

function getEditObj(id) {
  sendRequsest('GET', requestUrl + '/' + id)
    .then((data) => addValueToForm(data))
    .catch((err) => console.log(err));
}

function addValueToForm(obj) {
  userCompany.value = obj.company;
  userCompany.name = obj.id;
  userName.value = obj.name;
  userAddress.value = obj.address;
  userCity.value = obj.city;
  userCountry.value = obj.country;
}

function editUser() {
  sendRequsest('PUT', requestUrl + '/' + userCompany.name, 
  {
    id: userCompany.name,
    address: userAddress.value,
    city: userCity.value,
    company: userCompany.value,
    name: userName.value,
    country: userCountry.value,
  })
    .then((data) => renderEditUser(data))
    .catch((err) => console.log(err));
}

function deleteSelectedUsers() {
  let arrDeleteUsers = [];
  for (let i = 0; i < arrUserCheckbox.length; i++) {
    if (arrUserCheckbox[i].checked) {
      arrDeleteUsers.push(arrUserCheckbox[i]);
    }
  }
  for (let j = 0; j < arrDeleteUsers.length; j++) {
    deleteUser(arrDeleteUsers[j]);
  }
}

function renderEditUser(obj) {
  const el = document.getElementById(obj.id);
  el.children[1].innerText = obj.company;
  el.children[2].innerText = obj.name;
  el.children[3].innerText = obj.address;
  el.children[4].innerText = obj.city;
  el.children[5].innerText = obj.country;
}

function sendRequsest(method, url, body) {
  const headers = {
    'Content-Type': 'application/json',
  };
  return fetch(url, {
    method,
    body: JSON.stringify(body),
    headers,
  }).then((response) => {
      if (response.status === 200||response.status === 201) {
        return response.json();
      }
  }).catch((e) => {
    throw e;
  })
}