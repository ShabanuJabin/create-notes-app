const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load existing notes from localStorage
function showNotes() {
    // Do not display existing notes initially
    // Instead, just leave it empty
    notesContainer.innerHTML = ''; // Ensure it's empty on load
}

// Update localStorage with the current notes
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Create a new note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    img.src = "https://cdn-icons-png.flaticon.com/512/1345/1345874.png";
    img.className = "delete-btn"; // Add a class for easy reference
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    // Focus on the new note
    inputBox.focus();

    // Update storage after adding a new note
    updateStorage();
});

// Handle click events for deleting notes
notesContainer.addEventListener("click", function (e) {
    // Check if an image was clicked to delete
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Handle keydown events for editable notes
notesContainer.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default action of Enter key (creating a new line)
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.deleteContents(); // Clear any selected text

        // Create a new line
        const newLine = document.createElement("br");
        range.insertNode(newLine);
        range.setStartAfter(newLine); // Move the cursor to the new line
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
    }
});

// Update storage when the content of notes changes
notesContainer.addEventListener("input", function () {
    updateStorage();
});

// Prevent displaying existing notes on page load
window.onload = function () {
    notesContainer.innerHTML = ''; // Ensure it's empty on load
};

showNotes();
