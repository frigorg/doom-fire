const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

const debug = false;

const pixelsWidth = 50;
const pixelsHeight = 20;
const totalPixels = pixelsWidth * pixelsHeight;
const firePixelsArray = new Array();
let decay = 1;

for (let i = 0; i < totalPixels ; i++)
firePixelsArray[i] = 0;

function renderGrid() {
  let html = "<table>";
  html += "<tr>";

  firePixelsArray.forEach((cell, index) => {
    if (debug){
      html += '<td>';
      html += `<div class="cell-data"> ${cell} </div>`;
      html += `<div class="cell-index"> ${index} </div>`;
    }else{
      let bgColor = `rgb(${fireColorsPalette[cell].r},${fireColorsPalette[cell].g},${fireColorsPalette[cell].b})`;
      html += `<td style="background-color: ${bgColor};">`;
    }
    html += "</td>";
    if ((index+1) % pixelsWidth === 0){
      html += "</tr>";
      if (index % pixelsWidth === 0)
        html += "<tr>";  
    }
  });
  html += "</table>";

  document.getElementById("canvas").innerHTML = html;
}

function generateFireSource(){
  for (let i = totalPixels - pixelsWidth; i < totalPixels; i++){
    firePixelsArray[i] = 36;
  }
}


// PRIMEIRA TENTATIVA FRUSTRADA

// function firePropagation() {
//   for (let i = 0; i < (totalPixels - pixelsWidth); i++){
//     if (firePixelsArray[i+pixelsHeight] > 0){
//       decay = Math.floor(Math.random()*3);
//       firePixelsArray[i] = firePixelsArray[i+pixelsHeight] - decay;
//       if (firePixelsArray[i] < 0)
//       firePixelsArray[i] = 0;
//     }
//   }
//     renderGrid();
// }

function firePropagation() {
  for(let xIndex = 0; xIndex < pixelsHeight; xIndex++){
    for(let yIndex = 0; yIndex < pixelsWidth; yIndex++){
      let position = (xIndex * pixelsHeight) + yIndex;
      if ((position) < (totalPixels - pixelsWidth)){
        decay = Math.floor(Math.random()*3);
        firePixelsArray[position] = firePixelsArray[position + pixelsHeight] - decay;
        if (firePixelsArray[position] < 0)
        firePixelsArray[position] = 0;
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