//Importing variables from the data.js
import { BOOKS_PER_PAGE, authors, genres, books } from './data.js';

// create const for matches
const matches = books

// create let for pages -- as it changes further in the code
let page = 1;

// add curly brackets --- replace range with page
if (!books && !Array.isArray(books)) {throw new Error('Source required')} 
if (!page && page.length < 2) {throw new Error('Range must be an array with two numbers')}

// create const variable name for day and night
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const fragment = document.createDocumentFragment()
// create let variable for startIndex and endIndex 
let startIndex = 0;                                  
let endIndex = 36;                                
// conclude let variable to extracted   
const extracted = books.slice(startIndex, endIndex)

// for loop to view books - imported data from data.js
for (let i = 0; i < extracted.length; i++) {          
    const preview = document.createElement('dl')      
    preview.className = 'preview'                     

    preview.dataset.id = books[i].id
    preview.dataset.title = books[i].title
    preview.dataset.image = books[i].image
    preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
    preview.dataset.description = books[i].description
    preview.dataset.genre = books[i].genres

    preview.innerHTML=// --------------- HTML structure ---------------------------
    `<div>
     <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
     </div>
     <div class='preview__info'>
     <dt class='preview__title'>${books[i].title}<dt>
     <dt class='preview__author'> By ${authors[books[i].author]}</dt>
     </div>`

    fragment.appendChild(preview)
}
// display fragment in data-list-items
const book_list_1 = document.querySelector('[data-list-items]') 
book_list_1.appendChild(fragment)

// create search button with data stored in data-header-search = imported from data.js
const search_button = document.querySelector("[data-header-search]");
    search_button.addEventListener('click', () => {
    document.querySelector("[data-search-overlay]").style.display = "block";
})

// create cancel button with data stored in data-search-cancel = imported from data.js
const search_cancel = document.querySelector("[data-search-cancel]");
    search_cancel.addEventListener('click', () => {
    document.querySelector("[data-search-overlay]").style.display = "none";
})

// create settings button with data stored in data-header-settings = imported from data.js
const setting_button = document.querySelector("[data-header-settings]")
    setting_button.addEventListener('click', () => {
    document.querySelector("[data-settings-overlay]").style.display = "block";
})

// create cancel settings button with data stored in data-setting-cancel = imported from data.js
const setting_cancel = document.querySelector('[data-settings-cancel]')
    setting_cancel.addEventListener('click', () => {
    document.querySelector("[data-settings-overlay]").style.display = "none";
})

// create data setting theme with data stored in data-setting-theme = imported from data.js
const data_settings_theme = document.querySelector('[data-settings-theme]');

// create save button click function
const save_button = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary");
save_button.addEventListener('click', handleClick);
// data_search_genres.appendChild(genres)

// Theme event function - click handle function
function handleClick(event) {
/** 
 * The preventDefault() method of the Event interface tells the user agent that if the event 
 * does not get explicitly handled, its default action should not be taken as it normally would be.
 */
    event.preventDefault();
    // create variable assigning data from variable that was created data_settings_theme 
    const value = data_settings_theme.value;
    const body = document.querySelector('body');
    const overlay = document.querySelector("[data-settings-overlay]");
    
    // Type of themes colors in an object
    const themes = {
        day: {
            dark: '#000000',
            light: '#FFFFFF'
        },
        night: {
            dark: '#111111',
            light: '#CCCCCC'
        }
    };

    // if statement day
    if (value === 'day') {
        // set color included from the object above
        setThemeColors(body, themes.day.dark, themes.day.light);
        overlay.style.display = "none";
    }

    // if statement night
    if (value === 'night') {
        // set color included from the object above
        setThemeColors(body, themes.night.dark, themes.night.light);
        overlay.style.display = "none";
    }
}
// clickHandler set theme colors from root in css file
function setThemeColors(element, darkColor, lightColor) {
    element.style.setProperty('--color-dark', darkColor);
    element.style.setProperty('--color-light', lightColor);
}
// ------------------------------------------------------------------------------------------------------------------------------------//

