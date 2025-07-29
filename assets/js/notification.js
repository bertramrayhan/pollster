let notification = document.querySelector('.notification-container');
let notificationTitle = document.querySelector('.text-container__title');
let notificationMessage = document.querySelector('.text-container__message');
let notificationIcon = document.getElementById('notification-icon');

export function showNotification(isSuccess = false, message){
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

    notification.classList.add(addedClass);
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');

        setTimeout(() => {
            notification.classList.remove(addedClass);
        }, 400);
    }, 2000);
}