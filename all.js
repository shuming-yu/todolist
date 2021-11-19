let data = [
/*     {
        content: "把冰箱發霉的檸檬拿去丟",
    }, */
];
const inputs = document.querySelector(".input");
const txts = document.querySelector(".txt");
const btn_adds = document.querySelector(".btn_add");
const lists = document.querySelector(".list");
//console.log(btn_adds);

function renderData(){
    //const lists = document.querySelector(".list");
    let str = "";
    data.forEach( (item, index) => {
        str += `<li>
                    <label class="checkbox" for="">
                    <input type="checkbox" ${item.checked}/>
                    <span>${item}</span>
                    </label>
                    <a href="#" data-num="${index}" class="delete"></a>
                </li>`;
    });
    lists.innerHTML = str;
}
//renderData();

//新增事項
btn_adds.addEventListener("click", (e) =>{

    if(txts.value == ""){
        alert("請輸入內容再送出!!");
        return;
    }
    let addObj = {};
    addObj.content = txts.value;
    data.push(addObj.content);
    renderData();
    txts.value = "";
})

lists.addEventListener("click", (e) =>{
    
    
})

