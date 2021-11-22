const addBtns = document.querySelector(".btn_add");
const inputVals = document.querySelector("#inputVal");
const todoLists = document.querySelector("#todoList");
//console.log(todoLists);

let todoData = [];

//監聽新增功能
addBtns.addEventListener("click", addTodo);
function addTodo(){
    
    let todo = {
        txt : inputVals.value,
        id : new Date().getTime(),
        checked : '',
    }
    //console.log(todo.id);
    if(!todo.txt.trim()){
        alert("請填入資料再送出!!");
        return;
    }else{
        todoData.unshift(todo); //新增一筆資料會顯示在前面
        inputVals.value = ""; //將欄位清空
    }
    renderData(todoData);
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

}   

//刪除功能 & 切換checked狀態功能  
todoLists.addEventListener("click", deleteAndChecked);
function deleteAndChecked(e){
    e.preventDefault();
    let id = todoData.id;
    //let id = e.target.closest('li').dataset.id;
    //console.log(e);
    if(e.target.nodeName == "A" && e.target.getAttribute("class") == "delete"){
        todoData.splice(id, 1);
        //todoData = todoData.filter((i) => i.id != id);
    }else{
        /* todoData.forEach((item, index)=>{
            if(item.id == id){
                if(todoData[index].checked == 'checked'){
                    todoData[index].checked = '';
                }else{
                    todoData[index].checked = 'checked';
                }
            }
        }) */

    }
    renderData(todoData);
}



//渲染資料
function renderData(todo){

    let str = "";
    todo.forEach((item) => {
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


