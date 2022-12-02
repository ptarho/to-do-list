
class List{

    //Link array for our tasks list
    constructor(){
        this.arr = Storage.getFromStorage();
    }

    capitalize(text){
        return text[0].toUpperCase() + text.slice(1);
    }
    //Create new task in the list
    newTask(textField){
        //Check if text was given
        if (textField.value === ''){
            return false
        }
        //Check if task with the same text exists
        if (this.checkDuplicate(textField)) return;
        //Create new Task obj 
        let task = new Task(this.capitalize(textField.value), activeCategoryText);
        
        this.arr.push(task); //Save task in the array
        Storage.addToStorage(this.arr); //Refresh array in local storage
        textField.value = ''; //Refresh text field
        this.display(task); //Append new task into DOM
    }

    //Check if that task is already exists in array
    checkDuplicate(textField){
        if (this.arr.find(e => e.text.toLowerCase() == textField.value.toLowerCase())){
            alert('This task is already exists');
            return true;
        }
        else return false;
    }

    //Display task on the page
    display(task){
        let div = document.createElement('div'); 
        div.className = 'task';
        
        //Check if task was done to cross out it
        let textClass = '',
            checked = '';
        if (task.checked == true){
            textClass = 'task__text-completed';
            checked = 'checked';
        }

        div.innerHTML = `
                <label class="task__checkbox" >
                    <input type="checkbox" ${checked}>
                    <span onclick="list.check(this)"></span>
                </label>
                <p class="task__text ${textClass}">${task.text}</p>
                <div class="task__info">
                    <p class="task__category">${task.category}</p>  
                    <p class="task__time">${task.time}</p>
                </div>
                <div class="task__btn" onclick="list.delete(this)"><img class="task__btn-img"src="sources/trash.svg" alt="trash icon"></div>`
            
        document.querySelector('.list').appendChild(div); 
    }

    //Delete task from array and page
    delete(element){
        //array of all tasks divs from the page
        let taskDivs = Array.from(document.getElementsByClassName("task")); 
        //find index of element was clicked
        let index = taskDivs.findIndex((e) => e == element.parentNode);
        this.arr.splice(index, 1);
        Storage.addToStorage(this.arr);

        element.parentNode.remove();
    }

    //Cross out task text 
    check(element){
        //array of all tasks divs from the page
        let taskDivs = Array.from(document.getElementsByClassName("task")); 
        //find index of element was clicked
        let index = taskDivs.findIndex((e) => e == element.parentNode.parentNode);
        //Toggle checked attribute
        this.arr[index].checked = (this.arr[index].checked == true) ? false : true;
        //Refresh arr in local storage to save checked attribute
        Storage.addToStorage(this.arr);
        //Toggle class of tasks text element to apply styles
        let taskText = element.parentNode.parentNode.childNodes[3];
        taskText.classList.toggle('task__text-completed');
    }
}