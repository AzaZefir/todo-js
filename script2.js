//!функционал добавления, удаления, редактирования,смена состояния задач при клике на checkbox без сохранения в localStorage().

let addTaskInput = document.querySelector('#add-task-input');
let addTaskBtn = document.querySelector('#add-task-btn');
let taskList = document.querySelector('.task-list');
let startMessage = document.querySelector('#start-message');

addTaskBtn.addEventListener('click', addTask);

function createTask(text) {
  let div = document.createElement('div');
  div.classList.add('task');

  let input = document.createElement('input');
  input.addEventListener('click', changeTaskState);
  input.type = 'checkbox';

  let editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = addTaskInput.value;
  editInput.setAttribute('readonly', 'readonly');

  let editBtn = document.createElement('button');
  editBtn.textContent = 'edit';
  editBtn.addEventListener('click', editTask);
  function editTask() {
    if (editBtn.innerText.toLowerCase() == 'edit') {
      editInput.removeAttribute('readonly');
      editBtn.innerText = 'save';
      editInput.focus();
    } else {
      // console.log('save');
      editInput.setAttribute('readonly', true);
      editBtn.innerText = 'edit';
    }
  }
  let delBtn = document.createElement('button');
  delBtn.textContent = 'delete';
  delBtn.classList.add('delButton');
  delBtn.addEventListener('click', deleteTask);

  // let p = document.createElement('p');
  // p.textContent = text;

  div.append(input);
  // div.append(p);

  div.append(editInput);
  div.append(delBtn);
  div.append(editBtn);

  return div;
}

function changeTaskState() {
  if (this.checked) {
    this.parentElement.classList.add('completed');
  } else {
    this.parentElement.classList.remove('completed');
  }
}
function deleteTask() {
  if (confirm('vs deistvitelno hotite udalit zadachu')) {
    this.parentElement.remove();
  }
  // startMessage.hidden = false;
}

function addTask() {
  if (addTaskInput.value) {
    if (!startMessage.hidden) {
      startMessage.hidden = true;
    }
    let newTask = createTask(addTaskInput.value);
    taskList.append(newTask);
    addTaskInput.value = '';
    console.log(newTask);
  } else {
    alert('vvedite imya zadachi');
  }
}
