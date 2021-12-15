/* 
!What is the DOM? 
    ? The DOM is basically the interface between our JS code and the browser (more specifically HTML documents rendered in and by the browser)
      * Allows us to make JS interact with the browser. 
      * We can write JS to create, modify, and delete HTML elements, set styles, classes and attributes, and listen and respond to events. 
      * DOM tree is generated from an HTML document, which we can interact with. 
      * DOM is a very complex API that contains lots of methods and properties to interact with the DOM tree. 
   ? Every single node of the DOM tree is of the type Node, and each node is represented in JS by an object. 
      * This node object gets access to special node methods and properties: .textContent, .childNode, .parentNode, .cloneNode().
      * These nodes have different types of child nodes: 
            ? Element: This type of node gives each HTML element access to a ton of useful properties -> .innerHTML, .classList, .children, .parentElement, .append(), .remove(), .insertAdjacentHTML(), .querySelector(), .closest(), .matches(), .scrollIntoView(), .setAttribute()
                  * The element type has internally an HTML element child type, and that element type itself has exactly one child type (and each have unique properties: img -> src, a -> href) for each HTML element that exists in HTML.
            ? Text: <p>Paragraph</p> <- Type of text
            ? Comment  <!--Comment--> 
            ? Document.
    ? What makes the DOM tree work is inheritance: Means that all of the child types will get access to methods and properties of all their parent node types

    !Special node type that allows us to have event listeners on every HTML element: 
        ? EventTarget: A parent of the Node type, and the Window node type(Global Objects, lots of methods and properties, many unrelated to the DOM). (Abstract Type)
            * .addEventListener, 
            * .removeEventListener
*/



//!Events: 
const h1 = document.querySelector('h1');

//addEventListener is better because it allows us to add multiple event listeners to the same event, and we can remove event listeners in case we don't need them anymore.

// ? const alertH1 = (e) => {
//?   alert('addEventListener')

//?   h1.removeEventListener('mouseenter', alertH1) //can remove an event listener at any point in our code
//? }

// h1.addEventListener('mouseenter', alertH1)


//? h1.onmouseenter = (e) => {}

//!Bubbling and Capturing (propagating): 
//Js Events have a bubbling phase and a capturing phase.
//Events can only be handled in the target and bubbling phase, but we can set up events in such a way so that they listen to events in the capturing phase instead. 
//Not all events have a capturing and bubbling phase, some of them are created right on the target element.

/*

? const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
? const randomColor = () => {
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
}

? document.querySelector('.nav__link').addEventListener('click', (e) => {
?    this.style.backgroundColor = randomColor()
?    console.log('LINK', e.target, e.currentTarget); 
    * target is where the event happened, it is not the element on which the event handler was attached, currentTarget is the element on which the event handler is attached. CurrentTarget is exactly the same at the 'this' keyword

  Stop Propagation: 
    ? e.stopPropagation() <-- Usually not a good idea to stop propagation
? })

? document.querySelector('.nav__links').addEventListener('click', (e) => {
?  this.style.backgroundColor = randomColor()
?  console.log('Contianer', e.target, e.currentTarget);
? })

? document.querySelector('.nav').addEventListener('click', (e) => {
?  this.style.backgroundColor = randomColor()
?  console.log('Nav', e.target, e.currentTarget);
? })

*/

//!Selecting, Creating, Deleting Elements.
console.log(document.documentElement) // <- documentElement selects the whole page, all of the HTML.

const header = document.querySelector('.header') // Will return the first element that matches this selector
const allSections = document.querySelectorAll('.section') //Returns a node list with all of the elements with the class "section"

document.getElementById('section--1')
const allButtons = document.getElementsByTagName('button') //returns an HTML collection of all the buttons. HTML collections are so called "live collections" meaning that if the DOM changes, then this collection is also immediately updated automatically.

document.getElementsByClassName('btn') //HTML collection

