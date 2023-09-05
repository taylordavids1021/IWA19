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
// clickHandler 
function setThemeColors(element, darkColor, lightColor) {
    element.style.setProperty('--color-dark', darkColor);
    element.style.setProperty('--color-light', lightColor);
}
// authors = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element.innerText = 'All Authors'
// authors.appendChild(element)

// for ([id, name];Object.entries(authors); id++) {
//     document.createElement('option')
//     element.value = value
//     element = text
//     authors.appendChild(element)
// }

// data_search_authors.appendChild(authors)

// data_settings_theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// documentElement.style.setProperty(--color-dark, css[v].dark);
// documentElement.style.setProperty(--color-light, css[v].light);
// data_list_button = "Show more (books.length - BOOKS_PER_PAGE)"

// data_list_button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

// data_list_button.innerHTML = /* html */ [
//     '<span>Show more</span>',
//     '<span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>',
// ]

data_search_cancel.click() { data_search_overlay.open === false }
data_settings_cancel.click() { querySelect(data_settings_overlay).open === false }
data_settings_form.submit() { actions.settings.submit }
data_list_close.click() { data_list_active.open === false }

data_list_button.click() {
    document.querySelector([data_list_items]).appendChild(createPreviewsFragment(matches, [page x BOOKS_PER_PAGE], [{page + 1} x BOOKS_PER_PAGE]))
    actions.list.updateRemaining()
    page = page + 1
}

data_header_search.click() {
    data_search_overlay.open === true ;
    data_search_title.focus();
}

data_search_form.click(filters) {
    preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    result = []

    for (book; booksList; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {
            genreMatch = filters.genre = 'any'
            for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
        }

        if titleMatch && authorMatch && genreMatch => result.push(book)
    }

    if display.length < 1 
    data_list_message.class.add('list__message_show')
    else data_list_message.class.remove('list__message_show')
    

    data_list_items.innerHTML = ''
    const fragment = document.createDocumentFragment()
    const extracted = source.slice(range[0], range[1])

    for ({ author, image, title, id }; extracted; i++) {
        const { author: authorId, id, image, title } = props

        element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        fragment.appendChild(element)
    }
    
    data_list_items.appendChild(fragments)
    initial === matches.length - [page * BOOKS_PER_PAGE]
    remaining === hasRemaining ? initial : 0
    data_list_button.disabled = initial > 0

    data_list_button.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    data_search_overlay.open = false

data_settings_overlay.submit; {
    preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    data_settings_overlay.open === false
}

data_list_items.click() {
    pathArray = Array.from(event.path || event.composedPath())
    active;

    for (node; pathArray; i++) {
        if (active) break;
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === id) active = singleBook
        };
    };
    
    if (!active) return
    data_list_active.open === true
    data_list_blur + data_list_image === active.image
    data_list_title === active.title
    
    data_list_subtitle === '${authors[active.author]} (${Date(active.published).year})'
    data_list_description === active.description
}
