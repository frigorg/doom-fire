const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

const debug = false;

const pixelsQuantityWidth = 50;
const pixelsQuantityHeight = 50;
const totalPixels = pixelsQuantityWidth * pixelsQuantityHeight;
const fireIntensityArray = new Array();
const decayFactor = 5;
const windFactor = 0; // 0 : no wind
const windDirection = "left"; // left | right
let startingFire = 36; // max 36 | min 0
let currentColor = ["r","g","b"];

function colorPickerDisplay () {
  let colorCode = ['r', 'g', 'b'];

  let html = "<table>";
  for (let r = 0; r < 3; r++){
    html += "<tr>";
    for (let g = 0; g < 3; g++){
      for (let b = 0; b < 3; b++){
        html += '<td class="color-palette-cell" style="background-image: linear-gradient(';
        html += `rgb(${fireColorsPalette[9][colorCode[r]]},${fireColorsPalette[9][colorCode[g]]},${fireColorsPalette[9][colorCode[b]]}),`;
        html += `rgb(${fireColorsPalette[30][colorCode[r]]},${fireColorsPalette[30][colorCode[g]]},${fireColorsPalette[30][colorCode[b]]}));`;
        html += `" data-color="${colorCode[r]}${colorCode[g]}${colorCode[b]}"></td>`;
      }
    } 
    html += "</tr>"
  }
  html += "</table>";

  document.querySelector(".color-palette").innerHTML = html;
}

function changeColor() {
  let choosenColor = document.querySelectorAll(".color-palette-cell");
  choosenColor.forEach((node) => {
    node.addEventListener("click", (element)=> {
      let selectedColor = element.target.getAttribute("data-color");
      currentColor = [];
      for (let char of selectedColor)
        currentColor.push(char);
    });
  });
}

for (let i = 0; i < totalPixels ; i++)
fireIntensityArray[i] = 0;

function renderGrid() {
  let html = "<table>";
  html += "<tr>";

  fireIntensityArray.forEach((cell, index) => {
    if (debug){
      html += '<td>';
      html += `<div class="cell-data"> ${cell} </div>`;
      html += `<div class="cell-index"> ${index} </div>`;
    }else{
      let bgColor = `rgb(${fireColorsPalette[cell][currentColor[0]]},${fireColorsPalette[cell][currentColor[1]]},${fireColorsPalette[cell][currentColor[2]]})`;
      html += `<td style="background-color: ${bgColor};">`;
    }
    html += "</td>";
    if ((index+1) % pixelsQuantityWidth === 0){
      html += "</tr>";
      if (index % pixelsQuantityWidth === 0)
        html += "<tr>";  
    }
  });
  html += "</table>";

  document.getElementById("canvas").innerHTML = html;
}

function generateFireSource(startingFire){
  startingFire = Math.min(36, Math.abs(startingFire));
  for (let i = totalPixels - pixelsQuantityWidth; i < totalPixels; i++){
    fireIntensityArray[i] = startingFire;
  }
}

let position;
let decay;
let windSpeed;
function firePropagation() {
  for(let xIndex = 0; xIndex < pixelsQuantityWidth; xIndex++){
    for(let yIndex = 0; yIndex < pixelsQuantityHeight; yIndex++){
      position = yIndex * pixelsQuantityHeight + xIndex;
      if (position < (totalPixels - pixelsQuantityWidth)){
        decay = Math.floor(Math.random() * decayFactor);
        windSpeed = Math.floor(Math.random() * Math.abs(windFactor));
        if (windDirection === "right")
          windSpeed *= -1;
        fireIntensityArray[Math.min((position - windSpeed), (totalPixels - pixelsQuantityWidth)-1)] = Math.max(0, fireIntensityArray[position + pixelsQuantityHeight] - decay);
      }
    }
  }
  renderGrid();
}

function start() {
  generateFireSource(startingFire);
  setInterval(firePropagation, 80);
}

colorPickerDisplay();
changeColor();
start();