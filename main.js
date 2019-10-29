// Added clear button;
// Added a edit option;

// Added Clear List button;
// Added a Edit/Commit Option;
// Added Check/Uncheck Option;
// Added Delete Task Option;


const todoTasks = document.getElementById("todoTasks");
const submitBtn = document.querySelector("[type = submit]");
const clearBtn = document.querySelector("[type = button]");
const input_field = document.querySelector("#user_input");

submitBtn.addEventListener("click", insertElement);
clearBtn.addEventListener("click", clearList);

function insertElement() {
	const user_input = document.getElementById("user_input").value;

	if (user_input) {
		todoTasks.appendChild(setUpTask(user_input));
		document.getElementById("user_input").value = "";
	}
}

function clearList() {
	while (todoTasks.hasChildNodes()) {
		todoTasks.removeChild(todoTasks.firstChild);
	}
}

let counter = 0;

function setUpTask(userInput) {
	const listElement = document.createElement("li");
	const task = document.createElement("input");
	const editBtn = document.createElement("button");
	const deleteBtn = document.createElement("button");
	const checkBtn = document.createElement("input");
	const taskContainer = document.createElement("div");
	const buttonContainer = document.createElement("div");

	task.value = userInput;
	task.setAttribute("type", "text");
	task.setAttribute("disabled", "true");

	editBtn.textContent = "Edit";
	deleteBtn.textContent = "Detele";
	checkBtn.setAttribute("type", "checkbox");

	editBtn.addEventListener("click", editTask);
	deleteBtn.addEventListener("click", deleteTask);
	checkBtn.addEventListener("click", checkTask);

	buttonContainer.appendChild(editBtn);
	buttonContainer.appendChild(deleteBtn);
	buttonContainer.appendChild(checkBtn);

	buttonContainer.style.display = "inline";
	taskContainer.style.display = "inline";

	taskContainer.appendChild(task);
	taskContainer.appendChild(buttonContainer);

  // LIST ELEMENT

  listElement.setAttribute("id", `task${counter}`);
  listElement.addEventListener("drop", drop);
  listElement.addEventListener("dragover", allowDrop);
  listElement.addEventListener("dragstart", drag);
  counter ++;
	listElement.appendChild(taskContainer);
  listElement.setAttribute("draggable", true);

	return listElement;
}


// -------------------------


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
    console.log(ev.target.id);
}

function addListeners(el) {
  el.addEventListener("drop", drop);
  el.addEventListener("dragover", allowDrop);
  el.addEventListener("dragstart", drag);
}

function drop(ev) {

    ev.preventDefault();

    var thing = document.getElementById(ev.dataTransfer.getData("id"));

    var tgt = ev.currentTarget;

    if (thing && tgt) {
      var thingParent = thing.parentElement;
      var newTgt = tgt.cloneNode(true);
      addListeners(newTgt);
      thingParent.replaceChild(newTgt, thing)
      thingParent.replaceChild(thing, tgt);
    }

}


// ----------------------




function editTask() {
	const edited = this.parentElement.parentElement.querySelector(
		'[type = "text"]'
	);
	edited.disabled = !edited.disabled;
	if (edited.disabled) {
		this.textContent = "Edit";
	} else {
			this.textContent = "Done";
	}
}

function deleteTask() {
	this.parentElement.parentElement.parentElement.remove();
}

// DATE

function time() {
  const monthNames = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"];
  let a = new Date();
  return(`${monthNames[a.getMonth()]} ${a.getDate()} ${a.getFullYear()} ` +  
  `${a.getHours()}:${a.getMinutes()}`)
}

//

function checkTask() {
  let date = document.createElement("span")
  date.setAttribute("class", "span");
	if (!this.parentElement.parentElement.parentElement.className) {
		//let time = document.createElement("span");
    date.textContent = time(); 
		this.parentElement.parentElement.parentElement.className = "done";
	this.parentElement.parentElement.parentElement.appendChild(date);
	} else {
		this.parentElement.parentElement.parentElement.className = "";
    this.parentElement.parentElement.parentElement.querySelector(".span").remove()
	}
};


input_field.addEventListener("keyup", (event) => {

	// event.preventDefault();
  if (event.keyCode === 13) {
    insertElement();
  }

});