// create variable to collect data from html to place them specifically 
const authorSelect = document.querySelector("[data-search-authors]");
const genreSelect = document.querySelector("[data-search-genres]");

/**
 * The Object.entries() static method returns an array of a given object's 
 * own enumerable string-keyed property key-value pairs.
 * 
 * Object.entries() returns an array whose elements are arrays corresponding 
 * to the enumerable string-keyed property key-value pairs found directly upon object.
 */

// Object.entries() is used to iterate over the authors and genre in an arrow function
Object.entries(authors).forEach(([authorId, authorName]) => {
    const optionElement = createOptionElement(authorId, authorName);
    authorSelect.appendChild(optionElement);
});

Object.entries(genres).forEach(([genreId, genreName]) => {
    const optionElement = createOptionElement(genreId, genreName);
    genreSelect.appendChild(optionElement);
});

// function with paramaters - creating an empty selector for user to direct what the user wants 
function createOptionElement(value, text) {
    // creating option in html
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = text;
    return optionElement;
}

// create event function for details to display
const detailsToggle = (event) => {  
    // create variable to call data-"key" in html
    const overlay1 = document.querySelector('[data-list-active]');
    const title = document.querySelector('[data-list-title]')
    const subtitle = document.querySelector('[data-list-subtitle]')
    const description = document.querySelector('[data-list-description]')
    const image1 = document.querySelector('[data-list-image]')
    const imageblur = document.querySelector('[data-list-blur]')
    // if statement to display the books id from data.js in the html
    event.books.id ? overlay1.style.display = "block" : undefined;
    event.books.description ? description.innerHTML = event.books.description : undefined;
    event.books.subtitle ? subtitle.innerHTML = event.books.subtitle : undefined;
    event.books.title ? title.innerHTML = event.books.title : undefined;
    event.books.image ? image1.setAttribute ('src', event.books.image) : undefined;
    event.books.image ? imageblur.setAttribute ('src', event.books.image) : undefined;
};
// click function to close details
const detailsClose = document.querySelector('[data-list-close]')    
    detailsClose.addEventListener('click', () => {
    document.querySelector("[data-list-active]").style.display = "none";
});

// add event lisnter to click on specific data-list
const bookclick = document.querySelector('[data-list-items]')
bookclick.addEventListener('click', detailsToggle)

// show more books - selecting button in html
const showMoreButton = document.querySelector('[data-list-button]')

// variable structure of books when clicking more
const numItemsToShow = Math.min(books.length - endIndex,)

// variable structure to display amount of books when clicking more
const showMoreButtonText = `Show More (${numItemsToShow})`

// .textContent placing variable in HTML 
showMoreButton.textContent = showMoreButtonText

// event lisener to click the more button and display more books 
showMoreButton.addEventListener('click', () => {         
    const fragment = document.createDocumentFragment()
    startIndex += 36;
    endIndex += 36;
    const startIndex1 = startIndex
    const endIndex1 = endIndex
    console.log(startIndex1)
    console.log(endIndex1)
    const extracted = books.slice(startIndex1, endIndex1)

    // for loop to contuninue displaying all books, images, title, id, description, plublished in object imported from data.js file
    for (const {author ,image, title, id , description, published} of extracted) {
        // preview creating an discription list in html and previewing all information stored
        const preview = document.createElement('dl')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        
        preview.innerHTML= // --------------- HTML structure ---------------------------
        `<div>
         <image class='preview__image' src="${image}" alt="book pic"}/>
         </div>
         <div class='preview__info'>
         <dt class='preview__title'>${title}<dt>
         <dt class='preview__author'> By ${authors[author]}</dt>
         </div>`
        // appendChild allowing preview variable to display in fragment
        fragment.appendChild(preview)
    }
    
    const booklist1 = document.querySelector('[data-list-items]') 
    booklist1.appendChild(fragment)
});