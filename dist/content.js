/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./Public/content.ts ***!
  \***************************/
let allAnnotations = [];
// Listener for messages from the background script
// Listener for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "REAPPLY_ANNOTATIONS") {
        const annotations = message.annotations;
        // Check if annotations are received
        if (annotations && annotations.length > 0) {
            allAnnotations = annotations;
            console.log(allAnnotations); // Check if annotations are stored correctly
            applyAnnotations(); // Call a function to apply annotations to the DOM
        }
        else {
            console.error("Received empty or invalid annotations.");
        }
    }
});
window.onload = () => {
    console.log("Window loaded");
    chrome.runtime.sendMessage({
        type: "REQUEST_ANNOTATIONS",
        url: window.location.href,
    });
    createToolbar();
    applyAnnotations(); // Call the function to apply annotations when the window loads
};
var color = "yellow";
let ishighlight = false;
let note = "";
let fontcolor = "white";
let fontstyle = "normal";
function createToolbar() {
    console.log("Creating toolbar");
    const toolbar = document.createElement("div");
    toolbar.id = "annotation-toolbar";
    toolbar.className =
        "annotation-toolbar flex flex-grow top-0 left-0 w-full bg-gray-800 text-white flex justify-around p-2 z-50";
    toolbar.style.setProperty("display", "flex", "important");
    toolbar.style.setProperty("position", "fixed", "important");
    toolbar.style.setProperty("top", "0", "important");
    toolbar.style.setProperty("left", "0", "important");
    toolbar.style.setProperty("width", "100%", "important");
    toolbar.style.setProperty("z-index", "10001", "important");
    toolbar.style.setProperty("background-color", "#4A5568", "important"); // Tailwind CSS color bg-gray-800
    toolbar.style.setProperty("color", "white", "important");
    toolbar.style.setProperty("justify-content", "space-around", "important");
    toolbar.style.setProperty("padding", "0.5rem", "important");
    toolbar.style.setProperty("box-sizing", "border-box", "important");
    const buttonStyle = `
    background-color: #4299E1; /* Tailwind CSS color bg-blue-500 */
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: white;
    font-size: 14px;
    margin: 0.5rem;
    border-radius: 0.25rem;
  `;
    const highlightButton = document.createElement("button");
    highlightButton.id = "highlight-button";
    highlightButton.textContent = "Highlight";
    highlightButton.style.cssText = buttonStyle;
    highlightButton.style.setProperty("color", "black", "important");
    highlightButton.addEventListener("click", () => {
        if (ishighlight) {
            note = "";
            highlightButton.textContent = "Highlight";
            handleHighlightClick(color);
        }
        else {
            highlightButton.textContent = "Stop Highlight";
            handleHighlightClick(color);
        }
    });
    const colorhighlight = document.createElement("button");
    colorhighlight.id = "color";
    colorhighlight.textContent = "Color";
    colorhighlight.style.cssText = buttonStyle;
    colorhighlight.style.setProperty("color", "black", "important");
    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = "#000000"; // Default color value
    colorInput.className = "hidden";
    colorInput.style.setProperty("display", "none", "important");
    colorhighlight.onclick = function () {
        colorInput.classList.toggle("hidden");
        colorInput.style.setProperty("display", colorInput.style.display === "none" ? "inline-block" : "none", "important");
    };
    colorInput.addEventListener("input", function (e) {
        const target = e.target;
        if (target) {
            color = target.value;
        }
    });
    const textboxButton = document.createElement("button");
    textboxButton.id = "note";
    textboxButton.textContent = "Add Note";
    textboxButton.style.cssText = buttonStyle.replace("#4299E1", "#48BB78"); // Tailwind CSS color bg-green-500
    textboxButton.style.setProperty("color", "black", "important");
    const textInputContainer = document.createElement("div");
    textInputContainer.className = "hidden mt-2";
    textInputContainer.style.setProperty("display", "none", "important");
    textInputContainer.style.setProperty("margin-top", "0.5rem", "important");
    const Fontcolorhighlight = document.createElement("button");
    Fontcolorhighlight.id = "font-color";
    Fontcolorhighlight.textContent = "Font-Color";
    Fontcolorhighlight.style.cssText = buttonStyle.replace("#4299E1", "#48BB78"); // Tailwind CSS color bg-green-500
    Fontcolorhighlight.style.setProperty("color", "black", "important");
    const FontcolorInput = document.createElement("input");
    FontcolorInput.type = "color";
    FontcolorInput.value = "#000000"; // Default color value
    FontcolorInput.className = "hidden";
    FontcolorInput.style.setProperty("display", "none", "important");
    Fontcolorhighlight.onclick = function () {
        FontcolorInput.classList.toggle("hidden");
        FontcolorInput.style.setProperty("display", FontcolorInput.style.display === "none" ? "inline-block" : "none", "important");
    };
    FontcolorInput.addEventListener("input", function (e) {
        const target = e.target;
        if (target) {
            fontcolor = target.value;
        }
    });
    const FontStyle = document.createElement("select");
    FontStyle.style.cssText = buttonStyle.replace("#4299E1", "#48BB78"); // Tailwind CSS color bg-green-500
    FontStyle.style.setProperty("color", "black", "important"); // Set select text color to black
    const FontstyleOption = document.createElement("option");
    FontstyleOption.textContent = "Font Style";
    const normalOption = document.createElement("option");
    normalOption.value = "normal";
    normalOption.textContent = "Normal";
    const obliqueOption = document.createElement("option");
    obliqueOption.value = "oblique";
    obliqueOption.textContent = "Oblique";
    const oblique40Option = document.createElement("option");
    oblique40Option.value = "oblique 40deg";
    oblique40Option.textContent = "Oblique 40deg";
    FontStyle.appendChild(FontstyleOption);
    FontStyle.appendChild(normalOption);
    FontStyle.appendChild(obliqueOption);
    FontStyle.appendChild(oblique40Option);
    FontStyle.addEventListener("change", (event) => {
        const firstChild = FontStyle.firstChild;
        if ((firstChild === null || firstChild === void 0 ? void 0 : firstChild.textContent) === "Font Style") {
            FontStyle.removeChild(firstChild);
        }
        const target = event.target;
        if (target) {
            fontstyle = target.value;
        }
    });
    const TextInput = document.createElement("input");
    TextInput.type = "text";
    TextInput.placeholder = "Enter your note here...";
    TextInput.className =
        "w-full p-2 border  border-gray-300 rounded box-border text-black";
    TextInput.style.setProperty("width", "100%", "important");
    TextInput.style.setProperty("padding", "0.5rem", "important");
    TextInput.style.setProperty("border", "1px solid #D1D5DB", "important"); // Tailwind CSS color border-gray-300
    TextInput.style.setProperty("border-radius", "0.25rem", "important");
    TextInput.style.setProperty("box-sizing", "border-box", "important");
    TextInput.style.setProperty("color", "black", "important");
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.className =
        "block w-full p-2 bg-green-600 text-white border-none rounded cursor-pointer mt-2";
    submitButton.style.cssText = buttonStyle.replace("#4299E1", "#38A169"); // Tailwind CSS color bg-green-600
    submitButton.style.setProperty("width", "100%", "important");
    submitButton.style.setProperty("margin-top", "0.5rem", "important");
    submitButton.onclick = () => {
        const note = TextInput.value.trim();
        if (note) {
            console.log("Note:", note);
            textInputContainer.classList.add("hidden");
            TextInput.value = "";
        }
    };
    textboxButton.onclick = function () {
        textInputContainer.classList.toggle("hidden");
        textInputContainer.style.setProperty("display", textInputContainer.style.display === "none" ? "block" : "none", "important");
    };
    TextInput.addEventListener("input", function (e) {
        const target = e.target;
        if (target) {
            note = target.value;
        }
    });
    textInputContainer.appendChild(TextInput);
    textInputContainer.appendChild(submitButton);
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.style.cssText = buttonStyle
        .replace("#4299E1", "#ECC94B")
        .replace("color: white;", "color: black;"); // Tailwind CSS color bg-yellow-400
    saveButton.onclick = () => {
        const toolbar = document.getElementById("annotation-toolbar");
        if (toolbar) {
            toolbar.style.display = "none";
        }
        window.print();
    };
    window.onafterprint = () => {
        const toolbar = document.getElementById("annotation-toolbar");
        if (toolbar) {
            toolbar.style.display = "flex";
        }
    };
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search Annotations";
    searchInput.className = "p-2 mr-2 text-black";
    searchInput.style.setProperty("padding", "0.5rem", "important");
    searchInput.style.setProperty("margin-right", "0.5rem", "important");
    searchInput.style.setProperty("color", "black", "important");
    const filterOptions = document.createElement("select");
    filterOptions.innerHTML = `
    <option value="Filter">Filter</option>
    <option value="text">Annotation Text</option>
    <option value="note">Note Text</option>
  `;
    filterOptions.className = "p-2 mr-2 text-black bg-white border border-gray-300 rounded";
    filterOptions.style.setProperty("padding", "0.5rem", "important");
    filterOptions.style.setProperty("margin-right", "0.5rem", "important");
    filterOptions.style.setProperty("color", "black", "important");
    filterOptions.addEventListener('click', () => {
        for (let i = 0; i < filterOptions.options.length; i++) {
            if (filterOptions.options[i].value === "Filter") {
                // Remove the option
                filterOptions.remove(i);
                break;
            }
        }
    });
    const SortOptions = document.createElement("select");
    SortOptions.innerHTML = `
    <option value="Sort">Sort</option>
    <option value="latest">Latest</option>
    <option value="oldest">Oldest</option>
    <option value="alphabetically">Alphabetically</option>
  `;
    SortOptions.className = "p-2 mr-2 text-black";
    SortOptions.style.setProperty("padding", "0.5rem", "important");
    SortOptions.style.setProperty("margin-right", "0.5rem", "important");
    SortOptions.style.setProperty("color", "black", "important");
    SortOptions.addEventListener('click', () => {
        for (let i = 0; i < SortOptions.options.length; i++) {
            if (SortOptions.options[i].value === "Sort") {
                // Remove the option
                SortOptions.remove(i);
                break;
            }
        }
    });
    const searchButton = document.createElement("button");
    searchButton.textContent = "Search";
    searchButton.style.cssText = buttonStyle
        .replace("#4299E1", "#4299E1")
        .replace("color: white;", "color: black;"); // Tailwind CSS color text-blue-500
    searchButton.style.setProperty("color", "black", "important");
    const searchResultContainer = document.createElement("div");
    searchResultContainer.id = "search-result-container";
    searchResultContainer.className =
        "mt-2 overflow-y-auto border border-gray-300 rounded shadow p-2 hidden";
    searchResultContainer.style.setProperty("margin-top", "0.5rem", "important");
    searchResultContainer.style.setProperty("max-height", "10rem", "important");
    searchResultContainer.style.setProperty("overflow-y", "auto", "important");
    searchResultContainer.style.setProperty("border", "1px solid #D1D5DB", "important"); // Tailwind CSS color border-gray-300
    searchResultContainer.style.setProperty("border-radius", "0.25rem", "important");
    searchResultContainer.style.setProperty("box-shadow", "0 0.5rem 1rem rgba(0, 0, 0, 0.1)", "important"); // Tailwind CSS shadow
    searchResultContainer.style.setProperty("padding", "0.5rem", "important");
    searchResultContainer.style.setProperty("background-color", "white", "important"); // White background
    searchResultContainer.style.setProperty("color", "black", "important"); // Black text
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.cssText = buttonStyle
        .replace("#4299E1", "#4299E1")
        .replace("color: white;", "color: black;"); // Tailwind CSS color text-blue-500
    closeButton.style.setProperty("color", "black", "important");
    // closeButton.className = 'absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700';
    searchResultContainer.style.display = "none";
    // Existing code...
    searchResultContainer.appendChild(closeButton);
    // Toggle visibility of the search result container when the search button is clicked
    searchButton.onclick = () => {
        const keyword = searchInput.value.trim();
        const filter = filterOptions.value;
        const sort = SortOptions.value;
        console.log(keyword);
        searchAndFilterAnnotations(keyword, filter, sort);
        // Toggle the visibility of the search result container
        searchResultContainer.style.display = "block";
    };
    closeButton.addEventListener('click', () => {
        searchResultContainer.style.display = "none";
    });
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "flex items-center";
    const notecontainer = document.createElement("div");
    notecontainer.className = "flex items-center";
    notecontainer.appendChild(textboxButton);
    notecontainer.appendChild(textInputContainer);
    notecontainer.appendChild(Fontcolorhighlight);
    notecontainer.appendChild(FontcolorInput);
    notecontainer.appendChild(FontStyle);
    buttonContainer.appendChild(highlightButton);
    buttonContainer.appendChild(colorhighlight);
    buttonContainer.appendChild(colorInput);
    // searchResultContainer.appendChild(closeButton);
    toolbar.appendChild(buttonContainer);
    toolbar.appendChild(notecontainer);
    toolbar.appendChild(saveButton);
    toolbar.appendChild(searchInput);
    toolbar.appendChild(filterOptions);
    toolbar.appendChild(SortOptions);
    toolbar.appendChild(searchButton);
    toolbar.appendChild(closeButton);
    toolbar.appendChild(searchResultContainer);
    // Add hover effect to buttons
    document.body.appendChild(toolbar);
}
const cardStyle = `
  background-color: white;
  color: black;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
`;
function searchAndFilterAnnotations(keyword, filter, sort) {
    let filteredAnnotations = allAnnotations;
    if (keyword) {
        const regex = new RegExp(keyword, "i"); // Regular expression with word boundary anchors
        console.log(regex);
        if (filter === "text") {
            filteredAnnotations = filteredAnnotations.filter((annotation) => regex.test(annotation.text));
        }
        else if (filter === "note") {
            filteredAnnotations = filteredAnnotations.filter((annotation) => typeof annotation.note_text === "string" &&
                regex.test(annotation.note_text));
        }
        // Sort the filtered annotations based on the specified sort option
        if (sort === "latest") {
            filteredAnnotations = sortAnnotationslatest(filteredAnnotations);
        }
        else if (sort === "oldest") {
            filteredAnnotations = sortAnnotationsoldest(filteredAnnotations);
        }
        else if (sort === "alphabetically") {
            filteredAnnotations = sortAnnotationsalphabetically(filteredAnnotations, "text");
        }
        // Display the filtered annotations
        const searchResultContainer = document.getElementById("search-result-container");
        if (searchResultContainer) {
            searchResultContainer.innerHTML = ""; // Clear previous search results
            if (filteredAnnotations.length === 0) {
                // Display a prompt if no search results are found
                const noResultsMessage = document.createElement("div");
                noResultsMessage.textContent = "No results found";
                noResultsMessage.style.cssText = `
          padding: 0.5rem;
          text-align: center;
          color: #666;
        `;
                searchResultContainer.appendChild(noResultsMessage);
            }
            else {
                filteredAnnotations.forEach((annotation) => {
                    const item = document.createElement("div");
                    item.classList.add("search-result-item");
                    item.textContent = annotation.text;
                    item.style.cssText = `
            padding: 0.5rem;
            cursor: pointer;
          `;
                    // Add click event listener to each search result item
                    item.addEventListener("click", () => {
                        // Handle click action for search result item
                        // For example, you can navigate to the annotation or perform any other action
                        console.log("Clicked on search result:", annotation.text);
                    });
                    // Append the search result item to the search results dropdown
                    searchResultContainer.appendChild(item);
                });
            }
            // Show the search results dropdown
            searchResultContainer.classList.remove("hidden");
        }
    }
}
function sortAnnotationslatest(annotations) {
    return annotations.sort((a, b) => {
        // Ensure time is defined and valid
        const timeA = a.time ? a.time.split(':').map(Number) : [0, 0, 0];
        const timeB = b.time ? b.time.split(':').map(Number) : [0, 0, 0];
        // Create Date objects
        const dateA = new Date(a.year, a.month - 1, a.day, ...timeA);
        const dateB = new Date(b.year, b.month - 1, b.day, ...timeB);
        return dateB.getTime() - dateA.getTime(); // Ascending order
    });
}
function sortAnnotationsoldest(annotations) {
    return annotations.sort((a, b) => {
        // Ensure time is defined and valid
        const timeA = a.time ? a.time.split(':').map(Number) : [0, 0, 0];
        const timeB = b.time ? b.time.split(':').map(Number) : [0, 0, 0];
        // Create Date objects
        const dateA = new Date(a.year, a.month - 1, a.day, ...timeA);
        const dateB = new Date(b.year, b.month - 1, b.day, ...timeB);
        return dateA.getTime() - dateB.getTime(); // Ascending order
    });
}
function sortAnnotationsalphabetically(annotations, property) {
    return annotations.sort((a, b) => {
        // Access the property for comparison
        const propertyA = a[property] ? a[property].toLowerCase().replace(/\s/g, '') : '';
        const propertyB = b[property] ? b[property].toLowerCase().replace(/\s/g, '') : '';
        // Compare the properties alphabetically
        if (propertyA < propertyB) {
            return -1;
        }
        if (propertyA > propertyB) {
            return 1;
        }
        // If properties are equal, compare by another property or return 0 for equal
        return 0;
    });
}
function handleHighlightClick(color) {
    ishighlight = !ishighlight; // Toggle the highlighting state
    if (ishighlight) {
        console.log("Selected color:", color);
        document.body.style.cursor = "text";
        document.addEventListener("mouseup", handleMouseUp);
    }
    else {
        // If highlighting is turned off, remove the event listener
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "auto";
    }
}
let notes = [{}];
function handleMouseUp() {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        const noteText = note;
        const fontColor = fontcolor; // Get the current font color
        const fontStyle = fontstyle;
        const noteData = {
            text: selectedText,
            note: noteText,
            fontColor: fontColor,
            fontstyle: fontStyle,
        };
        notes.push(noteData); // Add the note data to the array
        const span = document.createElement("span");
        span.style.backgroundColor = color; // Use the currently selected color
        span.textContent = selectedText;
        span.style.position = "relative";
        span.style.fontStyle = noteData.fontstyle;
        if (noteText !== null && noteText !== "") {
            span.setAttribute("data-note", noteText);
            const style = document.createElement("style");
            style.textContent = `
        #note-${notes.length - 1}::after {
          content: attr(data-note);
          position: absolute;
          white-space: nowrap;
          background-color: black;
          color: ${noteData.fontColor}; // Use the font color from the note data
          font-style:${noteData.fontstyle};
          padding: 5px;
          border-radius: 3px;
          opacity: 1; /* Set opacity to 1 by default */
          transition: opacity 0.3s;
          z-index: 1;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }
      `;
            span.id = `note-${notes.length - 1}`; // Assign a unique ID to the span
            document.body.appendChild(style);
            const d = new Date();
            const day = d.getDate();
            const month = d.getMonth() + 1; // Months are zero-based, so add 1
            const year = d.getFullYear();
            const hours = d.getHours();
            const minutes = d.getMinutes();
            const seconds = d.getSeconds();
            // Format the time as HH:MM:SS
            const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            chrome.runtime.sendMessage({
                type: "SAVE_ANNOTATION",
                annotation: {
                    text: selectedText,
                    color_highlight: color,
                    note_text: noteData.note,
                    note_font_style: noteData.fontstyle,
                    note_font_color: noteData.fontColor,
                    day: day,
                    month: month,
                    year: year,
                    time: time
                },
                url: window.location.href,
            });
        }
        else {
            // If no note is added, send the message without the note data
            const d = new Date();
            const day = d.getDate();
            const month = d.getMonth() + 1; // Months are zero-based, so add 1
            const year = d.getFullYear();
            const hours = d.getHours();
            const minutes = d.getMinutes();
            const seconds = d.getSeconds();
            // Format the time as HH:MM:SS
            const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            chrome.runtime.sendMessage({
                type: "SAVE_ANNOTATION",
                annotation: {
                    text: selectedText,
                    color_highlight: color,
                    day: day,
                    month: month,
                    year: year,
                    time: time
                },
                url: window.location.href,
            });
        }
        range.deleteContents();
        range.insertNode(span);
    }
}
// Function to apply annotations to the DOM
// Function to apply annotations to the DOM
function applyAnnotations() {
    allAnnotations.forEach(annotation => {
        // Find all occurrences of the annotated text in the DOM
        const elements = document.querySelectorAll(`[data-text="${annotation.text}"]`);
        elements.forEach(element => {
            if (element instanceof HTMLElement) {
                // Apply highlight style to the annotated text
                element.style.backgroundColor = annotation.color_highlight;
                // Create a note container
                const noteContainer = document.createElement('div');
                noteContainer.classList.add('annotation-note');
                // Add note text to the note container
                const noteText = document.createElement('p');
                noteText.textContent = annotation.note_text;
                noteContainer.appendChild(noteText);
                // Position the note container near the highlighted text
                const rect = element.getBoundingClientRect();
                noteContainer.style.position = 'absolute';
                noteContainer.style.top = `${rect.bottom}px`;
                noteContainer.style.left = `${rect.left}px`;
                // Add the note container to the document body
                document.body.appendChild(noteContainer);
            }
            else {
                console.error('Element is not an instance of HTMLElement');
            }
        });
    });
}
// Add event listener for keydown event
// Add event listener for keydown event
// Add event listener for keydown event
document.addEventListener("keydown", function (event) {
    // Check if Ctrl key, Shift key, and 'h' key are pressed
    if (event.ctrlKey && event.shiftKey && event.key === "H") {
        // Call the function to handle highlight click with default color
        const highlightButton = document.getElementById("highlight-button");
        const colorbutton = document.getElementById("color");
        if (colorbutton && highlightButton) {
            colorbutton.click();
            highlightButton.click();
        }
    }
    // Check if Ctrl key, Shift key, and 'p' key are pressed
    if (event.ctrlKey && event.shiftKey && event.key === "P") {
        // Show the note input container
        const note = document.getElementById("note");
        if (note) {
            note.click();
        }
    }
    // Check if Ctrl key, Shift key, and 's' key are pressed
});

/******/ })()
;
//# sourceMappingURL=content.js.map