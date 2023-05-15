const clickable = document.getElementById("add-option");
clickable.addEventListener("click",ToggleModal);

var boxIndex = -1;
var singleTaskIndex = -1;


Todos=[];

// Todos is an Array that will store all Tasks.

renderItems();

function ToggleModal() {  
  console.log("here");
 
  const modal = document.getElementById("modal");
  console.log(modal.style.display);
  if (modal.style.display == "block") 
  {
    modal.style.display = "none";
  } 
  else 
  {
    modal.style.display = "block";
  }
  
  const taskInput = document.getElementById("task-Input");
  taskInput.value = "";
  taskInput.focus();
}

function ToggleSingleTaskModal() {

  const modal = document.getElementById("single-task-modal");
  modal.style.backgroundColor="cyan";
  // console.log(modal.style.display);
  const singleTaskContainer=document.getElementById("singleTaskCard");
  singleTaskContainer.innerHTML="";
  if (modal.style.display === "block") 
  {
    modal.style.display = "none";
  }
  else
   {
    modal.style.display = "block";
  }
      const container = document.getElementsByClassName("container")[0];
      container.style.display = "block";
      renderItems();
  // taskInput.focus();
}

function ToggleItemModal() {
  console.log("Item Modal CAlled");
  // Acess the Element with the ID as "modal"
  const modal = document.getElementById("item-modal");
  const itemInput2 = document.getElementById("item-input");
  itemInput2.value = "";
  // console.log(modal.style.display);
  if (modal.style.display === "block") 
  {
    modal.style.display = "none";
  } 
  else 
  {
    modal.style.display = "block";
  }
  itemInput2.focus();
}

function renderSingleItem(){
  const modal=document.getElementById("single-task-modal");
  const singleTaskContainer=document.getElementById("singleTaskCard");
  singleTaskContainer.innerHTML="";

  // singleTaskContainer.style.width="300px";
  singleTaskContainer.style.display="flex";
  singleTaskContainer.style.justifyContent="center";

  const singleTask=document.getElementsByClassName("taskCard")[singleTaskIndex];
  // const itemInput = document.getElementById("item-input");
  console.log(singleTask,"index : ",singleTaskIndex);
  singleTaskContainer.appendChild(singleTask);
}

function removeValueAtIndex(index) {
  console.log("Index to remove : ", index);
  // removes the value at 'index' from Todos
  const left = Todos.slice(0, index);
  console.log("Left : ", left);

  const right = Todos.slice(Number(index) + 1, Todos.length);
  console.log("Right : ", right);

  Todos = left.concat(right);
  console.log("Combined : ", Todos);
}

function addTask() {
  console.log("Add Task Called");
  const taskInput = document.getElementById("task-Input");
  const newObj = { name: taskInput.value, items: [] };
  Todos.push(newObj);
  renderItems();
  ToggleModal();

}

function addItem() {
  console.log("Add Item Called for Index : ", boxIndex);
  const itemInput = document.getElementById("item-input");
  console.log("Item input given : ", itemInput.value);
  const newItemObject = { name: itemInput.value, isCompleted: false };
  Todos[boxIndex].items.push(newItemObject);
  console.log("Item",Todos[boxIndex].items);
  renderItems();
  if(singleTaskIndex!=-1)
  {
    renderSingleItem();
  }
  ToggleItemModal();
}

// This Function displays all the data in the Todos Array
function renderItems() {
  console.log("tODOS : ", Todos);
  var index = 0;
  // Each time the RenderItems Function is called , it will empty the taskcontainer
  const taskContainer = document.getElementById("taskContainer");
  taskContainer.innerHTML = "";

  for (var i = 0; i <= Todos.length - 1; i++) {
    var value = Todos[i];
    const taskCard = document.createElement("div");
    taskCard.classList.add("taskCard");
    taskCard.id = index;
    index++;

    const taskTitle = document.createElement("h2");
    taskTitle.classList.add("taskTitle");
    taskCard.appendChild(taskTitle);

    taskTitle.addEventListener("click", ()=>{
      ToggleSingleTaskModal();
      const container = document.getElementsByClassName("container")[0];
      // container.style.display = "none";
      taskTitle.style.color="red";
      // singleTaskIndex = taskTitle.parentElement.id.innerText = Todos[singleTaskIndex].name;
      singleTaskIndex = taskTitle.parentElement.id;
      document.getElementById("single-task-name").innerText = Todos[singleTaskIndex].name;
      // document.getElementById("box").innerHTML = Todos[taskCard].name;
      console.log("index:", singleTaskIndex);
      renderSingleItem();
    });

    taskTitle.innerText = value.name;

    const Hrline = document.createElement("hr");
    Hrline.classList.add('myHrline');
    taskCard.appendChild(Hrline);
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");
    buttonContainer.style.display="flex";
    buttonContainer.style.justifyContent="end";
    buttonContainer.style.margin="10px";

    // add
    const addBtn = document.createElement("img");
    addBtn.style.width="40px";
    addBtn.style.height="40px";
    addBtn.src = "./add_box_FILL1_wght400_GRAD0_opsz48.svg";
    addBtn.classList.add("plus-icon");
    addBtn.addEventListener("click", () => {
      ToggleItemModal();
      boxIndex = addBtn.parentElement.parentElement.id;
    });

    // del
    const delBtn = document.createElement("img");
    delBtn.style.width="40px";
    delBtn.style.height="40px";
    delBtn.src = "./delete_FILL1_wght400_GRAD0_opsz48.svg";
    delBtn.classList.add("bin-icon");

    delBtn.addEventListener("click", () => {
      const delIndex = delBtn.parentElement.parentElement.id;
      removeValueAtIndex(delIndex);
      renderItems();
      const modal=document.getElementById("single-task-modal");
      modal.style.display="none";
    });

    buttonContainer.appendChild(delBtn);
    buttonContainer.appendChild(addBtn);

    const itemList = document.createElement("ul");
    itemList.style.listStyleType="none";
    itemList.style.flex = "1";
    itemList.style.lineHeight = "35px";

    value.items.map((item) => {

      const markbtn = document.createElement("p");
      markbtn.innerText = "Mark done";
      markbtn.style.display = "inline";
      markbtn.style.backgroundColor="blue";
      markbtn.style.color="white";
      markbtn.style.marginLeft="10px"
      markbtn.style.borderRadius="10px"
      markbtn.style.fontSize="13px"
      markbtn.classList.add("markBtn");

      const item1 = document.createElement("li");
      item1.innerText = item.name;

      item1.appendChild(markbtn);
      markbtn.addEventListener("click", () => {
        item.isCompleted = !item.isCompleted;
        renderItems();
        renderSingleItem()
      });
      if (item.isCompleted) {
        item1.style.textDecoration = "line-through";
        item1.style.color = "red";
        markbtn.style.display = "none";
      }
      itemList.appendChild(item1);

    });

    taskContainer.appendChild(taskCard);
    taskCard.appendChild(itemList);
    taskCard.appendChild(buttonContainer);
  }
}