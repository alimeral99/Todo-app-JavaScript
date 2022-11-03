const form = document.querySelector("form");
const input = document.querySelector("#txt-taskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

//Load Items
loadItems();

//Call Event Listener
eventListeners();

function eventListeners() {
  //Submit Event
  form.addEventListener("submit", addNewİtem);
  //Delete Item
  taskList.addEventListener("click", deleteItem);
  //btnDeleteAllItem
  btnDeleteAll.addEventListener("click", btnDeleteAlls);
}

function loadItems() {
  items = getItemFromLs();
  items.forEach(function (item) {
    createItem(item);
  });
}

//Get Item From LS
function getItemFromLs() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

//Set Item to LS
function setItemLS(text) {
  items = getItemFromLs();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

// Delet Item to Ls
function deleteItemFromsLS(text) {
  items = getItemFromLs();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}

//Create Item
function createItem(text) {
  //Create li
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  //Create a
  const a = document.createElement("a");
  a.classList = "delete-item float-end";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  //ul add to a
  li.appendChild(a);

  //ul add to li
  taskList.appendChild(li);
}

//Add New İtem
function addNewİtem(e) {
  if (input.value === "") {
    alert("Add new item");
  }

  //Create Item

  createItem(input.value);

  // Save to LS

  setItemLS(input.value);

  //Clear İnput
  input.value = "";

  e.preventDefault();
}

//Delete İtem
function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    e.target.parentElement.parentElement.remove();

    //Delete Item From LS

    deleteItemFromsLS(e.target.parentElement.parentElement.textContent);
  }
  e.preventDefault;
}

//Btn Delete All
function btnDeleteAlls(e) {
  //  taskList.innerHTML = "";
  for (let i = 0; i < taskList.children.length; i++) {
    taskList.remove(i.length);
  }
  localStorage.clear();
  e.preventDefault();
}
