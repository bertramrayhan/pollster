let notification = document.querySelector('.notification-container');
let notificationTitle = document.querySelector('.text-container__title');
let notificationMessage = document.querySelector('.text-container__message');
let notificationIcon = document.getElementById('notification-icon');

let isNotificationOpen = false;
let lastMessage = '';

export function showNotification(isSuccess = false, message){
    if(isNotificationOpen && lastMessage === message){
        return;
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
    
    notificationMessage.textContent = message;
    lastMessage = message;

    notification.classList.add(addedClass);
    notification.classList.add('show');
    isNotificationOpen = true;

    setTimeout(() => {
        notification.classList.remove('show');

        setTimeout(() => {
            notification.classList.remove(addedClass);
            isNotificationOpen = false;
        }, 400);
    }, 2000);
}