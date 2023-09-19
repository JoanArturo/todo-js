(() => {
    const taskContainers = document.querySelectorAll('.task-container');
    taskContainers.forEach(container => container.addEventListener('click', detectTarget));

    function detectTarget(event) {
        const target = event.target;
        if (target.classList.contains('task-options-btn')) {
            toggleDropdown(event);
        } else if (target.classList.contains('task-options-item')) {
            closeAllDropdowns();
        }
    }

    function toggleDropdown(event) {
        const parent = event.target.closest('.task');
        const list = parent.querySelector('.task-options-list');
        
        if (list.classList.contains('show') == false)
            closeAllDropdowns();

        list.classList.toggle('show');
    }

    function closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.task-options-list');
        dropdowns.forEach(element => element.classList.remove('show'));
    }
})();