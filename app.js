// Add interactivity so the user can manage daily tasks.

const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.add__btn');
const incompleteTask = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

// New task list item
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  listItem.className = 'task';
  label.innerText = taskString;
  label.className = 'task__label';

  checkBox.type = 'checkbox';
  checkBox.className = 'task__checkbox';
  editInput.type = 'text';
  editInput.className = 'task__input';

  editButton.innerText = 'Edit';
  editButton.className = 'task__edit btn';

  deleteButton.className = 'task__delete btn';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'task__delete-img';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
};
// Edit an existing task.
const editTask = function () {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.task__edit');
  const containsClass = listItem.classList.contains('task_edit');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('task_edit');
};

const deleteTask = function () {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
  // select ListItems children
  const checkBox = taskListItem.querySelector('.task__checkbox');
  const editButton = taskListItem.querySelector('.task__edit');
  const deleteButton = taskListItem.querySelector('.task__delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};
// Mark task completed
const taskCompleted = function () {
  console.log('Complete Task...');
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Mark task as incomplete.
// When the checkbox is unchecked
const taskIncomplete = function () {
  console.log('Incomplete Task...');
  const listItem = this.parentNode;
  incompleteTask.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const addTask = function () {
  console.log('Add Task...');
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTask.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

addButton.addEventListener('click', addTask);

for (let i = 0; i < incompleteTask.children.length; i++) {
  bindTaskEvents(incompleteTask.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
