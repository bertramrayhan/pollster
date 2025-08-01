export async function putNotification(){
    const response = await fetch('notification.html');
    const html = await response.text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html.trim();
    const notificationTemplate = tempDiv.querySelector('template');
    const notificationClone = notificationTemplate.content.cloneNode(true);

    document.body.appendChild(notificationClone);
}

let lastNotificationTimeout = null;
let lastAddedClass = null;
let lastMessage = '';

export function showNotification(isSuccess = false, message){
    let notification = document.querySelector('.notification-container');
    let notificationTitle = document.querySelector('.text-container__title');
    let notificationMessage = document.querySelector('.text-container__message');
    let notificationIcon = document.getElementById('notification-icon');

    if(lastNotificationTimeout && lastMessage === message){
        return;
    }else if(lastNotificationTimeout && lastMessage !== message) {
        clearTimeout(lastNotificationTimeout);
        notification.classList.remove('show');
        notification.classList.remove(lastAddedClass);
    }

    let addedClass;

    if(isSuccess){
        addedClass = 'notification-container--success';
        notificationTitle.textContent = 'Sukses';
        notificationIcon.setAttribute('href', '#success');
    }else {
        addedClass = 'notification-container--error';
        notificationTitle.textContent = 'Error';
        notificationIcon.setAttribute('href', '#error');
    }
    lastAddedClass = addedClass;
    notificationMessage.textContent = message;
    lastMessage = message;

    notification.classList.add(addedClass);
    notification.classList.add('show');

    lastNotificationTimeout = setTimeout(() => {
        notification.classList.remove('show');

        setTimeout(() => {
            notification.classList.remove(addedClass);
            lastNotificationTimeout = null;
        }, 400);
    }, 2000);
}