const dropArea = document.getElementById("drop-area");
const progress = document.getElementById("progress-bar");

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

//border color changer
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

function hideProgress() {
  progress.classList.remove("progShow");
}

function showProgress() {
  progress.classList.add("progShow");
}

function handleDrop(e) {
  var dt = e.dataTransfer;
  var files = dt.files;
  handleFiles(files);
}

let uploadProgress = [];
let progressBar = document.getElementById("progress-bar");

function initializeProgress(numFiles) {
  progressBar.value = 0;
  uploadProgress = [];

  for (let i = numFiles; i > 0; i--) {
    uploadProgress.push(0);
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent;
  let total =
    uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length;
  progressBar.value = total;
}

function handleFiles(files) {
  files = [...files];
  initializeProgress(files.length);
  files.forEach(uploadFile);
  files.forEach(previewFile);
}

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    let img = document.createElement("img");
    img.src = reader.result;
    document.getElementById("gallery").appendChild(img);
  };
}

function uploadFile(file, i) {
  var url = "https://api.cloudinary.com/v1_1/dkirggnhn/image/upload"; // API upload link
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  xhr.upload.addEventListener("progress", function(e) {
    showProgress();
    updateProgress(i, (e.loaded * 100.0) / e.total || 100); // Set progress bar value
  });

  xhr.addEventListener("readystatechange", function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100);
      hideProgress();
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      alert("An error occured");
    }
  });
  formData.append("upload_preset", "hpkxi2js"); // API preset name
  formData.append("file", file);
  xhr.send(formData);
}
