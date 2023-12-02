const header = document.getElementById("header");
const snoContainer = document.getElementById("sno");
const bodycontainer = document.getElementById("body-container");

const columns = 27,
  rows = 50;

for (let i = 1; i < columns; i++) {
  const headCell = document.createElement("div");
  headCell.className = "head-cell";
  if (i != 0) {
    // i = 1 => A
    // ASCII of 'A' => 65 => 64 + i
    headCell.innerHTML = String.fromCharCode(64 + i); //String.fromCharCode convert unicode to string
  }
  header.appendChild(headCell);
}

for (let i = 1; i <= rows; i++) {
  const snoCell = document.createElement("div");
  snoCell.innerHTML = i;
  snoCell.className = "sno-cell";
  snoContainer.appendChild(snoCell);
}

for (let row = 1; row <= rows; row++) {
  // create a row
  const rowElement = document.createElement("div");
  rowElement.className = "row";
  for (let col = 1; col < columns; col++) {
    // create a cell | column
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.contentEditable = true;
    // col = 1 => "A1","A2","A3".....
    cell.id = `${String.fromCharCode(64 + col)}${row}`; // c4
    rowElement.appendChild(cell);
    cell.addEventListener("focus", onFocusCell); // from functionality.js
    cell.addEventListener("input", onChangeCellText); // from functionality.js
  }

  bodycontainer.appendChild(rowElement);
}
