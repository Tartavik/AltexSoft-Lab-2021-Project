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

document.addEventListener('DOMContentLoaded', () => {
  getUsersInfo('_start=40&_limit=50');
  addInputListener();
});

addUserBtn.addEventListener('click', () => {
  const arrFormUserInput = document.getElementsByClassName('form-user-input');
  formUser.classList.remove('is-hide');
  createUserBtn.classList.remove('is-hide');
  createUserBtn.setAttribute('disabled', 'disabled');
  createUserBtn.classList.add('is-translucent');
  for (let i = 0; i < arrFormUserInput.length; i++) {
    arrFormUserInput[i].addEventListener('blur', formCheck);
  }
});

createUserBtn.addEventListener('click', () => {
  createUser();
  formUser.classList.add('is-hide');
  createUserBtn.classList.add('is-hide');
  userCompany.value = '';
  userName.value = '';
  userAddress.value = '';
  userCity.value = '';
  userCountry.value = '';
});

function addInputListener() {
    for (let i = 0; i < inputFilter.length; i++) {
        inputFilter[i].addEventListener('keyup',e => {
          console.log(e.keyCode);
            if (e.keyCode >= 48&&e.keyCode <= 90||e.keyCode === 8) {
                let resultSort = '';
                if (companyInput.value !== '') {
                    resultSort += 'company_like=' + companyInput.value + '&&';
                }
                if (nameInput.value !== '') {
                    resultSort += 'name_like=' + nameInput.value + '&&';
                }
                if (addressInput.value !== '') {
                    resultSort += 'address_like=' + addressInput.value + '&&';
                }
                if (e.keyCode === 8&&companyInput.value === ''&&nameInput.value === ''&&addressInput.value === '') {
                  console.log(addressInput.value,);
                  getUsersInfo('_start=40&_limit=50');
                }else{
                  console.log('2');
                  getUsersInfo(resultSort);
                }
            }
        })
    }
}

allDelete.addEventListener('click', () => {
  deleteSelectedUsers();
});

function createUser() {
  let newUser = {
    company: userCompany.value,
    name: userName.value,
    address: userAddress.value,
    city: userCity.value,
    country: userCountry.value,
  };
  sendRequsest('POST', requestUrl, newUser)
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
  }
}

function getUsersInfo(arg) {
  sendRequsest('GET', requestUrl + '?' + arg)
    .then((data) => createTableUsers(data))
    .catch((err) => console.log(err));
}

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
});

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

    tableUser.appendChild(tr);
  }
}

function createTdElement(value, parent) {
  const td = document.createElement('td');
  td.innerText = value;
  parent.appendChild(td);
}

function createTdButtonElement(value, parent, style) {
  const button = document.createElement('button');
  const td = document.createElement('td');
  button.name = value;
  button.classList.add(style);
  td.appendChild(button);
  parent.appendChild(td);
  if (style === 'btn-edit') {
    button.addEventListener('click', showUserForm);
  } else {
    button.addEventListener('click', checkCheckbox);
  }
}

function checkCheckbox(el) {
  if (
    el.currentTarget.parentNode.parentNode.children[0].children[0].children[0]
      .checked
  ) {
    deleteUser(
      el.currentTarget.parentNode.parentNode.children[0].children[0].children[0]
    );
  } else {
    alert('The checkbox should be highlighted!');
  }
}

function deleteUser(el) {
  sendRequsest('DELETE', requestUrl + '/' + el.name)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  el.parentNode.parentNode.parentNode.remove();
}

function showUserForm(el) {
  formUser.classList.remove('is-hide');
  editUserBtn.classList.remove('is-hide');
  getEditObj(el.currentTarget.name);
}

function getEditObj(id) {
    console.log(id);
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
  let newUser = {
    id: userCompany.name,
    address: userAddress.value,
    city: userCity.value,
    company: userCompany.value,
    name: userName.value,
    country: userCountry.value,
  };
  sendRequsest('PUT', requestUrl + '/' + newUser.id, newUser)
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
    method: method,
    body: JSON.stringify(body),
    headers: headers,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return response.json().then((error) => {
      const e = new Error(error);
      throw e;
    });
  });
}