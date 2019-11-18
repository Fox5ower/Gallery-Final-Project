window.onload = () => {
  setTimeout(() => {
    let preloader = document.querySelector("#preloader");
    preloader.style.display = "none";
    readFromDb();
  }, 2000);
};
