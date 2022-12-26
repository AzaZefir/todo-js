//!функционал добавления, удаления, редактирования,смена состояния задач при клике на checkbox с использованием localStorage().

//! ищем нужные элементы в DOM т.е в HTML
const inputPanel = document.querySelector('#input-panel');
const addTaskBtn = document.querySelector('#add-task-btn');
const taskList = document.querySelector('.task-list');
const task = document.querySelector('.task');
const startMessage = document.querySelector('#start-message');

//!! слушатель событий, на событие "нажатие по клавише" при котором срабатывает функция добавление задачи - addTask()
inputPanel.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    addTask();
  }
});

let todos;

//! слушатель событий на событие 'load' при загрузке страницы, все данные хранящиеся в localStorage(),
//! будут отображаться при загрузке страницы, с помощбю функции которая создает задачи - createTask(). Если данных нет, то будет отображаться пустой массив
window.addEventListener('load', () => {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  addTaskBtn.addEventListener('submit', addTask); //! слушатель событий на событие клик по кнопке addTaskBtn
  createTask();
});

//! функция добавления задачи при клике на addTaskBtn.
function addTask(event) {
  console.log(event);
  event.preventDefault();
  const todoEl = {
    taskName: event.target.inputSubmit.value,
    done: false,
    createdAt: new Date(),
  };
  todos.push(todoEl);

  localStorage.setItem('todos', JSON.stringify(todos));

  if (inputPanel.value) {
    if (!startMessage.hidden) {
      startMessage.hidden = true;
    }
    // let newTask = createTask(inputPanel.value);
    // taskList.append(newTask);
    inputPanel.value = '';
    // console.log(newTask);
  } else {
    alert('Вы не указали задачу :(');
  }
  createTask();
}

//! функция которая создает задачи при клике на addTaskBtn. Вызывается в функции addTask().
//! forEach() метод позволяет к каждой задаче в localStorage() создать структуру HTML
function createTask(text) {
  taskList.innerHTML = '';

  todos.forEach((elem) => {
    const div = document.createElement('div');
    div.classList.add('task');

    const inputCh = document.createElement('input');
    inputCh.type = 'checkbox';
    inputCh.checked = elem.done;
    onCheckboxClick(inputCh, elem, div);

    const editInput = document.createElement('input');
    editInput.value = elem.taskName;
    editInput.setAttribute('readonly', true);
    editInput.style.cssText = `
            border:none;
            outline:none;
            background-color: azure;
            margin-left:10px;
  `;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'edit';
    editBtn.classList.add('btn');
    onEditBtn(editBtn, editInput, elem);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'delete';
    deleteBtn.classList.add('btn');
    onDeleteBtn(deleteBtn, elem);

    div.append(inputCh);
    div.append(editInput);
    div.append(editBtn);
    div.append(deleteBtn);
    taskList.append(div);
  });
}

//! функция вызывается при создании createTask() там же и вызывается. позволяет при нажатии на input type='checkbox'
//! менять состояние на true, false и меняет задний фон
function onCheckboxClick(inputCh, elem, div) {
  if (elem.done) {
    div.classList.add('completed');
  }
  inputCh.addEventListener('click', (event) => {
    elem.done = event.target.checked;
    console.log(event);
    localStorage.setItem('todos', JSON.stringify(todos));

    if (elem.done) {
      div.classList.add('completed');
    } else {
      div.classList.remove('completed');
    }
  });
}
//! функция которая вызывается при создании createTask() при нажатии на кнопку editBtn фокусируется на editInput и позволяет ее редактровать
function onEditBtn(editBtn, editInput, elem) {
  editBtn.addEventListener('click', () => {
    editInput.focus();
    editInput.removeAttribute('readonly');
    editInput.addEventListener('blur', (event) => {
      editInput.setAttribute('readonly', true);
      elem.taskName = event.target.value;
      localStorage.setItem('todos', JSON.stringify(todos));
    });
  });
}

//! функция удаления при нажатии на кнопку deleteBtn с помощью фильрации
function onDeleteBtn(deleteBtn, elem) {
  deleteBtn.addEventListener('click', () => {
    if (confirm('Вы действительно хотите удалить меня :(?')) {
      todos = todos.filter((el) => el != elem);
      localStorage.setItem('todos', JSON.stringify(todos));
      createTask();
    }
  });
}
