const btnCreate = document.querySelector("#btn-create");
const btnClose = document.querySelector("#close-add");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modal-body");
const modalUpload = document.querySelector("#modalUpload");
const modalOverlay = document.querySelector("#modal-bg");
const btnAddGallery = document.querySelector(".sendName");
const galleryName = document.querySelector("#galleryName");
const box = document.querySelector("#box");
const card = document.querySelector("#card");

window.onload = function() {
  let namesArr = JSON.parse(localStorage.getItem("names")) || [];

  namesArr.forEach(el => {
    window.indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;

    let request = indexedDB.open(el, 1);
    request.onsuccess = event => {
      db = event.target.result;
      let transaction = db.transaction(el, "readwrite");
      let img = transaction.objectStore(el).get(1);
      // cоздание карточки с миниатюрой первого фото из галереи
      img.onsuccess = () => {
        // можно было бы улучшить используя hbs или jade
        let newCard = card.cloneNode(true);
        let h2 = document.createElement("h2");
        h2.innerText = el;

        newCard.style.display = "flex";
        newCard.firstChild.nextSibling.firstChild.nextSibling.src =
          img.result.src;

        let oldH2 = newCard.lastChild.previousSibling.lastChild.previousSibling;
        newCard.lastChild.previousSibling.replaceChild(h2, oldH2);

        newCard.href = `/index.html?name=${el}`;

        box.appendChild(newCard);
      };
    };
    request.onerror = event => {
      console.log("Error!");
    };
  });
};

btnClose.onclick = () => {
  modalUpload.style.display = "none";
  modalOverlay.style.display = "none";
  modalBody.style.display = "none";
};

btnCreate.onclick = () => {
  modalUpload.style.display = "block";
  modalOverlay.style.display = "block";
  modalBody.style.display = "block";
};

btnAddGallery.onclick = () => {
  if (galleryName.value != "" || galleryName.value != null) {
    btnAddGallery.href = `/index.html?name=${galleryName.value}`;

    if (localStorage.getItem("names") == null) {
      localStorage.setItem("names", JSON.stringify([]));
    }

    let namesArr = JSON.parse(localStorage.getItem("names"));

    namesArr.push(galleryName.value);

    localStorage.setItem("names", JSON.stringify(namesArr));
  }
};

// deleteGallery.onclick = () => {
//   let name = deleteGallery.parentNode.firstChild.nextSibling;
//   let request = indexedDB.deleteDatabase(name);

//   request.onsuccess = () => {
//     console.log(`Gallery ${name} has been deleted`);

//   }
// };
