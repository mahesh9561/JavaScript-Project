// define the currently active cell.
let activeCellId = null;
const activeCellElment = document.getElementById("active-cell");

const form = document.querySelector(".form");
const state = {};

form.addEventListener("change", onChangeFormData);
const defaultVal = {
  // TODO : Change it  later
  fontFamily: "poppins-regular",
  fontSize: "16",
  isBold: false,
  isItalic: false,
  isUnderline: false,
  align: "left",
  textcolor: "#000000",
  bgColor: "#ffffff",
};

function onChangeCellText(event) {

  let changeText = event.target.innerText;
  //   console.log(changeText);
  //   Update input value
  const inputField = document.getElementById("cell-input");
  inputField.value = changeText;
  console.log(inputField)
  if (state[activeCellId]) {
    // The current cell is already to state object
    state[activeCellId].text = changeText;
  } else {
    state[activeCellId] = { ...defaultVal, text: event.target.innerText };
  }
}

function onChangeFormData() {
  const opsions = {
    fontFamily: form["fontFamily"].value,
    fontSize: form["fontSize"].value,
    isBold: form["isBold"].checked,
    isItalic: form["isItalic"].checked,
    isUnderline: form["isUnderline"].checked,
    align: form.align.value, // "left" | "center" | "right"
    textcolor: form["textcolor"].value,
    bgColor: form["bgColor"].value,
  };
  //   console.log(opsions);
  applyStyles(opsions);
}
function applyStyles(styles) {
  // it will apply  styles to the active cell.
  if (!activeCellId) {
    form.reset(); //If none of the cells are active
    alert("Please select cell to apply");
    return;
  }
  // if some cell is selected then apply style to the cell.
  const activeCell = document.getElementById(activeCellId);
  activeCell.style.color = styles.textcolor;
  activeCell.style.backgroundColor = styles.bgColor;
  activeCell.style.textAlign = styles.align;
  activeCell.style.fontWeight = styles.isBold ? "600" : "400";
  activeCell.style.fontSize = styles.fontSize + "px";
  activeCell.style.fontFamily = styles.fontFamily;
  activeCell.style.textDecoration = styles.isUnderline ? "underline" : "none"; //   styles.isUnderline && (activeCell.style.textDecoration = "underline");
  activeCell.style.fontStyle = styles.isItalic ? "italic" : "normal";

  // Whenever there's an update in a cell style, update those style with the state object.
  state[activeCellId] = { ...styles, text: activeCell.innerText };
}

function onFocusCell(event) {
  if (activeCellId === event.target.id) return;

  activeCellId = event.target.id;
  activeCellElment.innerHTML = activeCellId;

  // Fetch data from the selected cell
  const activeCell = document.getElementById(activeCellId);
  const cellValue = activeCell.innerText;

  // Update the input field with the cell value
  const inputField = document
    .getElementById("cell-state")
    .querySelector("input");
  inputField.value = cellValue;

  // Reset the form with the actual style
  if (state[activeCellId]) {
    resetForm(state[activeCellId]);
  } else {
    resetForm(defaultVal);
  }
}

function resetForm(styles) {
  form.fontFamily.value = styles.fontFamily;
  form.fontSize.value = styles.fontSize;
  form.isBold.checked = styles.isBold;
  form.isItalic.checked = styles.isItalic;
  form.isUnderline.checked = styles.isUnderline;
  form.align.value = styles.align;
  form.textcolor.value = styles.textcolor;
  form.bgColor.value = styles.bgColor;
}

function exportData() {
  // TODO : Export the file Data and Download it.
  const jsonData = JSON.stringify(state);
  //   console.log(jsonData);
  const blob = new Blob([jsonData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  console.log(url);
  link.download = "data.json";
  // link.innerText = "Click to Download";
  link.click(); // Clicking with the javascript
}
