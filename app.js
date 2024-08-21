const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
let myLeads = []
let myNotes = {}
const deleteBtn = document.getElementById('delete-btn')
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const notesFromLocalStorage = JSON.parse(localStorage.getItem("myNotes"))
const tabBtn = document.getElementById('tab-btn')

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    myNotes = notesFromLocalStorage || {}
    render(myLeads)
}

tabBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener('click', () => {
    localStorage.clear()
    myLeads = []
    myNotes = {}
    ulEl.innerHTML = ''
    // renderLeads()
})

inputBtn.addEventListener('click', function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads)

    console.log(localStorage.getItem("myLeads"))
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems +=
            `<li> 
        <a target='_blank' href= '${leads[i]}'>  ${leads[i]}  </a> 
        <span> <i class="ri-sticky-note-add-line note_icon" data-index= "${i}"></i> </span>
            <div class="note_input" data-index="${i}">
               <input type="text" class="note_text" placeholder = "Add a note..." data-index = "${i}" value = "${myNotes[leads[i]] || ''}" />
               <button class="save_note-btn" data-index="${i}">Save Note</button>
            </div>
        </li>`
    }
    ulEl.innerHTML = listItems

    const noteIcons = document.querySelectorAll(".note_icon")
    noteIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            const index = this.getAttribute("data-index")
            const noteInput = document.querySelector(`.note_input[data-index = '${index}']`)
            noteInput.style.display = noteInput.style.display === "none" ? "block" : "none"
        })
    })

    const saveNoteBtns = document.querySelectorAll(".save_note-btn")
    saveNoteBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const index = this.getAttribute("data-index")
            const lead = leads[index]
            const noteText = document.querySelector(`.note_text[data-index='${index}']`).value
            myNotes[lead] = noteText
            localStorage.setItem("myNotes", JSON.stringify(myNotes))
        })
    })
}



// CHANGE THEME

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'


const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')


const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'


if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}


themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})













// THE END OF THE CHROME EXTENSION CODE , THIS ONE HERE IS JUST A DIFFERENT CODE THAT ALLOWS US TO ADD THE IMGAES OF  THE EMPLOYERS IN  A COMPANY WITH USINNG HTML BUT JAVASCRIPT WHICH WOULD HELP US TO MODIFY IT MORE IF THEY EMPLOYE ANOTHER PERSON

// const container = document.getElementById('img-container')

// const img = [
//     "image1",
//     "image2",
//     "image3"
// ]

// function renderimgs() {
//     let imgDOM = ""
//     for (let i = 0; i < img.length; i++) {
//         imgDOM += `  <img src="${img[i]}" alt="images">`
//     }
//     container.innerHTML = imgDOM
// }

// renderimgs()