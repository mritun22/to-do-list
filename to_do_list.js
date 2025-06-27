const inputTask = document.getElementById("input-task");

const addTaskBtn = document.querySelector(".add-task-btn");
addTaskBtn.addEventListener("click", addTask);

const tasks = [];

function addTask() {
	if (inputTask.value == "") {
		return;
	}

	const task = createTask();
	tasks.push(task);
	
	inputTask.value = "";
}

function createTask() {
	const task = document.createElement("article");
	task.id = `task-${new Date().getTime()}`;
	task.className = "task";

	const taskName = document.createElement("h4");
	taskName.className = "task-name";
	taskName.innerText = inputTask.value;

	const completeTaskBtn = document.createElement("button");
	completeTaskBtn.className = "complete-task-btn";
	completeTaskBtn.setAttribute("type", "button");

	const completeTaskIcon = document.createElement("i");
	completeTaskIcon.className = "fa-solid fa-check";

	completeTaskBtn.append(completeTaskIcon);
	
	task.append(taskName, completeTaskBtn);

	const pendingTasks = document.getElementById("pending-task-section");
	if (tasks.length == 0) {
		pendingTasks.removeChild(pendingTasks.querySelector("div"));
	}
	
	pendingTasks.insertBefore(task, pendingTasks.querySelector("h3").nextElementSibling);


	return task;
}


const pendingTasks = document.getElementById("pending-task-section");
pendingTasks.addEventListener("click", completeTask);

const doneTasks = [];

function completeTask(evt) {
	let task;

	if (evt.target.tagName == "I") {
		task = evt.target.parentElement.parentElement;
	}
	else if (evt.target.tagName == "BUTTON") {
		task = evt.target.parentElement;
	}
	else {
		return;
	}

	task = moveTask(task);

	tasks.splice(tasks.indexOf(task), 1);
	if (tasks.length == 0) {
		const div = document.createElement("div");
		div.innerText = "There are currently no tasks pending";
		pendingTasks.insertBefore(div, pendingTasks.querySelector("h3").nextElementSibling);
	}
	
	doneTasks.push(task);

	// console.log(tasks);
	// console.log(doneTasks);
}

function moveTask(task) {
	task = pendingTasks.removeChild(task);
	const completedTasks = document.getElementById("completed-task-section");

	if (doneTasks.length == 0) {
		completedTasks.removeChild(document.querySelector("div"));
	}

	task.classList.add("done-task");

	task.querySelector(".task-name").classList.add("done-task-name");

	const discardTaskBtn = task.querySelector("button");
	discardTaskBtn.classList.replace("complete-task-btn", "discard-task-btn");
	
	const discardTaskIcon = discardTaskBtn.querySelector("i");
	discardTaskIcon.classList.replace("fa-check", "fa-trash");

	completedTasks.insertBefore(task, completedTasks.querySelector("h3").nextElementSibling);

	return task;
}


const completedTasks = document.getElementById("completed-task-section");
completedTasks.addEventListener("click", deleteTask);

function deleteTask(evt) {
	let task;

	if (evt.target.tagName == "I") {
		task = evt.target.parentElement.parentElement;
	}
	else if(evt.target.tagName == "BUTTON") {
		task = evt.target.parentElement;
	}
	else {
		return;
	}

	completedTasks.removeChild(task);

	doneTasks.splice(doneTasks.indexOf(task), 1);
	if (doneTasks.length == 0) {
		const div = document.createElement("div");
		div.innerText = "There are currently no tasks completed";
		completedTasks.insertBefore(div, completedTasks.querySelector("h3").nextElementSibling);
	}
	
	// console.log(doneTasks);
}