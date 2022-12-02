//get element from DOM
const textField = document.querySelector(".task-creation__text");
const createTaskBtn = document.querySelector(".task-creation__btn");

//Create list obj to manipulate the page
let list = new List();
createTaskBtn.onclick = () => {list.newTask(textField)};

const tasks = Storage.getFromStorage(); //array to save all existin task objects
let activeCategory = document.querySelector(".categories__item-active"); //active category of tasks
let activeCategoryText = activeCategory.childNodes[1].innerHTML.trim();
let categories = Array.from(document.querySelectorAll(".categories__item")); //array of all categories

//Change active category and call filterCategory
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

window.addEventListener("DOMContentLoaded", () =>{
    //Append all existing tasks to the page
    tasks.forEach(e => list.display(e));
})