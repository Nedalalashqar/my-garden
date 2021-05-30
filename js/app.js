'use strict';


let form = document.getElementById( 'form' );
let table = document.getElementById( 'table' );
let tHeader = ['#', 'Image', 'Name', 'Season'];

let Flowers = function ( name,image,season ){
  this.name = name;
  this.image = `./img/${image}.jpeg`;
  this.season = season;
  Flowers.all.push( this );
};

Flowers.all = [];

function tableHead() {

  let thHeder = document.createElement( 'tr' );
  for ( let i = 0; i < tHeader.length; i++ ) {
    let thE1 = document.createElement( 'th' );
    thHeder.appendChild( thE1 );
    thE1.textContent = tHeader[i];
    table.appendChild( thHeder );
  }
}


function renderCatagory() {
  table.innerHTML = '';
  tableHead();
  for ( let i = 0; i < Flowers.all.length; i++ ) {
    let trE2 = document.createElement( 'tr' );
    let tdE1 = document.createElement( 'td' );
    let deleteButton = document.createElement( 'button' );
    deleteButton.setAttribute( 'id', Flowers.all[i].name );
    deleteButton.textContent = 'X';
    trE2.appendChild( deleteButton );
    table.appendChild( trE2 );
    let tdE2 = document.createElement( 'td' );
    trE2.appendChild( tdE2 );
    // created img elemnt and put it in the TD
    let img =document.createElement( 'img' );
    img.src= Flowers.all[i].image;
    // tdE2.textContent = Flowers.all[i].image;
    tdE2.appendChild( img );
    trE2.appendChild( tdE1 );
    tdE1.textContent = Flowers.all[i].name;
    let tdE3 = document.createElement( 'td' );
    trE2.appendChild( tdE3 );
    tdE3.textContent = Flowers.all[i].season;

    console.log( trE2 );

    deleteButton.addEventListener( 'click',deleteRow );
    function deleteRow(){
      console.log( Flowers.all[i] ); 
      // used slice to remove from flowers.all array and use the saving to local storage function again
      Flowers.all.splice( i,1 );
      getList();
      // made the row that has everything to an empty string

      trE2.innerHTML='';
      
    }

  }
}


form.addEventListener( 'submit', eventButton );
function eventButton( event ) {
  event.preventDefault();
  let flowerName = event.target.Name.value;
  let flowerimage = event.target.Image.value;
  let flowerSeason = event.target.Season.value;
  new Flowers ( flowerName,flowerimage,flowerSeason );
  getList();
  renderCatagory();
}

// table.addEventListener( 'click', deleteList );
// function deleteList( event ) {
//   event.preventDefault();
//   let index;
//   if ( event.target.id !== 'table' ) {
//     for ( let i = 0; i < Flowers.all.length; i++ ) {
//       if ( event.target.id === Flowers.all[i].title ) {
//         index = i;
//         Flowers.all.splice( index, 1 );
//       }
//     }
//     getList();
//     getFrom();
//   }
// }


function getList() {
  localStorage.setItem( 'Flowers', JSON.stringify( Flowers.all ) );
}

function getFrom() {
  Flowers.all = JSON.parse( localStorage.getItem( 'Flowers' ) ) || [];
  renderCatagory();
}
getFrom();





