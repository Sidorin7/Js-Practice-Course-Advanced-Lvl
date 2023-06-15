const drop = () => {
  // drag *
  // dragend *
  // dragenter - объект на dropArea
  // dragexit *
  // dragleave - объект за пределами dropArea
  // dragover - объект зависает над dropArea
  // dragstart *
  // drop - объект отправлен в dropArea

  const fileInputs = document.querySelectorAll('[name="upload"]');

  ["dragenter", "dragleave", "dragover", "drop"].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, preventDefault, false);
    });
  });

  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight(item) {
    // подсказка пользователю куда именно перетащить файл
    item.closest(".file_upload").style.border = "5px solid yellow";
    item.closest(".file_upload").style.background = "rgba(0,0,0, .7)";
  }
  function unhighlight(item) {
    item.closest(".file_upload").style.border = "none";
    if (item.closest(".calc_form")) {
        item.closest(".file_upload").style.background = "#fff";
    } else {
        item.closest(".file_upload").style.background = "#ededed";
    }
  }

  ["dragenter", , "dragover"].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, () => highlight(input), false);
    });
  });

  ["dragleave", , "drop"].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, () => unhighlight(input), false);
    });
  });

  fileInputs.forEach((input) => {
    input.addEventListener("drop", (e) => {
      input.files = e.dataTransfer.files;
      let dots; // это перменная будет содержать троеточие либо нечего
      const arr = input.files[0].name.split(".");
      arr[0].length > 6 ? (dots = "...") : (dots = "."); // разбиваем стоку на 2 части(показано на примере) если строка более 5 символов то троекточик, иначе точка
      // 'fgsgsdfgdgdsfasdfsdggsfdg.jpg' => ['fgsgsdfgdgdsfasdfsdggsfdg', 'jpg'] // пример работы метода split()
      const name = arr[0].substring(0, 6) + dots + arr[1]; // вырезаем кусок строки от 0 до 5 символа + троекточие / точка + расширение
      input.previousElementSibling.textContent = name;
    });
  });
};

export default drop;
