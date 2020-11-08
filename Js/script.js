function slider(buttons, slides) {
  buttons.forEach(function (el, index) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      if (el.classList.contains("active")) return;
      buttons.forEach(function (el2) {
        el2.classList.remove("active");
      });
      slides.forEach(function (el2) {
        el2.classList.remove("active");
      });
      el.classList.add("active");
      slides[index].classList.add("active");
    });
  });
}

var sliderButtons = document.querySelectorAll(".slider-buttons a");
var slides = document.querySelectorAll(".slider-ul li");
var servicesButtons = document.querySelectorAll(".services-button");
var servicesSlides = document.querySelectorAll(".JS-services-slider li");

slider(sliderButtons, slides);
slider(servicesButtons, servicesSlides);

function modal(modal, button, buttonClose) {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.remove("close");
    modal.classList.add("active");
  });

  buttonClose.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.remove("active");
    modal.classList.add("close");
  });
}

var modalWriteUs = document.querySelector(".modal-write-us");
var modalWriteUsButton = document.querySelector(".contact-button");
var modalWriteUsButtonClose = modalWriteUs.querySelector(".modal-close");

var modalMap = document.querySelector(".modal-map");
var modalBigMap = document.querySelector(".Js-modal-big-map");
var modalBigMapClose = modalMap.querySelector(".modal-close");

modal(modalWriteUs, modalWriteUsButton, modalWriteUsButtonClose);
modal(modalMap, modalBigMap, modalBigMapClose);
