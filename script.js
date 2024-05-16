document.getElementById('fontSize').addEventListener('change', function() {
    document.getElementById('textArea').style.fontSize = this.value;
});

let saved = true;  // Flag to track if the current text is saved

document.getElementById('textArea').addEventListener('input', function() {
    saved = false;
});

function saveText(forceSave = false) {
    var text = document.getElementById('textArea').value;
    var filename = document.getElementById('fileName').value.trim();
    var extension = document.getElementById('fileExtension').value.trim();

    if (extension !== "" && extension.charAt(0) !== '.') {
        extension = "." + extension;
    }

    if (extension) {
        filename += extension;
    }

    if (!filename) {
        filename = "untitled";
    }

    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    saved = true;

    if (forceSave) {
        alert("File saved as " + filename);
    }
}

function saveProgress() {
    if (!saved) {
        saveText();
    } else {
        alert("All changes are already saved.");
    }
}

function openNewFile() {
    if (!saved) {
        var confirmSave = confirm("You didn't save your file. Would you like to save it?");
        if (confirmSave) {
            saveText(true);
        } else {
            createNewEditor();
        }
    } else {
        createNewEditor();
    }
}

function createNewEditor() {
    var newWindowContent = document.documentElement.innerHTML; // Get current HTML
    var newWindow = window.open();
    newWindow.document.write(newWindowContent);
    newWindow.document.close();
}

function loadFile(input) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('textArea').value = e.target.result;
    };
    reader.readAsText(file);
    document.getElementById('fileName').value = file.name.replace(/\..+$/, ''); // Remove extension from filename
    saved = true;
}
