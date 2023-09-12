export default class Toast {
    constructor(containerElementId, message) {
        const container = document.getElementById(containerElementId);
        let toast = this.createToastElement(message);
        container.appendChild(toast);
        this.animateToast(toast);
    }

    createToastElement(message) {
        let toastWrapper = document.createElement("div");
        toastWrapper.innerHTML = this.template(message).trim();
        return toastWrapper.children[0];
    }

    template(message = 'Toast message') {
        return `
            <div class="toast">
                ${ message }
            </div>
        `;
    }

    animateToast(toastElement) {
        setTimeout(() => {
            toastElement.animate({ opacity: 0 }, { duration: 1000, easing: 'ease-out'});
            setTimeout(() => toastElement.remove(), 900);
        }, 3000);
    }
}