import { initVanrollEditor } from '@ArnieYuan/vanroll_app';

window.addEventListener('load', () => {
    const root = document.getElementById('editor-root');
    if (root) {
        initVanrollEditor(root);
    } else {
        console.error("editor-root not found");
    }
});
