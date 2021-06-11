// 获取所有事件源
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup 事件会在键盘按键被松开时发生。
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; // 获取用户输入的值
  if(userEnteredValue.trim() != 0){ // 判断 
    addBtn.classList.add("active"); // 激活添加按钮
  }else{
    addBtn.classList.remove("active"); // 停用添加按钮
  }
}

showTasks(); // 调用 showTask 函数

addBtn.onclick = ()=>{ // 当用户点击加号图标按钮时
  let userEnteredValue = inputBox.value; // 获取输入字段值
  let getLocalStorageData = localStorage.getItem("New Todo"); // 获取本地存储
  if(getLocalStorageData == null){ // 判断：如果本地存储没有数据
    listArray = []; // 创建一个空数组
  }else{
    listArray = JSON.parse(getLocalStorageData);  // 将 json 字符串转换为 js 对象
  }
  listArray.push(userEnteredValue); // 在数组中推送或添加新值
  localStorage.setItem("New Todo", JSON.stringify(listArray)); // 将 js 对象转换为 json 字符串
  showTasks(); // 调用 showTask 函数
  addBtn.classList.remove("active"); // 添加任务后停用添加按钮
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; // 在待处理任务中传递数组长度
  if(listArray.length > 0){ // 判断：如果数组长度大于 0
    deleteAllBtn.classList.add("active"); // 激活删除按钮
  }else{
    deleteAllBtn.classList.remove("active"); // 停用删除按钮
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; // 在 ul 标签中添加新的 li 标签
  inputBox.value = ""; // 添加任务后，将输入字段留空
}

// 删除功能
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); // 删除或移除 li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); // 调用 showTasks 函数
}

// 删除所有  
deleteAllBtn.onclick = ()=>{
  listArray = []; // 清空数组
  localStorage.setItem("New Todo", JSON.stringify(listArray)); // 在本地存储中设置项目
  showTasks(); // 调用 showTasks 函数
}