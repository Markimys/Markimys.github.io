window.addEventListener("load", (event) => {
  var formRange = document.querySelector(".form-range-gray");
  var greenLine = document.querySelector(".form-range-green");
  var formButtonMin = document.querySelector(".form-button-min");
  var formButtonMax = document.querySelector(".form-button-max");
  var formInputMin = document.querySelector("input[name='min-price']");
  var formInputMax = document.querySelector("input[name='max-price']");

  var mouse_x = 0;
  var leftWidth = 0;

  var formRangeWidth = formRange.offsetWidth;

  formButtonMin.addEventListener("mousedown", function (e) {
    e.preventDefault();

    mouse_x = e.clientX;
    if (formButtonMin.style.left == "") {
      leftWidth = 0;
    } else {
      leftWidth = parseInt(formButtonMin.style.left, 10);
    }
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  });

  function mouseMoveHandler(e) {
    var x = leftWidth + e.clientX - mouse_x;
    if (x < 0) {
      x = 0;
    }
    if (x > formRangeWidth) {
      x = formRangeWidth;
    }
    if (x > formButtonMax.offsetLeft - 10) {
      x = formButtonMax.offsetLeft - 10;
    }
    formButtonMin.style.left = parseInt(x, 10) + "px";
    greenLine.style.left = parseInt(x, 10) + "px";
    greenLine.style.width = formButtonMax.offsetLeft - x + "px";
    formInputMin.value = Math.floor(
      (x / formRangeWidth) * (formInputMax.max - formInputMin.min)
    );
  }

  function mouseUpHandler(e) {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  }

  formButtonMax.addEventListener("mousedown", function (e) {
    e.preventDefault();

    mouse_x = e.clientX;
    leftWidth = formButtonMax.offsetLeft;

    document.addEventListener("mousemove", mouseMoveHandler2);
    document.addEventListener("mouseup", mouseUpHandler2);
  });

  function mouseMoveHandler2(e) {
    var x = leftWidth + e.clientX - mouse_x + 10;

    if (x < 0) {
      x = 0;
    }
    if (x > formRangeWidth) {
      x = formRangeWidth;
    }
    if (x < formButtonMin.offsetLeft + 30) {
      x = formButtonMin.offsetLeft + 30;
    }
    formButtonMax.style.left = parseInt(x, 10) + "px";
    greenLine.style.width = x - formButtonMin.offsetLeft + "px";
    formInputMax.value = Math.floor(
      (x / formRangeWidth) * (formInputMax.max - formInputMin.min)
    );
  }

  function mouseUpHandler2(e) {
    document.removeEventListener("mousemove", mouseMoveHandler2);
    document.removeEventListener("mouseup", mouseUpHandler2);
  }

  formInputMin.addEventListener("input", function (e) {
    e.preventDefault();
    if (+formInputMin.value > +formInputMin.max) {
      formInputMin.value = formInputMin.max;
    }
    if (+formInputMin.value < +formInputMin.min) {
      formInputMin.value = formInputMin.min;
    }
    if (+formInputMin.value > +formInputMax.value) {
      formInputMin.value = +formInputMax.value - 1 + "";
    }

    var x =
      (formInputMin.value / (formInputMax.max - formInputMin.min)) *
      formRangeWidth;

    formButtonMin.style.left = x + "px";
    greenLine.style.left = formButtonMin.style.left;
    if (formButtonMax.offsetLeft - x < 0) {
      greenLine.style.width = 0 + "px";
    } else greenLine.style.width = formButtonMax.offsetLeft - x + "px";
  });

  formInputMax.addEventListener("input", function (e) {
    e.preventDefault();
    if (+formInputMax.value > +formInputMax.max) {
      formInputMax.value = formInputMax.max;
    }
    if (+formInputMax.value < +formInputMax.min) {
      formInputMax.value = formInputMax.min;
    }
    if (+formInputMax.value < +formInputMin.value) {
      formInputMax.value = +formInputMin.value + 1 + "";
    }
    var x =
      (formInputMax.value / (formInputMax.max - formInputMin.min)) *
      formRangeWidth;
    formButtonMax.style.left = x + "px";
    if (x - formButtonMax.offsetLeft < 0) {
      greenLine.style.width = 0 + "px";
    } else greenLine.style.width = x - formButtonMin.offsetLeft + "px";
  });

  formRange.addEventListener("click", function (e) {
    if (e.target == formButtonMin || e.target == formButtonMax) return;
    var x = formRange.getBoundingClientRect();
    x = e.clientX - parseInt(x.left, 10);
    if (
      Math.abs(x - formButtonMin.offsetLeft) <
      Math.abs(x - formButtonMax.offsetLeft)
    ) {
      formButtonMin.style.left = x + "px";
      greenLine.style.left = formButtonMin.style.left;
      greenLine.style.width = formButtonMax.offsetLeft - x + "px";
      formInputMin.value = Math.floor(
        (x / formRangeWidth) * (formInputMax.max - formInputMin.min)
      );
    } else {
      formButtonMax.style.left = x + "px";
      greenLine.style.width = x - formButtonMin.offsetLeft + "px";
      formInputMax.value = Math.floor(
        (x / formRangeWidth) * (formInputMax.max - formInputMin.min)
      );
    }
  });

  function sortItens(buttons, catalogItems, index) {
    if (buttons[index].classList.contains("active")) return;
    if (index == 0) {
      buttons[1].classList.remove("active");
      buttons[0].classList.add("active");
    } else {
      buttons[0].classList.remove("active");
      buttons[1].classList.add("active");
    }

    var x = Array.from(catalogItems); // создание массива из элементов списка

    x.sort(function (b, a) {
      var aPrice = a.querySelector(".price");
      var bPrice = b.querySelector(".price");
      aPrice = aPrice.textContent; // берем текст контент из блока с классом price
      aPrice = aPrice.replace(" ", ""); // пробелы меняются на ничего (удаление проблеов)
      aPrice = aPrice.replace("руб.", ""); // убрали руб.
      aPrice = +aPrice; // конвертировали строку в числовое значение

      bPrice = +bPrice.textContent.replace(" ", "").replace("руб.", ""); // сделано тоже самое для bPrice
      if (index == 0) {
        return aPrice - bPrice; // функция возвращает разность для сортировки //
      } else return bPrice - aPrice;
    });

    var catalogItemsUL = document.querySelector(".catalog-items");

    catalogItemsUL.innerHTML = ""; // очистили список товаров
    for (var i = 0; i < x.length; i++) {
      catalogItemsUL.appendChild(x[i]); // добавляется элемент цикла массива x
    }
  }
  var sortButtons = document.querySelectorAll(".sort-direction a");
  var catalogItems = document.querySelectorAll(".catalog-items li");
  
  sortButtons[0].addEventListener("click", function (e) {
    e.preventDefault();
    sortItens(sortButtons, catalogItems, 0);
  });
  sortButtons[1].addEventListener("click", function (e) {
    e.preventDefault();
    sortItens(sortButtons, catalogItems, 1);
  });
});
