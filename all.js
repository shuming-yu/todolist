const addBtns = document.querySelector(".btn_add");
const inputVals = document.querySelector("#inputVal");
const todoLists = document.querySelector("#todoList");
const inputs = document.querySelector(".input");
//console.log(todoLists);

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
    //renderList();
    updateList();
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
    }
    else{
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
    //renderList();
    updateList();
}

let toggleTab = "all";  //預設選取 tab 為 all
//tab 切換樣式
const tabs = document.querySelector(".tab");
tabs.addEventListener("click", changeTab);
function changeTab(e){
    //console.log(e.target.dataset.tab);
    let tabStatus = document.querySelectorAll(".tab li");   
    tabStatus.forEach((item)=>{
        //item.setAttribute("class", "");
        item.classList.remove("active"); 
    });
    //e.target.setAttribute("class", "active");
    e.target.classList.add("active");

    toggleTab = e.target.dataset.tab;   //紀錄切換 data-tab
    //console.log(toggleTab);
    //renderList();
    updateList();
}   

//渲染資料
function renderList(){
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
    
    let newTodoData = [];
    
    if(toggleTab === "all"){    //狀態為 all 顯示全部
        newTodoData = todoData;
        //console.log(newTodoData); 
    }
    else if(toggleTab === "work"){  //狀態為 work 時篩選出 checked === "" 還沒打勾的
        newTodoData = todoData.filter((item) => item.checked === "");
        //console.log(newTodoData); 
    }
    else if(toggleTab === "done"){   //狀態為 done 時篩選出 checked === "checked" 被打勾的
        newTodoData = todoData.filter((item) => item.checked === "checked");
        //console.log(newTodoData); 
    }
    
    const totalNums = document.querySelector("#totalNum");
    let workNum = todoData.filter((item) => item.checked === "");   //將篩選還沒打勾的項目賦予到 workNum 上
    totalNums.textContent = workNum.length; //取出 workNum 的長度並輸出
    
    renderList(newTodoData);
}
updateList();


//清除已完成項目
const cleans = document.querySelector("#clean");
cleans.addEventListener('click',cleanDone);
function cleanDone(e) {
    e.preventDefault();
    todoData = todoData.filter((item) => item.checked === "");
    updateList();
}

//優化 - 按下鍵盤 Enter 執行事件
inputs.addEventListener("keyup", (e) =>{
    if(e.key === "Enter"){
        addTodo(e);
    }
})


