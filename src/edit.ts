import { initVanrollEditor } from '@ArnieYuan/vanroll_app/editor';

window.addEventListener('load', () => {
    const root = document.getElementById('editor-root');
    if (root) {
        initVanrollEditor(root);
    } else {
        console.error("editor-root not found");
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    }
});
