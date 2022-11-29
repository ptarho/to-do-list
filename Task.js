
    class Task{
        constructor(text, category){
            this.text = text;
            this.category = category;
            const date = new Date(); 
            this.time = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        }
        show(){
            console.log(this);
        }
    }
