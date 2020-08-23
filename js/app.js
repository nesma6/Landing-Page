/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
/*
*/

const navbar = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const newSection = document.getElementById('sections');
const gradient = [
  "linear-gradient(to right top , #2b5876 , #4e4376)",
  "linear-gradient(to right top , #314755 , #26a0da)",
  "linear-gradient(to right top , #348F50 , #56B4D3)",
  "linear-gradient(to right top , #4CB8C4 , #3CD3AD)"
];

// Build navbar

for (let item of sections) {
        let sec = document.createElement('li');
        sec.innerHTML =
                `<a data-page="${item.id}" class="nav-link" data-link="#${item.id}">
                    ${item.dataset.nav}
                </a>`;
        navbar.appendChild(sec);
};


const Bub = document.createElement('div');
Bub.classList.add("bubble");
navbar.appendChild(Bub);

const bubble = document.querySelector('.bubble');

const options = {
  threshold : 0.7
};

let observer = new IntersectionObserver(navbarCheck , options);

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
function navbarCheck(entries){
  entries.forEach((entry) => {
    const className = entry.target.className ;
    const anchorActive = document.querySelector(`[data-page=${className}]`);
    const gradientIndex = entry.target.getAttribute('data-index');
    const coords = anchorActive.getBoundingClientRect();
    const directions = {
      height: coords.height,
      width: coords.width,
      top: coords.top,
      left: coords.left
    };
    if (entry.isIntersecting) {
      bubble.style.setProperty("left" , `${directions.left}px`);
      bubble.style.setProperty("top" , `${directions.top}px`);
      bubble.style.setProperty("height" , `${directions.height}px`);
      bubble.style.setProperty("width" , `${directions.width}px`);
      bubble.style.background = gradient[gradientIndex];
    }
    else {
      bubble.style.background = "white";
    }
  });

}

sections.forEach((section) => {
  observer.observe(section);
});



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

/**
 * End Main Functions
 * Begin Events
 *
*/


// Scroll to section on link click
const links = document.querySelectorAll(".nav-link");
links.forEach((item) => {
  item.addEventListener("click", ()=>{
    let el = document.querySelector(item.getAttribute("data-link"));
    el.scrollIntoView({behavior: "smooth", block: "start"});
  })
});


// Set sections as active
