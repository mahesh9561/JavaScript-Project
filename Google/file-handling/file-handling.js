const content =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus cum,";
function downloadContent() {
  // Download a file with file name as `temp.txt` => with context being thecontent veriable
  // blob objects
  const blob = new Blob([content], { type: "text/plain" });

  console.log(blob);
  console.log("object");
  const url = URL.createObjectURL(blob);

  //    <a href="url" download="temp.txt"> Click to Download </a>
  const link = document.createElement("a");
  link.href = url;
  console.log(url);
  link.download = "temp.txt";
  link.innerText = "Click to Download";
  link.click(); // Clicking with the javascript
  //   document.body.appendChild(link);
}
