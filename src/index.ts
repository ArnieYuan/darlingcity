import { initVanroll } from '@ArnieYuan/vanroll_app';

window.addEventListener('load', () => {
    const root = document.getElementById('app-root');
    if (root) {
        initVanroll(root);
    } else {
        console.error("app-root not found");
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    }
});
