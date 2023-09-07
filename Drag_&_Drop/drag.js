const dragables = document.querySelectorAll('.task');
const dropables = document.querySelectorAll('.swim-lane');

const inputText = document.querySelector('#todo-input');
const button = document.querySelector('#button')

button.addEventListener('click', () => {
    const textInput = inputText.value.trim(); // Use "value" to get the input value, not "ariaValueMax"

    if (textInput === '') {
        alert("Please enter a value.");
    } else {
        // Create a new task element and set its innerHTML
        const newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.innerHTML = `<span>${textInput}</span>`;

        // Append the new task to a swim-lane (you need to decide which swim-lane to append it to)
        // For now, I'm assuming you want to append it to the first swim-lane:
        const firstSwimLane = dropables[0];
        firstSwimLane.appendChild(newTask);

        console.log(textInput);

        // Clear the input field after adding a task
        inputText.value = '';
    }
});

dragables.forEach(dragable => {
    dragable.addEventListener('dragstart', () => {
        console.log('dragable')
        dragable.classList.add('is-dragging')
    });

    dragable.addEventListener('dragend', () => {
        console.log('end')
        dragable.classList.remove('is-dragging')
    })
});

dropables.forEach(dropable => {
    dropable.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElements = getDragAfterElements(dropable, e.clientY)
        console.log(afterElements)
        const dragable = document.querySelector('.is-dragging')

        if(afterElements == null){
            dropable.appendChild(dragable)
        }else{
            dropable.insertBefore(dragable,afterElements)
        }
        // dropable.appendChild(dragable);
    })
});

function getDragAfterElements(dropable, y) {
    const draggableElement = [...dropable.querySelectorAll('.task:not(.is-dragging)')];

    return draggableElement.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2;
        console.log(offset)
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}