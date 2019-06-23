const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

const debug = false;

const pixelsQuantityWidth = 30;
const pixelsQuantityHeight = 30;
const totalPixels = pixelsQuantityWidth * pixelsQuantityHeight;
const fireIntensityArray = new Array();
const decayFactor = 5;
const windFactor = 3; // 0 : no wind
const windDirection = "left"; // left | right

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
      let bgColor = `rgb(${fireColorsPalette[cell].r},${fireColorsPalette[cell].g},${fireColorsPalette[cell].b})`;
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

function generateFireSource(){
  for (let i = totalPixels - pixelsQuantityWidth; i < totalPixels; i++){
    fireIntensityArray[i] = 36;
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
  generateFireSource();
  setInterval(firePropagation, 100);
}

start();