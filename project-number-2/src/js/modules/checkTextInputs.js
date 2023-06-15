const checkTextInputs = (selector) => {
  const txtInputs = document.querySelectorAll(selector);

  txtInputs.forEach(input => {
    input.addEventListener("keypress", function (e) {
      if (e.key.match(/[^а-яё 0-9]/ig)) {
        // проверяем если пользователь вводит русские символы и цифры от 0-9
        e.preventDefault();
      }
    });
  });
};

export default checkTextInputs;
