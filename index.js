let keyboardKeys = [
  ['Backquote', 'ё', 'Ё','`','~'],
  ['Digit1','1','!','1','!'],
  ['Digit2','2','"','2','@'],
  ['Digit3','3','№','3','#'],
  ['Digit4','4',';','4','$'],
  ['Digit5','5','%','5','%'],
  ['Digit6','6',':','6','^'],
  ['Digit7','7','?','7','&'],
  ['Digit8','8','*','8','*'],
  ['Digit9','9','(','9','('],
  ['Digit0','0',')','0',')'],
  ['Minus','-','_','-','_'],
  ['Equal','=','+','=','+'],
  ['Backspace','Backspace','Backspace','Backspace','Backspace'],

  ['Tab','Tab','Tab','Tab','Tab'],
  ['KeyQ','й','Й','q','Q'],
  ['KeyW','ц','Ц','w','W'],
  ['KeyE','у','У','e','E'],
  ['KeyR','к','К','r','R'],
  ['KeyT','е','Е','t','T'],
  ['KeyY','н','Н','y','Y'],
  ['KeyU','г','Г','u','U'],
  ['KeyI','ш','Ш','i','I'],
  ['KeyO','щ','Щ','o','O'],
  ['KeyP','з','З','p','P'],
  ['BracketLeft','х','Х','[','{'],
  ['BracketRight','ъ','Ъ',']','}'],
  ['Delete','Del','Del','Del','Del'],

  ['CapsLock','Caps Lock','Caps Lock','Caps Lock','Caps Lock'],
  ['KeyA','ф','Ф','a','A'],
  ['KeyS','ы','Ы','s','S'],
  ['KeyD','в','В','d','D'],
  ['KeyF','а','А','f','F'],
  ['KeyG','п','П','g','G'],
  ['KeyH','р','Р','h','H'],
  ['KeyJ','о','О','j','J'],
  ['KeyK','л','Л','k','K'],
  ['KeyL','д','Д','l','L'],
  ['Semicolon','ж','Ж',';',':'],
  ['Quote','э','Э','\'','\"'],
  ['Enter','Enter','Enter','Enter','Enter'],

  ['ShiftLeft','Shift','Shift','Shift','Shift'],
  ['Backslash','\\','\\','\\','\\'],
  ['KeyZ','я','Я','z','Z'],
  ['KeyX','ч','Ч','x','X'],
  ['KeyC','с','С','c','C'],
  ['KeyV','м','М','v','V'],
  ['KeyB','и','И','b','B'],
  ['KeyN','т','Т','n','N'],
  ['KeyM','ь','Ь','m','M'],
  ['Comma','б','Б',',','<'],
  ['Period','ю','Ю','.','>'],
  ['Slash','/',',','/','?'],
  ['ArrowUp','^','^','^','^'],
  ['ShiftRight','Shift','Shift','Shift','Shift'],

  ['ControlLeft','Ctrl','Ctrl','Ctrl','Ctrl'],
  ['MetaLeft','Win','Win','Win','Win'],
  ['AltLeft','Alt','Alt','Alt','Alt'],
  ['Space','','','',''],
  ['AltRight','Alt','Alt','Alt','Alt'],
  ['ControlRight','Ctrl','Ctrl','Ctrl','Ctrl'],
  ['ArrowLeft','<','<','<','<'],
  ['ArrowDown','^','^','^','^'],
  ['ArrowRight','>','>','>','>']
];

let currentKeyboardLanguage = 1; // 1: russian, 3: english - according to indexes of keyboardKeys array

if (localStorage.getItem('currentKeyboardLanguage') !== null)
  currentKeyboardLanguage = localStorage.getItem('currentKeyboardLanguage');

let counter = 0;
for (counter = keyboardKeys.length - 1; counter >= 0; counter--) {
  let div = document.createElement('div');
  div.className = "key " + keyboardKeys[counter][0];
  let innerSpan = document.createElement('span');
  innerSpan.className = "innerSpan";
  innerSpan.innerHTML = keyboardKeys[counter][currentKeyboardLanguage];
  div.innerHTML = innerSpan.outerHTML;
  document.body.prepend(div);
}

let textarea = document.createElement('textarea');
textarea.className = "textarea";
textarea.id = "textarea";
document.body.prepend(textarea);

function changeKeyboardLanguage() {
  if (currentKeyboardLanguage == 1) {
    currentKeyboardLanguage = 3;
    localStorage.setItem('currentKeyboardLanguage', currentKeyboardLanguage);
  }
  else {
    currentKeyboardLanguage = 1;
    localStorage.setItem('currentKeyboardLanguage', currentKeyboardLanguage);
  }

  counter = 0;
  let elements = document.querySelectorAll('span');
  for (let element of elements) {
    element.innerHTML = keyboardKeys[counter][currentKeyboardLanguage];
    counter++;
  }
}

function getKeyValue(keyCode) {
  counter = 0;
  for (counter = keyboardKeys.length - 1; counter >= 0; counter--) {
    if (keyCode == keyboardKeys[counter][0])
      return keyboardKeys[counter][currentKeyboardLanguage];
  }
}

document.addEventListener('keydown', 
  function(event) {
    if (event.altKey && event.shiftKey) {
      changeKeyboardLanguage();
    }
    textarea.value += getKeyValue(event.code);
    let pressedKey = document.getElementsByClassName(event.code);
    for (let element of pressedKey) {
      element.classList.add("activatedKey");
    }
    setTimeout(
      function () {
        for (let element of pressedKey) {
          element.classList.remove("activatedKey");
        }
      }, 300);
  
  }
);

document.addEventListener('click', 
  function(event) {
    let clickedKeyCode = "";
    if (event.target.className.includes("key"))
      clickedKeyCode = event.target.className.split(" ")[1];
    else if (event.target.parentElement.className.includes("key"))
      clickedKeyCode = event.target.parentElement.className.split(" ")[1];
    textarea.value += getKeyValue(clickedKeyCode);
    let clickedKey = document.getElementsByClassName(clickedKeyCode);
    for (let element of clickedKey) {
      element.classList.add("activatedKey");
    }
    setTimeout(
      function () {
        for (let element of clickedKey) {
          element.classList.remove("activatedKey");
        }
      }, 300);
  }
);