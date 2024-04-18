const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {
    // store event
    window.deferredPrompt =  event;
    //removes hidden class from button
    butInstall.classList.toggle('hidden', false);
});


butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    // resets the deferredPrompt to null
    window.deferredPrompt = null;
    //adds hidden class
    butInstall.classList.toggle('hidden', true);
});


window.addEventListener('appinstalled', (event) => {
    //sets prompt to null
    window.deferredPrompt = null;
});
