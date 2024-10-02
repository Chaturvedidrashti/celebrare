let undoStack = [];
let redoStack = [];
let currentElement = null;

function addText() {
  const editor = document.getElementById("editor");
  const text = document.getElementById("inputText").value;
  if (!text) return;

  const span = document.createElement("span");
  span.textContent = text;
  span.style.left = "20px";
  span.style.top = "20px";
  span.style.fontSize = document.getElementById("fontSize").value + "px";
  span.style.color = document.getElementById("fontColor").value;

  span.onmousedown = function (e) {
    currentElement = span;
    document.onmousemove = moveText;
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
      saveState();
    };
  };

  editor.appendChild(span);
  saveState();
  document.getElementById("inputText").value = ""; 
}

function moveText(e) {
  if (currentElement) {
    currentElement.style.left = e.pageX - 50 + "px";
    currentElement.style.top = e.pageY - 50 + "px";
  }
}

function changeFontSize() {
  if (currentElement) {
    currentElement.style.fontSize = document.getElementById("fontSize").value + "px";
    saveState();
  }
}

function changeFontColor() {
  if (currentElement) {
    currentElement.style.color = document.getElementById("fontColor").value;
    saveState();
  }
}

function saveState() {
  undoStack.push(document.getElementById("editor").innerHTML);
  redoStack = []; // Clear redo stack 
}

function undo() {
  if (undoStack.length > 1) {
    redoStack.push(undoStack.pop());
    document.getElementById("editor").innerHTML = undoStack[undoStack.length - 1];
  }
}

function redo() {
  if (redoStack.length > 0) {
    const lastRedo = redoStack.pop();
    undoStack.push(lastRedo);
    document.getElementById("editor").innerHTML = lastRedo;
  }
}