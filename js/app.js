'use strict';

// listen to the container for voting
let myContainer = document.getElementById('container');
// listen to click on the "button" to display results
let showResultsBtn = document.getElementById('show-results-btn');

// JS will populate the src- to display images
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');


// OTHER GLOBALS

const goatArray = [];
let maxVotes = 5;
let counter = 0;

// CONSTRUCTOR

function Goat(name, fileExtension = 'jpg'){
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.votes = 0;
  goatArray.push(this);
}

// INSTANTIATE SOME GOATS
new Goat('bag');
new Goat('banana');
new Goat('bathroom');
new Goat('boots');
new Goat('breakfast');
new Goat('bubblegum');
new Goat('chair');
new Goat('cthulhu');
new Goat('dog-duck');
new Goat('dragon');
new Goat('pen');
new Goat('pet-sweep');
new Goat('scissors');
new Goat('shark');
new Goat('sweep', 'png');
new Goat('tauntaun');
new Goat('unicorn');
new Goat('water-can');
new Goat('wine-glass');

console.log(goatArray);
// EXECUTABLE CODE

function getRandomIndex(){
  return Math.floor(Math.random() * goatArray.length);
}

function renderImages(){
  let goatOneIndex = getRandomIndex();
  let goatTwoIndex = getRandomIndex();
  let goatThreeIndex = getRandomIndex();

  // validation - to make sure the images are unique per round 
  while (goatOneIndex === goatTwoIndex || goatOneIndex === goatThreeIndex){
    goatOneIndex = getRandomIndex();
  }
  while (goatThreeIndex === goatTwoIndex){
    goatThreeIndex = getRandomIndex();
  }

  // grab the images and assign src attribute
  imgOne.src = goatArray[goatOneIndex].src;
  imgOne.alt = goatArray[goatOneIndex].name;
  goatArray[goatOneIndex].views++;
  imgTwo.src =goatArray[goatTwoIndex].src;
  imgTwo.alt = goatArray[goatTwoIndex].name;
  goatArray[goatTwoIndex].views++;
  imgThree.src = goatArray[goatThreeIndex].src;
  imgThree.alt = goatArray[goatThreeIndex].name;
  goatArray[goatThreeIndex].views++;
  // display images

}

renderImages();

// EVENTS

//events - click images
function handleClick(event){
  // max clicks 15 - decriment max clicks
  maxVotes--;
  //listen to which image was clicked - increase votes
  let imgClicked = event.target.alt;
  for(let i = 0; i < goatArray.length; i++){
    if(imgClicked === goatArray[i].name){
      goatArray[i].votes++;
    }
  }
  // console.log(goat);

  // rerender 2 new images
  renderImages();
  //once max attempts have reached 0, no londer allow clicks
  if(maxVotes === 0){
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(event){
  let resultsList =document.getElementById('display-results');
  if(maxVotes === 0){
    for (let i = 0; i < goatArray.length; i++){
      let li = document.createElement('li');
      li.textContent = `${goatArray[i].name} was viewed ${goatArray[i].views} times and clicked ${goatArray[i].votes} times.`;
      resultsList.appendChild(li);
    }
  }
}

//step one add event listener

myContainer.addEventListener('click', handleClick);


// EVENT #2
showResultsBtn.addEventListener('click', handleShowResults);
