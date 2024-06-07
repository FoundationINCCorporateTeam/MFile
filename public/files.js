document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        displayMessage('No file selected', 'error');
        return;
    }
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    fetch('/api/upload', {
        method: 'POST',
        body: formData
    }).then(response => response.json()).then(data => {
        if (data.success) {
            displayMessage('File successfully uploaded', 'success');
            loadFiles();
        } else {
            displayMessage(data.message, 'error');
        }
    }).catch(error => {
        displayMessage('An error occurred', 'error');
        console.error(error);
    });
});

function displayMessage(message, type) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = `<p class="${type}">${message}</p>`;
}

function loadFiles() {
    fetch('/files')
        .then(response => response.json())
        .then(data => {
            const filesTable = document.getElementById('filesTable');
            filesTable.innerHTML = `
                <tr>
                    <th>Filename</th>
                    <th>Link</th>
                </tr>`;
            data.files.forEach(file => {
                filesTable.innerHTML += `
                    <tr>
                        <td>${file}</td>
                        <td><a href="/uploads/${file}" target="_blank">Download</a></td>
                    </tr>`;
            });
        });
}

window.onload = loadFiles;
