const dragables = document.querySelectorAll('.task');
const dropables = document.querySelectorAll('.swim-lane');

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