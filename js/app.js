import DateHelper from "./helpers/date.helper.js";
import Task from "./class/task.js";

const tasks = [
    new Task('Tarea de programación', 'Descripción de la tarea', new Date()),
    new Task('Leer Clean Code', 'Descripción de la tarea 2', new Date()),
    new Task('Tarea de redes', 'Descripción de la tarea 3', new Date())
];

const appInit = () => {
    loadTasks();
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
        <div class="task">
            <div class="task-options">
                <button class="task-options-btn">
                    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                </button>
                <div class="task-options-list">
                    <button class="task-options-item">Editar</button>
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

// Initialize app
document.body.onload = appInit;