const input = document.querySelector('.add-input input')
const add = document.querySelector('.add')
const check = document.querySelector('.check')
const remove = document.querySelector('.remove')
const ul = document.querySelector('.list')
var list = localStorage.getItem('taskList') ? JSON.parse(localStorage.getItem('taskList')) : []

document.querySelector('.add-input span').addEventListener('click', () => {
    input.focus()
})

render()

// For todays date;
Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

// create new task
function createTask(content){
    var currentTime = new Date();
    return{
        content: content,
        time: currentTime.today() + " , " + currentTime.timeNow(),
        check: false
    }
}

//submit by enter
input.addEventListener('keypress', e => {
    if(e.keyCode === 13 && input.value.trim()){
        list.push(createTask(input.value.trim()))
        input.value = null
        render()
    }
})

//submit by button
add.addEventListener('click', () => {
    if(input.value.trim()){
        list.push(createTask(input.value.trim()))
        input.value = null
        input.focus()
        render()
    }
})

//render list
function render(){
    var html = ""
    if(list.length != 0){
        html = '<button class="clear"">Remove All</button>'
        list.forEach((e,i) => {
            html += `<li class="item">
                    <div class="item-text">
                        <p class="item-content ${e.check ? 'done' : ''}">${e.content}</p>
                        <span class="item-time">${e.time}</span>
                    </div>
    
                    <div class="item-btn">
                        <button class="check ${e.check ? 'hidden' : ''}" onclick="checkTask(${i})">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button class="remove" onclick="removeTask(${i})">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </li>`
        });
        ul.innerHTML = html
        const clearbtn = document.querySelector('.clear')
        clearbtn.addEventListener('click', () =>{
            list.splice(0,list.length)
            render()
        })
    }else{
        ul.innerHTML = '<h3>Task list is empty</h3>'
    }
}

//remove 1 task
function removeTask(i){
    list.splice(i, 1);
    render()
}

//check 1 task
function checkTask(i){
    list[i].check = true;
    render()
}

//save data in localstorage when leave
window.addEventListener("beforeunload", () => {
    localStorage.setItem('taskList', JSON.stringify(list))
});
