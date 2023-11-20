const sortableList = document.querySelector(".sortable-list");
const items = sortableList.querySelectorAll(".item");
const theme = document.querySelector(".logo-img");
const mainBg = document.querySelector(".main-bg");
const theBody = document.querySelector("body");
const bottomText = document.querySelector(".dragging-info");

theme.addEventListener("click", () => {
  mainBg.classList.toggle("main-bg-dark");
  theBody.classList.toggle("body-dark");
  bottomText.classList.toggle("dragging-info-dark");
  theme.classList.toggle("logo-img-dark");
});

document
  .querySelector('.checkbox-and-input input[type="text"]')
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addListItem();
      this.value = "";
    }
  });

function updateCheckboxIds() {
  let items = sortableList.querySelectorAll(".item");
  items.forEach((item, index) => {
    let checkbox = item.querySelector('input[type="checkbox"]');
    checkbox.id = "checkbox" + (index + 1);
    let label = item.querySelector("label");
    label.setAttribute("for", checkbox.id);
  });
}

function updateItemsLeft() {
  let itemsLeft = document.querySelector(".items-left-number");
  let items = sortableList.querySelectorAll(".item");
  itemsLeft.innerHTML = items.length;
}

function addDragEvents(item) {
  item.addEventListener("dragstart", () => {
    setTimeout(() => item.classList.add("dragging"), 0);
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
    updateCheckboxIds();
    updateItemsLeft();
  });
  let checkbox = item.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", () => {
    let text = item.querySelector(".text");
    if (checkbox.checked) {
      text.style.textDecoration = "line-through";
    } else {
      text.style.textDecoration = "none";
    }
  });
}

items.forEach(addDragEvents);

function addListItem() {
  let inputText = document.querySelector(
    '.checkbox-and-input input[type="text"]'
  ).value;
  if (inputText !== "") {
    let ul = document.querySelector(".sortable-list");
    let li = document.createElement("li");
    li.className = "item";
    li.draggable = true;
    let id = "checkbox" + (ul.getElementsByTagName("li").length + 1);
    li.innerHTML = `
        <div class="details">
          <div class="round">
            <input type="checkbox" id="${id}" />
            <label for="${id}"></label>
          </div>
          <div class="text">${inputText}</div>
        </div>
      `;
    ul.appendChild(li);
    addDragEvents(li);
    updateItemsLeft();
  }
}

let initSortableList = (e) => {
  e.preventDefault();
  let draggingItem = document.querySelector(".dragging");
  let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];
  let nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });
  sortableList.insertBefore(draggingItem, nextSibling);
};

sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", (e) => e.preventDefault());

document.querySelector("#clear-completed").addEventListener("click", () => {
  let items = sortableList.querySelectorAll(".item");
  items.forEach((item) => {
    let checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      sortableList.removeChild(item);
    }
  });
  updateCheckboxIds();
  updateItemsLeft();
});

document.querySelector("#filter-all").addEventListener("click", () => {
  let items = sortableList.querySelectorAll(".item");
  items.forEach((item) => {
    item.style.display = "block";
  });
  document.querySelector("#filter-all").classList.add("active");
  document.querySelector("#filter-active").classList.remove("active");
  document.querySelector("#filter-completed").classList.remove("active");
});

document.querySelector("#filter-active").addEventListener("click", () => {
  let items = sortableList.querySelectorAll(".item");
  items.forEach((item) => {
    let checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  });
  document.querySelector("#filter-active").classList.add("active");
  document.querySelector("#filter-completed").classList.remove("active");
  document.querySelector("#filter-all").classList.remove("active");
});

document.querySelector("#filter-completed").addEventListener("click", () => {
  let items = sortableList.querySelectorAll(".item");
  items.forEach((item) => {
    let checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  document.querySelector("#filter-completed").classList.add("active");
  document.querySelector("#filter-active").classList.remove("active");
  document.querySelector("#filter-all").classList.remove("active");
});
