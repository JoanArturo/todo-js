(() => {
    const panel = document.getElementById('panel');
    const buttonNewTask = document.getElementById('btnNewTask');
    const buttonClose = document.getElementById('btnClosePanel');
    
    buttonNewTask.addEventListener('click', togglePanel);
    buttonClose.addEventListener('click', togglePanel);

    function togglePanel() {
        panel.classList.toggle('show');
    }
})();