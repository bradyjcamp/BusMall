'use strict';

// Listen to the container for selections and show results button
let myContainer = document.getElementById('container');
// let showResultsBtn = document.getElementById('show-results-btn');

// Display images in HTML
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

const ctx = document.getElementById('myChart').getContext('2d');

// Gloabal Variabls
let indexCollection = [];
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

//this is allowing us to loop through out imagas in the array and make sure they are different from one another
function renderImages(){
  while(indexCollection.length < 6){
    let randomNum = getRandomIndex();
    while(!indexCollection.includes(randomNum)){
      // unshift to add random to front?
      indexCollection.push(randomNum);
    }
  }
  console.log(indexCollection);
  // array = queue
  // first in first out

  let productOneIndex = indexCollection.shift();
  let productTwoIndex = indexCollection.shift();
  let productThreeIndex = indexCollection.shift();

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

function renderChart(){
  let productNames = [];
  let productSelections = [];
  let productShown = [];

  for(let i = 0; i < productArray.length; i++){
    productNames.push(productArray[i].name);
    productSelections.push(productArray[i].selections);
    productShown.push(productArray[i].shown);
  }

  const chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productSelections,
        backgroundColor: 'rgb(120, 228, 93)',
        borderColor: 'rgb(120, 228, 93)',
        borderWidth: 1,
        hoverBackgroundColor: 'green',
        hoverBorderColor: 'green',
      },
      {
        label: '# of Views',
        data: productShown,
        backgroundColor: 'rgb(209, 85, 85)',
        borderColor: 'rgb(209, 85, 85)',
        borderWidth: 1,
        hoverBackgroundColor: 'red',
        hoverBorderColor: 'red',
      }
      ]
    },

    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  const myChart = new Chart(ctx, chartObj);
}

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
    renderChart();
  }
}

// function handleShowResults(event){
//   let resultsList =document.getElementById('display-results');
//   if(rounds === 0){
//     renderChart();
//   }
// }

myContainer.addEventListener('click', handleClick);
// showResultsBtn.addEventListener('click', handleShowResults);
