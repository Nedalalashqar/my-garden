'use strict';

const form = document.getElementById('form');
const table = document.getElementById('table');
let tHedar = ['#' , 'Img' , 'Name' , 'Season'];


function Flowrs ( flowrsName , flowrsCategory , flowerSeason){
  this.flowrsName = flowrsName;
  this.flowrsCategory = flowrsCategory;
  this.flowerSeason = flowerSeason ;
  this.flowrsPath = ' ' ;
  Flowrs.call.push(this);
}
Flowrs.all=[];

Flowrs.prototype.toLowerCase = function() {
  this.flowrsCategory = this.flowrsCategory.toLowerCase();

};

Flowrs.prototype.Path = function() {
  this.flowrsPath = `./img/${this.flowrsCategory}.jpeg`;

};

form.addEventListener('submit' , function(eve){
  eve.preventDefault();
  let newFlowrNmae = eve.target.flowrsName.value;
  let newFlowrCategory= eve.target.flowrsCategory.value;
  let newFlowrSeason = eve.target.flowerSeason.value;


  const Nflowr = new Flowrs(newFlowrNmae , newFlowrCategory , newFlowrSeason) ;
  Nflowr.toLowerCase();

  Nflowr.Path();
  localStorage.setItem ( 'flowrData' , JSON.stringify( Flowrs.all ) );
  

  table.innerHTML = '';

} );

getDataLocal(){
    let localData = localStorage.setItem('flowrData');
    if(localStorage){
        Flowrs.all =JSON.parse(localData);
    }
}
function renderData (){
    const tableElement = document.createElement('tableElement');
    table.appendChild(tableElement);
    tableElement.setAttribute('id' , 'tableData');

    const trHead = document.createElement('tr');
    tableElement.appendChild(trHead);
    for(let i = 0 ; tHedar.length ; i++){
        const thEl1 = document.createElement('th');
        thEl1.textContent=tHedar[i];

    }
    for (let j =0 ;Flowrs.all.length ; j++){
        const trEl2 = document.createElement('tr');
        tHedar.appendChild(trEl2);

        const tdEl = document.createElement('td');
        trEl2.appendChild(tdEl);
        tdEl.textContent='x';
        tdEl.setAttribute('onlick' , 'deleteMe(this)');

        const tdImgEl =document.createElement('img');
        tdImgEl.src= Flowrs.all[j].flowrsPath;
        trEl2.appendChild(tdImgEl);

        const tdNameEl = document.createElement('td');
        trEl2.appendChild(tdNameEl);
        tdNameEl.textContent= Flowrs.all[j].flowrsName;

        const tdSeaEl = document.createElement('td');
        trEl2.appendChild(tdSeaEl);
        tdSeaEl.textContent=Flowrs.all[j].flowerSeason;


    


    }
}


function deleteMe(meIamHere){
    const elementTable = document.getElementById('tableData');
    let tableRowIndex = meIamHere.parentNode.rowIndex;
    elementTable .deleteRow(tableRowIndex);
    Flowrs.all.splice(tableRowIndex-1,1),
    localStorage.setItem('flowrData' , JSON.stringify(Flowrs.all));
    table.innerHTML='';
    getDataLocal();
}

function clearLocal({
    localStorage.clear();
    window.location.reload('Refresh')
})