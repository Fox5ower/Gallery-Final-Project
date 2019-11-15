const dropArea = document.getElementById("drop-area");
const progress = document.getElementById("progress-bar");

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

["dragenter", "dragover"].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});
["dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener("drop", handleDrop, false);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight() {
  dropArea.classList.add("highlight");
}

function unhighlight() {
  dropArea.classList.remove("highlight");
}

function handleDrop(e) {
  var dt = e.dataTransfer;
  var files = dt.files;
  handleFiles(files);
}

function handleFiles(files) {
  files = [...files];
  files.forEach(previewFile);
}

let counter = 0;

function previewFile(file) {
  counter++;
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement("img");
    img.src = reader.result;
    localStorage.setItem(counter, reader.result);
    document.getElementById("gallery").appendChild(img);
  };
}

window.onload = function() {
  counter = document.cookie;
  for (let i = 1; i <= localStorage.length; i++) {
    let img = document.createElement("img");
    img.src = localStorage.getItem(i);
    document.getElementById("gallery").appendChild(img);
  }
};
window.beforeunload = function() {
  document.cookie = counter;
};
