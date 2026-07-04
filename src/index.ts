import { initVanroll } from '@ArnieYuan/vanroll_app';

window.addEventListener('load', () => {
    const root = document.getElementById('app-root');
    if (root) {
        initVanroll(root);
    } else {
        console.error("app-root not found");
    }
});
