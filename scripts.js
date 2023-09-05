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

    preview.innerHTML=/*html*/ `
    <div>
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