'use strict';

// Listen to the container for selections and show results button
let myContainer = document.getElementById('container');
let showResultsBtn = document.getElementById('show-results-btn');

// Display images in HTML
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');


// Gloabal Variabls
const productArray = [];
let rounds = 25;

function Product(name, fileExtension = 'jpg'){
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.shown = 0;
  this.selections = 0;
  productArray.push(this);
}

// Instantiate
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

// Random number generator
function getRandomIndex(){
  return Math.floor(Math.random() * productArray.length);
}

function renderImages(){
  //creating variables in order to render random images
  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();

  // While loops used to ensure same images will not appear together
  while (productOneIndex === productTwoIndex || productOneIndex === productThreeIndex){
    productOneIndex = getRandomIndex();
  }
  while (productThreeIndex === productTwoIndex){
    productThreeIndex = getRandomIndex();
  }

  // grab the images and assign src attribute
  imgOne.src = productArray[productOneIndex].src;
  imgOne.alt = productArray[productOneIndex].name;
  productArray[productOneIndex].shown++;
  imgTwo.src =productArray[productTwoIndex].src;
  imgTwo.alt = productArray[productTwoIndex].name;
  productArray[productTwoIndex].shown++;
  imgThree.src = productArray[productThreeIndex].src;
  imgThree.alt = productArray[productThreeIndex].name;
  productArray[productThreeIndex].shown++;
  // display images

}

renderImages();

// Event - image selected
function handleClick(event){
// decrement rounds to stop after 25 rounds
  rounds--;
  // this listens to what image was selected then tallies selections
  let imgClicked = event.target.alt;
  for(let i = 0; i < productArray.length; i++){
    if(imgClicked === productArray[i].name){
      productArray[i].selections++;
    }
  }
  // rerender new images
  renderImages();
  if(rounds === 0){
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(event){
  let resultsList =document.getElementById('display-results');
  if(rounds === 0){
    for (let i = 0; i < productArray.length; i++){
      let li = document.createElement('li');
      li.textContent = `${productArray[i].name} had ${productArray[i].selections} selections and was shown ${productArray[i].shown} times`;
      resultsList.appendChild(li);
    }
  }
}

myContainer.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', handleShowResults);
