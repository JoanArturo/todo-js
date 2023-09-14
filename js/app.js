import DateHelper from "./helpers/date.helper.js";
import Task from "./class/task.js";
import Toast from "./toast.js";

const tasks = [
    new Task('Tarea de programación', 'Descripción de la tarea', new Date()),
    new Task('Leer Clean Code', 'Descripción de la tarea 2', new Date()),
    new Task('Tarea de redes', 'Descripción de la tarea 3', new Date())
];

const appInit = () => {
    loadTasks();
    addEventToSaveTaskButton();
    detectEditTaskButtonClick();
}

const loadTasks = () => {
    let tasksElements = "";
    tasks.forEach(task => {
        tasksElements += generateTaskHTML(task);
    });
    document.getElementById('taskContainer').innerHTML = tasksElements;
}

const generateTaskHTML = task => {
    return `
        <div class="task" id="task${ task.id }">
            <div class="task-options">
                <button class="task-options-btn">
                    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                </button>
                <div class="task-options-list">
                    <button class="task-options-item btn-edit-task" data-taskid="${ task.id }">Editar</button>
                    <button class="task-options-item text-danger">Borrar</button>
                </div>
            </div>
            <h4 class="task-title">${ task.title }</h4>
            <p class="task-description">${ task.description }</p>
            <p class="task-date">
                <ion-icon name="calendar-outline"></ion-icon>
                ${ DateHelper.formatDate(task.date) }
            </p>
            <button class="btn-complete">
                Marcar como finalizado
                <ion-icon name="checkmark-done-outline"></ion-icon>
            </button>
        </div>
    `;
}

const addEventToSaveTaskButton = () => {
    document.getElementById('btnSaveTask').addEventListener('click', saveTask);
}

const saveTask = event => {
    event.preventDefault();
    
    if (validTaskForm()) {
        const taskForm = document.forms.taskForm;
        const { title, description, date } = taskForm.elements;
        const panel = taskForm.closest('#panel');
        let task;

        // Update task
        if (panel.dataset.taskid) {
            const taskId = panel.dataset.taskid;
            task = updateTask(taskId, { title: title.value, description: description.value, date: date.value });
            new Toast('toastContainer', 'Cambios guardados!');
        }
        else
        {
            // Save new task
            task = new Task(title.value, description.value, new Date(date.value + "T00:00"));
            tasks.push(task);
            new Toast('toastContainer', 'Tarea guardada!');
        }
        
        clearTaskForm();
        loadTasks();
        closePanel();
        followElementById(`#task${task.id}`);
    }
}

const validTaskForm = () => {
    let isValid = true;
    const taskForm = document.forms.taskForm;
    const { title, description, date } = taskForm.elements;
    
    turnOffAllErrorMessages(taskForm);

    if (title.value == '') {
        title.classList.add('invalid');
        title.nextElementSibling.classList.add('invalid');
        isValid = false;
    }
    
    if (description.value == '') {
        description.classList.add('invalid');
        description.nextElementSibling.classList.add('invalid');
        isValid = false;
    }

    if (date.value == '') {
        date.classList.add('invalid');
        date.nextElementSibling.classList.add('invalid');
        isValid = false;
    }

    return isValid;
}

const turnOffAllErrorMessages = taskForm => {
    const { title, description, date } = taskForm.elements;

    title.classList.remove('invalid');
    description.classList.remove('invalid');
    date.classList.remove('invalid');

    title.nextElementSibling.classList.remove('invalid');
    description.nextElementSibling.classList.remove('invalid');
    date.nextElementSibling.classList.remove('invalid');
}

const clearTaskForm = () => {
    document.forms.taskForm.reset();
}

const closePanel = () => {
    const panel = document.getElementById('panel');
    panel.classList.remove('show');
    delete panel.dataset.taskid;
}

const followElementById = elementId => {
    document.location.href = elementId;
}

const detectEditTaskButtonClick = () => {
    document.getElementById('taskContainer').onclick = function(event) {
        let target = event.target;

        if (target.classList.contains('btn-edit-task'))
            editTask(target.dataset.taskid);
    };
}

const editTask = taskId => {
    const task = tasks.find(task => task.id == taskId);
    showPanel();
    fillTaskForm(task);
}

const showPanel = () => {
    const panel = document.getElementById('panel');
    
    if (panel.classList.contains('show') == false)
        panel.classList.add('show');
}

const fillTaskForm = task => {
    const taskForm = document.forms.taskForm;
    const { title, description, date } = taskForm.elements;
    const panel = taskForm.closest('#panel');

    title.value = task.title;
    description.value = task.description;
    date.value = DateHelper.formatDate(task.date, '-', true);

    panel.dataset.taskid = task.id;

    // Clear form when closing panel
    document.getElementById('btnClosePanel').onclick = () => {
        clearTaskForm();
        closePanel();
    };
}

const updateTask = (taskId, data) => {
    const taskIndex = tasks.findIndex(task => task.id == taskId);
    const task = tasks[taskIndex];
    task.title = data.title;
    task.description = data.description;
    task.date = new Date(data.date + "T00:00");
    tasks[taskIndex] = task;

    return task;
}

// Initialize app
document.body.onload = appInit;