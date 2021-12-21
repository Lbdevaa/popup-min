const body = document.querySelector('body');
const popupLinks = document.querySelectorAll('.popup-link'); // добавить на ссылку,чтобы открыть попап
const lockPadding = document.querySelectorAll('.lock-padding'); // добавить на фиксированный объект, чтобы не дергался

// TODO button и вместо href="id popup" data-popup="id popup"

let unlock = true;

const timeout = 400; // transition указан в css

// поиск popup
if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i]
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    })
  }
}

// кнопка закрытия
const popupCloseBtn = document.querySelectorAll('.modal-close');

if (popupCloseBtn.length > 0) {
  for (let i = 0; i < popupCloseBtn.length; i++) {
    const el = popupCloseBtn[i];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.modal')); // ближайший родитель кнопки
      e.preventDefault();
    });
  }
}

// открытие
function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.modal.active');
    if (popupActive) {
      popupClose(popupActive, false); // закрыть popup при открытии нового
    } else {
      bodyLock();
    }
    currentPopup.classList.add('active');
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.modal__body > div')) {
        popupClose(e.target.closest('.modal')); // закрытие по клику на тёмную область
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('active');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

// фиксация прокрутки
function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPaddingValue.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = lockPaddingValue;
    }
  };

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout)
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

// esc
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.modal.active');
    popupClose(popupActive);
  }
})
  /*
// полифилы старые браузеры
(function() {
  if (!Element.prototype.closest) {

    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if(node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
}) ();
(function() {
  //проверка поддержки
  if (!Element.prototype.matches) {
    //определение свойства
    Element.prototype.matches = Element.prototype.matchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ;
  };
}) ();
*/