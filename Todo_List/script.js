const taskInput = document.querySelector('#taskInput');
const addTask = document.querySelector('#addTask');
const taskList = document.querySelector('#taskList');

addTask.addEventListener('click',function(){
    const addtaskInput = taskInput.value.trim();
    if(addtaskInput == ''){
        alert("Please fill");
    }
    else{
        const taskListEvent = document.createElement('li');
        // taskListEvent.textContent = addtaskInput;
        taskListEvent.innerHTML = `
            <span>${addtaskInput}</span>
            <button class="delete">Delete</button>
        `;
        

        console.log(taskListEvent)
        taskList.appendChild(taskListEvent);
        const deleteElement = taskListEvent.querySelector('button.delete');
        deleteElement.addEventListener('click',function(){
            taskListEvent.remove();
        });
        taskInput.value = '';
    }
})