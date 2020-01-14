/**
 * Creates the placeholder image for the full size image.
 */
function createPlaceholder() {
    // TODO: Create a new image element
    const placeholderImg = document.createElement("img");
    // TODO: Set its attributes (src, alt, etc.)
    placeholderImg.src = "images/placeholder.jpg";
    placeholderImg.alt = "placeholderImg";
    placeholderImg.id = "placeholderImg";
    // TODO: Append it to the figure element
    // const figureElement = document.getElementById("image");
    document.getElementById("image").appendChild(placeholderImg);
}

/**
 * Prepares the JavaScript code that is to be executed when a thumbnail is clicked.
 */
function prepareLinks() {
    // TODO: Retrieve all the <a> elements within the unordered list
    const aElements = document.getElementById("thumbs").getElementsByTagName("a");
    const note = document.getElementById("notes");

    // TODO: Set an event listener for the click event on every <a> element (or advanced: think of a way to do it with one single handler)
    for (let i = 0; i < aElements.length; i++) {
        aElements[i].addEventListener("click", function (event) {
            event.preventDefault();
            for (let j = 0; j < aElements.length; j++) {
                aElements[j].classList.remove("active");
            }
            aElements[i].classList.add("active");
            document.getElementById("description").innerText = aElements[i].children[0].alt;
            document.getElementById("placeholderImg").src = aElements[i].href;

            const keysArray = document.getElementsByClassName("active");
            const key = keysArray[0].getAttribute("href");
            if (localStorage.getItem(key)) {
                note.textContent=localStorage.getItem(key);
            } else {
                note.textContent="Enter your notes here!";
            }
        });
    }


    // TODO: This function should do the following things:
    // - Remove the "active" CSS class from the element (link) that it's currently set to
    // - Set the clicked element (the link) the "active" CSS class without removing the "permanent" class.
    // - Replace the description in the <figcaption> with the text of the clicked image's alt attribute
    // - Show the corresponding image in the full size image container
    // - Check if there are locally stored notes for this image and show them if yes, show default text if no
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    const note = document.getElementById("notes");
    const keysArray = document.getElementsByClassName("active");
    const key = keysArray[0].getAttribute("href");
    // TODO: When the notes field loses focus, store the notes for the current image in local storage
    // TODO: If the notes field is empty, remove the local storage entry
    note.addEventListener("blur", function (event) {
    if (this.textContent === "") {
        window.localStorage.removeItem(key);
    } else {
        window.localStorage.setItem(key, this.textContent);
    }
});
}

/**
 * Gets the whole thing started.
 */
createPlaceholder();
prepareLinks();
storeNotes();
