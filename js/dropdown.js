(() => {
    const taskOptionsButtons = document.querySelectorAll('.task-options-btn');
    const taskOptionsItems = document.querySelectorAll('.task-options-item');
    
    taskOptionsButtons.forEach(element => {
        element.addEventListener('click', toggleDropdown);
    });

    taskOptionsItems.forEach(element => {
        element.addEventListener('click', closeAllDropdowns);
    });

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