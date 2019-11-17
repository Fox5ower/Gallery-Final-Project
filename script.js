const dropArea = document.querySelector("#drop-area");
const userGallery = document.querySelector("#gallery");
const modalUpload = document.querySelector("#modalUpload");
const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-bg");
const closeButton = document.querySelector("#close-button");
const closeUploadBtn = document.querySelector("#close-upload");
const loadPhotoBtn = document.querySelector(".load-photo");
const twoColsButton = document.querySelector(".twoCols");
const threeColsButton = document.querySelector(".threeCols");
const fourColsButton = document.querySelector(".fourCols");

let db;

(function() {
  window.indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  let request = indexedDB.open("Gallery", 1);

  request.onupgradeneeded = event => {
    db = event.target.result;

    if (!db.objectStoreNames.contains("Gallery")) {
      db.createObjectStore("Gallery", {
        src: "",
        keyPath: "id",
        autoIncrement: true
      });
    }
  };
  request.onsuccess = event => {
    console.log("Success! DB has been opened!");
    db = event.target.result;
  };
  request.onerror = event => {
    console.log("Error!");
  };
})();

window.onload = () => {
  setTimeout(() => {
    let preloader = document.querySelector("#preloader");
    preloader.style.display = "none";

    readFromDb();
  }, 1500);
};

//Prevent defaults для того, чтобы браузер не просто открыл перетаскиваемый файл
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

//функция добавления на страницу контейнера с фотографией (загруженной или прочитанной из бд) и иконкой
function addImage(img) {
  this.img = img;
  img.classList.add("img");
  let imageContainer = document.createElement("div");
  imageContainer.classList.add("imageContainer");
  imageContainer.appendChild(img);

  let parent = img.parentNode;
  let iconContainer = document.createElement("div");
  iconContainer.classList.add("bg");
  let icon = document.createElement("img");
  icon.classList.add("icon");
  icon.src = "./img/expand.png";

  icon.addEventListener("click", function() {
    let modalImg = img.cloneNode(true);
    modal.style.display = "block";
    modalOverlay.style.display = "block";
    modal.appendChild(modalImg);
  });

  iconContainer.appendChild(icon);
  parent.insertBefore(iconContainer, img.nextSibling);
  userGallery.appendChild(imageContainer);
}

//отображение загруженной картинки
function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = function() {
    putIntoDb(file);

    let img = document.createElement("img");
    img.src = reader.result;

    addImage(img);
  };
}

// отображение картинки взятой из бд
function readFromDb() {
  let request = indexedDB.open("Gallery", 1);
  request.onsuccess = e => {
    db = e.target.result;
    let transaction = db.transaction("Gallery", "readwrite");
    let gallery = transaction.objectStore("Gallery").getAll();
    gallery.onsuccess = function(event) {
      let galleryArr = event.target.result;

      for (let i = 0; i < galleryArr.length; i++) {
        let imgFile = galleryArr[i].src;
        console.log("Got image!");
        let img = document.createElement("img");
        img.src = imgFile;

        addImage(img);
      }
    };
  };
}

// добавление картинки в бд
function putIntoDb(file) {
  let request = indexedDB.open("Gallery", 1);
  request.onsuccess = e => {
    db = e.target.result;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      let url = reader.result;
      let transaction = db.transaction("Gallery", "readwrite");
      let gallery = transaction.objectStore("Gallery").add({ src: url });
      gallery.onsuccess = () => {
        console.log("Photo has benn succesfully added to db");
      };
      gallery.onerror = () => {
        console.log("Error with addind a photo to db");
      };
    };
  };
}

loadPhotoBtn.onclick = () => {
  modalUpload.style.display = "block";
  dropArea.style.display = "block";
};

closeButton.onclick = () => {
  let modalImage = document.querySelector(".modal-window").lastChild;
  modal.removeChild(modalImage);
  modal.style.display = "none";
  modalOverlay.style.display = "none";
};

closeUploadBtn.onclick = () => {
  modalUpload.style.display = "none";
  dropArea.style.display = "none";
};

twoColsButton.onclick = () => {
  let images = document.querySelectorAll(".img");
  for (i = 0; i < images.length; i++) {
    images[i].classList.remove("imgFourCols", "imgThreeCols");
    images[i].classList.toggle("imgTwoCols");
  }
};

threeColsButton.onclick = () => {
  let images = document.querySelectorAll(".img");
  for (i = 0; i < images.length; i++) {
    images[i].classList.remove("imgFourCols", "imgTwoCols");
    images[i].classList.toggle("imgThreeCols");
  }
};

fourColsButton.onclick = () => {
  let images = document.querySelectorAll(".img");
  for (i = 0; i < images.length; i++) {
    images[i].classList.remove("imgThreeCols", "imgTwoCols");
    images[i].classList.toggle("imgFourCols");
  }
};
