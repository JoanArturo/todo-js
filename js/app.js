import DateHelper from "./helpers/date.helper.js";
import Task from "./class/task.js";
import Toast from "./toast.js";

const tasks = [
    new Task('Programación', 'Hacer ejercicios con JavaScript', new Date()),
    new Task('Leer Clean Code', 'Leer de la página 1 a la 10 del libro Clean Code de Robert C. Martin', new Date()),
    new Task('Proyecto web', 'Avanzar proyecto personal web de Laravel + Angular', new Date()),
    new Task('Despliegue de proyecto', 'Desplegar proyecto web en DigitalOcean', new Date(), true)
];

const appInit = () => {
    loadTasks();
    loadCompletedTasks();
    addEventToSaveTaskButton();
    detectEditTaskButtonClick();
    detectDeleteTaskButtonClick();
    detectCompletedTaskButtonClick();
}

const loadTasks = () => {
    let tasksElements = "";
    
    // Check if there are no tasks
    if (tasks.filter(task => task.isCompleted === false).length <= 0)
        tasksElements = getMessageEmptyTaskListHTML();
    
    tasks.forEach(task => {
        if (task.isCompleted == false)
            tasksElements += generateTaskHTML(task);
    });

    document.getElementById('taskContainer').innerHTML = tasksElements;
}

const generateTaskHTML = task => {
    let classes = task.isCompleted ? 'task task-completed' : 'task';
    let taskHTML = `
        <div class="${ classes }" id="task${ task.id }">
            <div class="task-options">
                <button class="task-options-btn">
                    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                </button>
                <div class="task-options-list">
                    <button class="task-options-item btn-edit-task" data-taskid="${ task.id }">Editar</button>
                    <button class="task-options-item text-danger btn-delete-task" data-taskid="${ task.id }">Borrar</button>
                </div>
            </div>
            <h4 class="task-title">${ task.title }</h4>
            <p class="task-description">${ task.description }</p>
            <p class="task-date">
                <ion-icon name="calendar-outline"></ion-icon>
                ${ DateHelper.formatDate(task.date) }
            </p>`;

    if (task.isCompleted == false) {
        taskHTML += `
            <button class="btn-complete" data-taskid="${ task.id }">
                Marcar como finalizado
                <ion-icon name="checkmark-done-outline"></ion-icon>
            </button>`;
    }

    taskHTML += `</div>`;

    return taskHTML;
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
        loadCompletedTasks();
        closePanel();
        //followElementById(`#task${task.id}`);
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
    changePanelTitle('Nueva Tarea');
}

const followElementById = elementId => {
    document.location.href = elementId;
}

const detectEditTaskButtonClick = () => {
    document.querySelectorAll('.task-container').forEach(container => {
        container.addEventListener('click', function(event) {
            let target = event.target;
    
            if (target.classList.contains('btn-edit-task'))
                editTask(target.dataset.taskid);
        });
    });
}

const editTask = taskId => {
    const task = tasks.find(task => task.id == taskId);
    showPanel('Editar Tarea');
    fillTaskForm(task);
}

const showPanel = panelTitle => {
    const panel = document.getElementById('panel');
    changePanelTitle(panelTitle);
    
    if (panel.classList.contains('show') == false)
        panel.classList.add('show');
}

const changePanelTitle = title => {
    document.querySelector('.panel-title').innerHTML = title;
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

const detectDeleteTaskButtonClick = () => {
    document.querySelectorAll('.task-container').forEach(container => {
        container.addEventListener('click', function(event) {
            let target = event.target;
    
            if (target.classList.contains('btn-delete-task'))
                deleteTask(target.dataset.taskid);
        });
    });
}

const deleteTask = taskId => {
    const taskIndex = tasks.findIndex(task => task.id == taskId);
    tasks.splice(taskIndex, 1);
    new Toast('toastContainer', 'Tarea eliminada');
    loadTasks();
    loadCompletedTasks();
}

const getMessageEmptyTaskListHTML = () => {
    return `
        <p class="task-empty">
            <ion-icon name="alert-circle-outline"></ion-icon>
            Lista de tareas vacía
        </p>
    `;
}

const loadCompletedTasks = () => {
    let tasksElements = "";

    // Check if there are no completed tasks
    if (tasks.filter(task => task.isCompleted === true).length <= 0)
        tasksElements = getMessageEmptyTaskListHTML();
    
    tasks.forEach(task => {
        if (task.isCompleted)
            tasksElements += generateTaskHTML(task);
    });

    document.getElementById('completedTasksContainer').innerHTML = tasksElements;
}

const detectCompletedTaskButtonClick = () => {
    document.querySelectorAll('.task-container').forEach(container => {
        container.addEventListener('click', function(event) {
            let target = event.target;
    
            if (target.classList.contains('btn-complete')) {
                markTaskAsCompleted(target.dataset.taskid);
                new Toast('toastContainer', 'Tarea completada :)');
                loadTasks();
                loadCompletedTasks();
            }
        });
    });
}

const markTaskAsCompleted = taskId => {
    tasks.find(task => {
        if (task.id == taskId) {
            task.isCompleted = true;
        }
    });
}

// Initialize app
document.body.onload = appInit;