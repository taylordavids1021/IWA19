// ------------------------------------------- Importing variables from the data.js ----------------------------------------------------- //
import { BOOKS_PER_PAGE, authors, genres, books } from './data.js';

// ------------------------------------------- Retrieved elements from the DOM using query Selectors ------------------------------------ //
const settings_Button = document.querySelector('[data-header-settings]')
const settings_Overlay = document.querySelector('[data-settings-overlay]')
const settings_Form = document.querySelector('[data-settings-form]')
const settings_Theme = document.querySelector('[data-settings-theme]')
const settings_Cancel = document.querySelector('[data-settings-cancel]')

// ------------------------------------------- Day & Night Option ----------------------------------------------------------------------- //
// ------------------------------------------- Event listner allowing you to click option to show theme --------------------------------- //
settings_Button.addEventListener('click', () => {
    settings_Overlay.showModal()
})

// ------------------------------------------- Event listener to click cancel -----------------------------------=----------------------- //
settings_Cancel.addEventListener('click', () => { 
    settings_Overlay.close()
})

// ------------------------------------------- The css object defines two themes, 'day' and 'night' ------------------------------------- //
const css = {
    day : ['255, 255, 255', '10, 10, 20'],
    night: ['10, 10, 20', '255, 255, 255']
}

/**
 * The Window interface's matchMedia() method returns a new MediaQueryList object that can then be used to determine if the document
 * matches the media query string, as well as to monitor the document to detect when it matches (or stops matching) that media query.
 */

// --- The value of the settingsTheme input is determined based on whether the user's preferred color scheme is dark or not. ------------ //
settings_Theme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

// --- When the form is submitted, the selected object is created by converting the form data to an object using Object.fromEntries(). -- //
settings_Form.addEventListener('submit', (event) => { 
    event.preventDefault()
    const form_Submit = new FormData(event.target)
    const selected = Object.fromEntries(form_Submit)

/**
 * Depending on the theme selected, the --color-light and --color-dark CSS variables are updated with the corresponding light and dark 
 * color values from the css object -- root --- //
 */ 
if (selected.theme === 'night') {  
        document.documentElement.style.setProperty('--color-light', css[selected.theme][0])
        document.documentElement.style.setProperty('--color-dark', css[selected.theme][1])     
    } else if (selected.theme === 'day') {
        document.documentElement.style.setProperty('--color-light', css[selected.theme][0])
        document.documentElement.style.setProperty('--color-dark', css[selected.theme][1])
    }
    settings_Overlay.close()
})
// ------------------------------------------- End of color theme ----------------------------------------------------------------------- //

// ------------------------------------------- Create let for pages -- as it changes further in the code -------------------------------- //
let page = 1;

// add curly brackets --- replace range with page
if (!books && !Array.isArray(books)) {throw new Error('Source required')} 
if (!page && page.length < 2) {throw new Error('Page must be an array with two numbers')}

const fragment = document.createDocumentFragment()
// create let variable for startIndex and endIndex 
let start_Index = 0;                                  
let end_Index = 36;                                
// conclude let variable to extracted   
const extracted = books.slice(start_Index, end_Index)

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

    preview.innerHTML= // ------------------------------------------ HTML structure ------------------------------------------------- //
    `<div>
     <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
     </div>
     <div class='preview__info'>
     <dt class='preview__title'>${books[i].title}<dt>
     <dt class='preview__author'> By ${authors[books[i].author]}</dt>
     </div>`

    fragment.appendChild(preview)
}

// ------------------------------------------- Display fragment in data-list-items -------------------------------------------------- //
const book_list_1 = document.querySelector('[data-list-items]') 
book_list_1.appendChild(fragment)

// ------------------------------------------- Create search button with data stored in data-header-search = imported from data.js -- //
const search_button = document.querySelector("[data-header-search]");
    search_button.addEventListener('click', () => {
    document.querySelector("[data-search-overlay]").style.display = "block";
})

// ------------------------------------------- Create cancel button with data stored in data-search-cancel = imported from data.js -- //
const search_cancel = document.querySelector("[data-search-cancel]");
    search_cancel.addEventListener('click', () => {
    document.querySelector("[data-search-overlay]").style.display = "none";
})

// ------------------------------------------- Create settings button with data stored in data-header-settings = imported from data.js - //
const setting_button = document.querySelector("[data-header-settings]")
    setting_button.addEventListener('click', () => {
    document.querySelector("[data-settings-overlay]").style.display = "block";
})

