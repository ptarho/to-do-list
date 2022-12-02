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