(function () {
  function shuffle(arr) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  function createMainTitle(titleName = "Найди пару") {
    let title = document.createElement("h2");
    title.innerHTML = titleName;
    title.classList.add("title");
    return title;
  }

  function createInputForm() {
    let label = document.createElement("label");
    let input = document.createElement("input");
    let button = document.createElement("button");

    label.classList.add("label");
    input.classList.add("label__input");
    input.placeholder = "Укажите количество столбцов/строк";
    input.type = "number";
    input.min = "2";
    input.max = '6';
    button.classList.add("btn", "label__btn");
    button.textContent = "Поехали";

    label.append(input);
    label.append(button);

    return {
      label,
      input,
      button,
    };
  };

  function createCardsList() {
    let list = document.createElement("ul");
    list.classList.add("list");
    list.id = "game-container";
    return list;
  };

  function createAgain() {
    let button = document.createElement("button");
    button.classList.add('final-btn', 'btn');
    button.textContent = 'Начать заново';

    return button;
  }

  function createPage(container) {
    let mainTitle = createMainTitle();
    let inputForm = createInputForm();
    let cardList = createCardsList();
    let again = createAgain();

    container.append(mainTitle);
    container.append(inputForm.label);
    container.append(cardList);
    container.append(again);
  };



  class Card {
    _open = false;
    _success = false;

    constructor(containerCard, number, action) {
      this.card = document.createElement("li");
      this.card.classList.add("li-card");
      this.card.textContent = number;
      this.number = number;

      this.card.addEventListener("click", () => {
        if (this._open == false && this._success == false) {
          this.card.classList.add("open");
          this.open = true;
          action(this);
        };
      });

      containerCard.append(this.card);
    };

    set open(value) {
      this._open = value;
      value
        ? this.card.classList.add("open")
        : this.card.classList.remove("open");
    };

    get open() {
      return this._open;
    };

    set success(value) {
      this._success = value;
      value
        ? this.card.classList.add("success")
        : this.card.classList.remove("success");
    };

    get success() {
      return this._success;
    };
  };

  window.createPage = createPage;

  createPage(document.getElementById('container'));

  let countNumber = 4;

  function newGame(cardContainer, countNumber) {
    count = countNumber;
    let cardsNumberArr = [];
    cardsArr = [];
    firstCard = null;
    secondCard = null;

    for (let i = 1; i <= (count*count)/2; i++) {
      cardsNumberArr.push(i);
      cardsNumberArr.push(i);
    };

    shuffle(cardsNumberArr);

    for (const cardNumber of cardsNumberArr) {
      cardsArr.push(new Card(cardContainer, cardNumber, flip));
    };

    function flip(card) {
      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number !== secondCard.number) {
          firstCard.open = false;
          secondCard.open = false;
          firstCard = null;
          secondCard = null;
        };
      };

      if (firstCard === null) {
        firstCard = card;
      } else {
        if (secondCard === null) {
          secondCard = card;
        };
      };

      if (firstCard !== null && secondCard !== null) {
        if (firstCard.number === secondCard.number) {
          firstCard.success = true;
          secondCard.success = true;
          firstCard = null;
          secondCard = null;
        };
      };

      if (
        document.querySelectorAll(".li-card.success").length ===
        cardsNumberArr.length
      ) {
        document.querySelector('.final-btn').classList.add('active');
        document.querySelector('.final-btn').addEventListener('click', ()=> {
            container.innerHTML = '';
            cardsNumberArr = [];
            cardsArr = [];
            firstCard = null;
            secondCard = null;

            createPage(document.getElementById("container"));
            newGame(document.getElementById("game-container"), countNumber);
        })
      };
    };
  };

  document.querySelector('.label__btn').addEventListener('click', () => {
    console.log(document.querySelector('.label__input').value);
    if (document.querySelector('.label__input').value === '') {
      countNumber = 4;
      document.getElementById("game-container").innerHTML = '';
      cardsNumberArr = [];
      cardsArr = [];
      firstCard = null;
      secondCard = null;
      document.querySelector('.final-btn').classList.remove('active');
      newGame(document.getElementById("game-container"), countNumber);
    } else {
      countNumber = document.querySelector('.label__input').value;
      document.getElementById("game-container").innerHTML = '';
      cardsNumberArr = [];
      cardsArr = [];
      firstCard = null;
      secondCard = null;
      document.querySelector('.final-btn').classList.remove('active');
      newGame(document.getElementById("game-container"), countNumber);
    }
  });
})();
