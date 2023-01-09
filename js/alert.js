export function bootstrapAlert(message, type) {
    var alert = document.createElement('div');
    alert.setAttribute('role', 'alert');
    alert.classList.add('alert', 'strong', 'alert-dismissible', 'show', 'alert-' + type, 'fade', 'fades', 'fade-in');
    alert.innerHTML = message;

    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-dismiss', 'alert');
    button.setAttribute('aria-label', 'Close');
    button.classList.add('btn-close');
    
    document.getElementById('alert-container').appendChild(alert).appendChild(button);
}