// ------------------------------------------- Create cancel settings button with data stored in data-setting-cancel = imported from data.js - //
const setting_cancel = document.querySelector('[data-settings-cancel]')
    setting_cancel.addEventListener('click', () => {
    document.querySelector("[data-settings-overlay]").style.display = "none";
})

// ------------------------------------------- Create variable to collect data from html to place them specifically ------------------------- // 
const authorSelect = document.querySelector("[data-search-authors]");
const genreSelect = document.querySelector("[data-search-genres]");

/**
 * The Object.entries() static method returns an array of a given object's 
 * own enumerable string-keyed property key-value pairs.
 * 
 * Object.entries() returns an array whose elements are arrays corresponding 
 * to the enumerable string-keyed property key-value pairs found directly upon object.
 */

// ------------------------------------------- Object.entries() is used to iterate over the authors and genre in an arrow function ---------- //
Object.entries(authors).forEach(([authorId, authorName]) => {
    const optionElement = createOptionElement(authorId, authorName);
    authorSelect.appendChild(optionElement);
});

Object.entries(genres).forEach(([genreId, genreName]) => {
    const optionElement = createOptionElement(genreId, genreName);
    genreSelect.appendChild(optionElement);
});

// ------------------------------------------- Function with paramaters - creating an empty selector for user to direct what the user wants - // 
function createOptionElement(value, text) {
    // creating option in html
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = text;
    return optionElement;
}

// ------------------------------------------- Create event function for details to display ------------------------------------------------- //
const detailsToggle = (event) => {  
    // ------------------------------------------- Create variable to call data-"key" in html ------------------------------------------- //
    const overlay_1 = document.querySelector('[data-list-active]');
    const title = document.querySelector('[data-list-title]')
    const subtitle = document.querySelector('[data-list-subtitle]')
    const description = document.querySelector('[data-list-description]')
    const image1 = document.querySelector('[data-list-image]')
    const imageblur = document.querySelector('[data-list-blur]')
    // ------------------------------------------- if statement to display the books id from data.js in the html ------------------------ //
    event.dataset.id ? overlay_1.style.display = "block" : undefined;
    event.dataset.description ? description.innerHTML = event.dataset.description : undefined;
    event.dataset.subtitle ? subtitle.innerHTML = event.dataset.subtitle : undefined;
    event.dataset.title ? title.innerHTML = event.dataset.title : undefined;
    event.dataset.image ? image1.setAttribute ('src', event.dataset.image) : undefined;
    event.dataset.image ? imageblur.setAttribute ('src', event.dataset.image) : undefined;
};

// ------------------------------------------- Click function to close details -------------------------------------------------------------- //
const details_Close = document.querySelector('[data-list-close]')    
    details_Close.addEventListener('click', () => {
    document.querySelector("[data-list-active]").style.display = "none";
});

// ------------------------------------------- Add event lisnter to click on specific data-list --------------------------------------------- //
const book_click = document.querySelector('[data-list-items]')
book_click.addEventListener('click', detailsToggle)

// ------------------------------------------- Show more books - selecting button in html --------------------------------------------------- //
const show_More_Button = document.querySelector('[data-list-button]')

// ------------------------------------------- Variable structure of books when clicking more ----------------------------------------------- //
const num_Items_To_Show = Math.min(books.length - end_Index,)

// ------------------------------------------- Variable structure to display amount of books when clicking more ----------------------------- //
const show_More_Button_Text = `Show More (${num_Items_To_Show})`

// ------------------------------------------- .textContent placing variable in HTML -------------------------------------------------------- //
show_More_Button.textContent = show_More_Button_Text

// ------------------------------------------- Event lisener to click the more button and display more books -------------------------------- //
show_More_Button.addEventListener('click', () => {         
    const fragment = document.createDocumentFragment()
    start_Index += 36;
    end_Index += 36;
    const start_Index_1 = start_Index
    const end_Index_1 = end_Index
    console.log(start_Index_1)
    console.log(end_Index_1)
    const extracted = books.slice(start_Index_1, end_Index_1)

    // for loop to contuninue displaying all books, images, title, id, description, plublished in object imported from data.js file ---- //
    for (const {author ,image, title, id , description, published} of extracted) {
        // preview creating an discription list in html and previewing all information stored
        const preview = document.createElement('dl')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        
        preview.innerHTML= // ------------------------------------------ HTML structure ------------------------------------------------- //
        `<div>
         <image class='preview__image' src="${image}" alt="book pic"}/>
         </div>
         <div class='preview__info'>
         <dt class='preview__title'>${title}<dt>
         <dt class='preview__author'> By ${authors[author]}</dt>
         </div>`
        // ------------------------------------------- appendChild allowing preview variable to display in fragment --------------------- //
        fragment.appendChild(preview)
    }
    
    const booklist1 = document.querySelector('[data-list-items]') 
    booklist1.appendChild(fragment)
});
// -------------------------------------------------- End of show more button ---------------------------------------------------------------- //

