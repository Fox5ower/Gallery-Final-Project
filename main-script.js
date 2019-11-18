const btnCreate = document.querySelector("#btn-create");
const btnClose = document.querySelector("#close-add");
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modal-body");
const modalOverlay = document.querySelector("#modal-bg");
const btnAddGallery = document.querySelector(".sendName");
const galleryName = document.querySelector("#galleryName");

(function() {
  window.indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;

  let request = indexedDB.open("Gallery", 1);

  request.onupgradeneeded = event => {
    db = event.target.result;
    console.log(`Onupgradeneeded! Galleries: ${db}`);
    // if (!db.objectStoreNames.contains("Gallery")) {
    //   db.createObjectStore("Gallery", {
    //     src: "",
    //     keyPath: "id",
    //     autoIncrement: true
    //   });
    // }
  };
  request.onsuccess = event => {
    db = event.target.result;
    console.log(
      `Success! DB has been opened! ${JSON.stringify(db.objectStoreNames)}`
    );
  };
  request.onerror = event => {
    console.log("Error!");
  };
})();

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
    console.log(btnAddGallery.href);
  }
};
