const todoform = document.querySelector("#todo-form");
const todoinput = document.querySelector("#todo");
const listgroup = document.querySelector(".list-group");
const secondCardBody = document.querySelectorAll(".card-body")[1];
const formControl = document.querySelectorAll(".form-control")[1];
const clearAllTodos = document.querySelector("#clear-todos");

eventlisteners();

function eventlisteners(){
    todoform.addEventListener("submit",addtodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",addFromStorageToUI);
    formControl.addEventListener("keyup",filterTodos);
    clearAllTodos.addEventListener("click",removeAllItems);

}
function removeAllItems(e){
    const listgroupitems = document.querySelectorAll(".list-group-item");
    if(e.target.className === "btn btn-dark"){
        listgroupitems.forEach(function(child){
            
                child.remove();
                deleteFromStorage(child.textContent.trim());
        });
    }
}


function filterTodos(e){
    const filtervalue = e.target.value.toLowerCase();
    const listgroupitem = document.querySelectorAll(".list-group-item");


    listgroupitem.forEach(function(item){
        const text = item.textContent.toLocaleLowerCase();
        if(text.indexOf(filtervalue) === -1){
            item.setAttribute("style","display : none !important");
        }
        else{
            item.setAttribute("style"," display : block ");
        }
    });
    

}

function addFromStorageToUI(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteFromStorage(e.target.parentElement.parentElement.textContent.trim()); 
        
        
        
        e.preventDefault();
    }
}

function deleteFromStorage(text){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === text){
            todos.splice(index,1);
        }
    })

    localStorage.setItem("array",JSON.stringify(todos));

}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addtodo(e){
    const inputvalue = todoinput.value.trim();
    
    addTodoToUI(inputvalue);
    addLocalStorage(inputvalue);

    inputvalue="";

    e.preventDefault();
}

function getTodosFromStorage(){
    let array;
    if(localStorage.getItem("array") === null){
        array = [];
    }
    else{
        array = JSON.parse(localStorage.getItem("array"));
        
    }
    
    return array;
}

function addLocalStorage(inputvalue){
    let todos = getTodosFromStorage();
    todos.push(inputvalue);
    
    localStorage.setItem("array",JSON.stringify(todos));
}

function addTodoToUI(inputvalue){
    
    const newtodo = document.createElement("li");
    const newchild = document.createElement("a");

    newtodo.className = "list-group-item d-flex justify-content-between ";
    newchild.href = "#";
    newchild.className = "delete-item";
    newchild.innerHTML = "<i class = 'fa fa-remove'></i> ";

    newtodo.appendChild(document.createTextNode(inputvalue));
    newtodo.appendChild(newchild);

    listgroup.appendChild(newtodo);

}