const tabButtons = document.querySelectorAll('.tab-btn');
const editors = {
    html: document.getElementById('html-editor'),
    css: document.getElementById('css-editor'),
    js: document.getElementById('js-editor')
};

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        Object.values(editors).forEach(editor => {
            editor.style.display = 'none';
        });
        const tab = button.getAttribute('data-tab');
        editors[tab].style.display = 'block';
    });
});
const runButton = document.getElementById('run-btn');
const previewFrame = document.getElementById('preview');

runButton.addEventListener('click', updatePreview);
Object.values(editors).forEach(editor => {
    editor.addEventListener('input', updatePreview);
});
updatePreview();

function updatePreview() {
    const html = editors.html.value;
    const css = editors.css.value;
    const js = editors.js.value;
    
    const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    previewDoc.open();
    previewDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `);
    previewDoc.close();
}
let split = Split(['.editor-section', '.preview-section'], {
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [200, 200]
});
function handleResize() {
    if (window.innerWidth <= 768) {
        split.destroy();
        split = Split(['.editor-section', '.preview-section'], {
            direction: 'vertical',
            gutterSize: 5,
            cursor: 'row-resize',
            minSize: [200, 200]
        });
    } else {
        split.destroy();
        split = Split(['.editor-section', '.preview-section'], {
            gutterSize: 5,
            cursor: 'col-resize',
            minSize: [200, 200]
        });
    }
}

window.addEventListener('resize', handleResize);