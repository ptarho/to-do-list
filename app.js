//get element from DOM
const textField = document.querySelector(".task-creation__text");
const createTaskBtn = document.querySelector(".task-creation__btn");

//Local storage class
class Storage{
    
    static addToStorage(tasksArr){
        let storage = localStorage.setItem('list', JSON.stringify(tasksArr));
        return storage;
    }

    static getFromStorage(){
        let storageArr = localStorage.getItem('list') === null ? [] : JSON.parse(localStorage.getItem('list'));
        return storageArr;
    }
}

const tasks = Storage.getFromStorage(); //array to save all existin task objects
let taskDivs; //array to work with "".task" divs
let activeCategory = document.querySelector(".categories__item-active"); //active category of tasks
let activeCategoryText = activeCategory.childNodes[1].innerHTML.trim();
let categories = Array.from(document.querySelectorAll(".categories__item")); //array of all categories

function createTask(){
    let newTask = new Task(capitalize(textField.value), activeCategoryText);

    //Check if this task already exists
    if (tasks.find(element => element.text.toLowerCase() == textField.value.toLowerCase())){
        alert('This task is already exists');
        return
    }

    tasks.push(newTask); //Push new task into tasks array
    appendTask(newTask.text, newTask.category, newTask.time); //Append task into the page
    Storage.addToStorage(tasks);//Add task to local storage array
    console.log(tasks);
    textField.value = ''; //Clean a text field
}

function capitalize(text){
   return text[0].toUpperCase() + text.slice(1);
}

//Delete task from array and page
function deleteTask(element){
    //array of all task divs
    taskDivs = document.getElementsByClassName("task__btn");
    taskDivsArray = Array.from(taskDivs)
    
    //find div that called this function
    let thisDiv = (e) => e == element;
    
    //find index of that div in array that will be the same at tasks array
    let index = taskDivsArray.findIndex(thisDiv);
    tasks.splice(index, 1);
    Storage.addToStorage(tasks);
    console.log(tasks);


    element.parentNode.remove();
}

//Cross out task text 
function toggleTaskClass(element){
    let taskText = element.parentNode.parentNode.childNodes[3];
    console.log(taskText);
    taskText.classList.toggle('task__text-completed');
    console.log('toggled');
}

//Change active categori and call filterCategory
function changeCategory(element){
    //check if this category is already chosen
    if (element.classList.contains("categories__item-active")) {return}
    
    //Delete old active category
    activeCategory.classList.remove("categories__item-active");

    //Save new active category
    element.classList.add("categories__item-active");
    activeCategory = element;
    activeCategoryText = activeCategory.childNodes[1].innerHTML.trim();

    filterCategory(activeCategoryText);
}

//Display tasks only with selected category
function filterCategory(category){
    //array of all task divs
    taskCategoryArray = Array.from(document.getElementsByClassName("task__category"));
    taskArray = Array.from(document.getElementsByClassName("task"));

    //If category == All -> display all tasks and exit function
    if( category == 'All'){
        taskArray.forEach((task) => {
            task.style.display = "";
        })
        return
    }
    //If selected any other category -> filter tasks
    taskCategoryArray.forEach((task, index) => {    
        if (task.innerHTML !== category){
            taskArray[index].style.display = "none";
        }
        else{
            taskArray[index].style.display = "";
        }
    })
}

categories.forEach( e => e.addEventListener( 'click', () => changeCategory(e)));

//Append task from local storage
function appendTask(text, category, time){

    let div = document.createElement('div'); 
    div.className = 'task';
    div.innerHTML = `
                <label class="task__checkbox" >
                    <input type="checkbox">
                    <span onclick="toggleTaskClass(this)"></span>
                </label>
                <p class="task__text">${text}</p>
                <div class="task__info">
                    <p class="task__category">${category}</p>  
                    <p class="task__time">${time}</p>
                </div>
                <div class="task__btn" onclick="deleteTask(this)"><img class="task__btn-img"src="sources/trash.svg" alt=""></div>`
            
    document.querySelector('.list').appendChild(div);
}

window.addEventListener("DOMContentLoaded", () =>{
    //Append all existing tasks to the page
    tasks.forEach(e => appendTask(e.text, e.category, e.time));
})