// -------------------------------------------------- Creating an onclick option for user to view books -------------------------------------- //

// -------------------------------------------------- Retrieved elements from the DOM using query Selectors ---------------------------------- //
const data_List_Items = document.querySelector('[data-list-items]');
// const list_Message = document.querySelector('[data-list-message]')
const data_List_Button = document.querySelector('[data-list-button]');
const list_Active = document.querySelector('[data-list-active]');
const list_Blur = document.querySelector('[data-list-blur]');
const list_Image = document.querySelector('[data-list-image]');
const list_Title = document.querySelector('[data-list-title]');
const list_Subtitle = document.querySelector('[data-list-subtitle]')
const list_Description = document.querySelector('[data-list-description]')
const list_Close_Button = document.querySelector('[data-list-close]');

// ------------------------------------------ Creating function to preview each individual book continusly ---------------------------------- //
function createPreview({author, id, image, title}) {
    let element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id) 
    element.innerHTML = // ------------------------------------------ HTML structure ------------------------------------------------- //
    `<img class='preview__image' src="${image}" />
    
     <div class="preview__info">
     <h3 class="preview__title">${title}</h3>
     <div class="preview__author">${authors[author]}</div>
     </div>
    `;

    return element

}
const fragment1 = document.createDocumentFragment() 

// ------------------------------------------ Creating for loop to preview each individual book continusly ------------------------------ //
for (const { author, title, image, id } of extracted) {
    const preview = createPreview({author, id, image, title})
    
    fragment1.appendChild(preview) 
}
data_List_Items.appendChild(fragment1)

// ------------------------------------------ Show more books button -------------------------------------------------------------------- //
// ------------------------------------------ Variable to calculate page and books per page --------------------------------------------- //
const matches = books
let show_More = page * BOOKS_PER_PAGE
// ------------------------------------------ Click function ---------------------------------------------------------------------------- //
data_List_Button.addEventListener('click', () =>{
    const remaining = matches.slice(show_More, matches.length) 
    
    const fragment = document.createDocumentFragment()
    for(const {author, title, image, id} of remaining){
        const  preview = createPreview({author, id, image, title});
        fragment.appendChild(preview)
    }
    data_List_Items.appendChild(fragment) 
    show_More += remaining.length;
    data_List_Button.disabled = !(matches.length - show_More > 0)
});

data_List_Button.innerHTML  = // ------------------------------------------ HTML structure ------------------------------------------------- //
`<span>show More(
 <span class='list__remaining'>${matches.length - show_More > 0 ? matches.length - show_More : 0}</span>)
`

data_List_Items.addEventListener('click', (event) => {
    // ------------------------------------------ Creating a path way form the html to the body to div etc -------------------------------- //
    const path_Array = Array.from(event.path || event.composedPath());
    // ------------------------------------------ For loop to select each book individually should not select more than one book ---------- //
    let active;
    for (const node of path_Array){ 
        // ------------------------------------------ Break stop code from running at a specific point ------------------------------------ //
        if(active)break;
        const preview_Id = node.dataset?.preview;
        // Single book is an variable that is create calling data from books an object in data.js ----------------------------------------- //
       for (const single_Book of books) { 
            // if statement if book.id is compared to preview_Id(variable created above)then it should active then break ------------------ //
            if(single_Book.id === preview_Id) {
                active = single_Book;
                
                break
            }
        }
    }
    // ------------------------------------------ If active them return the following below ----------------------------------------------- //
    if(!active) {return}
    // -------------------------------------------------- View Book image, title, author, date plublished & style blur ----------------------- //
    list_Active.open = true;
    list_Image.setAttribute('src', active.image);
    list_Blur.style.backgroundImage = `url('${active.image}')`
    list_Title.textContent = active.title;
    list_Subtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    list_Description.textContent = active.description
    
});

// -------------------------------------------------- closing the book preview ----------------------------------------------------------------------- //
list_Close_Button.addEventListener('click', () => {
    list_Active.open = false
})