/* 
! Creating and inserting elements: 

  ? .insertAdjacentHTML: method inserts a text as HTML, into a specified position.

Legal Positions: 

  ? "afterbegin"
  ? "afterend"
  ? "beforebegin"
  ? "beforeend"

  Ex: 
  * var h = document.getElementById("myH2");
  * h.insertAdjacentHTML("afterend", "<p>My new paragraph</p>");

*/

const message = document.createElement('div') //returns a DOM element we can save somewhere.
message.classList.add('cookie-message')
//message.textContent = 'We use cookies for improved functionality and analytics.'
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>'

//? header.prepend(message) <--Prepending adds the element as the FIRST child of this element.
header.append(message) //adds the element as the LAST child of the header element.
//? header.append(message.cloneNode(true)) <-- allows us to copy all the child elements, so we can have multiple of the saem element in different places.

//? header.before(message) <-- Inserts the message element before the header element (as a sibling).
//? header.after(message) <-- Inserts the message element AFTER the header element(as a sibling).

//!Deleting Elements:
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove()
  //message.parentElement.removeChild(message) <-- How we used to have to remove elements. (DOM traversing)
})

//! Styles
message.style.backgroundColor = '#37383d' //To set a style on an element we get the element, then .style, then .propertyName (USE CAMEL CASE), and then a string with a value.
message.style.width = '120%' //Setting styles like this sets the style in the DOM, so inline styles.

console.log(message.style.backgroundColor) //can only get inline styles, would not work otherwise. (rgb(55, 56, 61))

console.log(getComputedStyle(message).color) //Gets the style from the CSS file

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'

//The ':root' in CSS
//? document.documentElement.style.setProperty('--color-primary', 'orangered')

//! Attributes:
const logo = document.querySelector('.nav__logo')
//JS only gets the standard properties expected to be on elements, not custom ones.
console.log(logo.alt) //accessing the alt attribute
console.log(logo.className)
//Can access non-standard propterties like this: logo.getAttribute('non-standard-property')

//! Set Attributes:
logo.alt = 'Beautiful minimalist logo'

//! Set a new attribute:
logo.setAttribute('comanpy', 'Bankist')

console.log(logo.src) //accessing the src attribute (returns the absolute URL)
console.log(logo.getAttribute('src')) //Relative URL

const link = document.querySelector('.nav__link--btn')
console.log(link.href); //absolute URL
console.log(link.getAttribute('href')); //relative URL

//! Data attributes: Special kind of attributes that start with the word 'data'.
//? Data attributes are used especially when you need to store data in the UI, in the actual HTML code.
console.log(logo.dataset.versionNumber); 

//! Classes: 
logo.classList.add('c') //can add multiple classes by passingin multiple values.
logo.classList.remove('c')
logo.classList.toggle('c')
logo.classList.contains('c') //not includes like in arrays

//Don't use`
//? logo.className = 'A' //will override all other classes

//! Traversing the DOM: We can select an element based on another element. This is very important because sometimes we need to select elements relative to a certain other element. EX: a direct child or a direct parent element.
const h1 = document.querySelector('h1')

//! Going downwards: child
console.log(h1.querySelectorAll('.highlight'))
console.log(h1.childNodes);
console.log(h1.children); //HTML collection of the two highlight classes inside the h1, only works for direct children
h1.firstElementChild.style.color = white; // first child gets set to white
h1. lastElementChild.style.color = orangered //last child.

//! Going upwards: parents
console.log(h1.parentNode); //direct parent
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)' //closest method receives a query string. Selects the closest parent element to the h1 class, the closest header in these case.

//QuerySelector finds children, no matter how deep in the DOM tree, closest method finds parents no matter how far up in the DOM tree

//!Going sideways: siblings (In js we can only access direct siblings, only the previous and the next one)

//Previous sibling: 
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling); //Node
console.log(h1.nextSibling); //Node

console.log(h1.parentElement.children);//all the siblings including itself
[...h1.parentElement.children].forEach(function(el){
  if(el !== h1) el.style.transform = 'scale(0.5)'
})