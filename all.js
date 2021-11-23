const addBtns = document.querySelector(".btn_add");
const inputVals = document.querySelector("#inputVal");
const todoLists = document.querySelector("#todoList");
//console.log(todoLists);
let toggleTab = "all";
let todoData = [];

//監聽新增功能
addBtns.addEventListener("click", addTodo);
function addTodo(e){
    let todo = {
        txt : inputVals.value,  
        id : new Date().getTime(),  
        checked : '',   
    }
    //console.log(todo.id);
    if(!todo.txt.trim()){ //檢查如果輸入空格or無輸入 不等於true則跳警告
        alert("請填入資料再送出!!");
        return;
    }else{
        e.preventDefault();
        todoData.unshift(todo); //新增一筆資料會顯示在前面
        inputVals.value = ""; //將欄位清空
    }
    renderData();
}

//刪除功能 & 切換checked狀態功能  
todoLists.addEventListener("click", deleteAndChecked);
function deleteAndChecked(e){
    let id = e.target.closest('li').dataset.id;
    //console.log(e.target.closest("li").dataset.id);
    if(e.target.nodeName === "A" && e.target.getAttribute("class") === "delete"){
        e.preventDefault();
        //todoData = todoData.filter((item) => item.id != id);
        let delNum = todoData.findIndex((item)=> item.id == id);
        todoData.splice(delNum, 1);
    }else{
        todoData.forEach((item, index)=>{
            if(item.id == id){
                if(todoData[index].checked === 'checked'){    
                    todoData[index].checked = '';   
                }else{
                    todoData[index].checked = 'checked';    
                }
            }
            //console.log(item, index);
        });
    }
    renderData();
}

//tab 切換樣式
const tabs = document.querySelector(".tab");
tabs.addEventListener("click", changeTab);
function changeTab(e){
    //console.log(e.target.dataset.tab);
    let tabStatus = document.querySelectorAll(".tab li");   
    tabStatus.forEach((item)=>{
        item.setAttribute("class", ""); 
    });
    e.target.setAttribute("class", "active");
    toggleTab = e.target.dataset.tab;
    renderData();
}   

//渲染資料
function renderData(){
    let str = "";
    todoData.forEach((item) => {
        str += `<li data-id="${item.id}">
                    <label class="checkbox" for="">
                        <input type="checkbox" ${item.checked}/>
                        <span>${item.txt}</span>
                    </label>
                    <a href="#" class="delete"></a>
                </li>`;
    });
    todoLists.innerHTML = str;
}

function updateList(){
    

}

