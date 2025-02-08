const formList = document.querySelector("#formList");
const newItemInput = document.querySelector("#newItemInput");
const shoppingList = document.querySelector("#shoppingList");
const message = document.querySelector("#alert");
const closeMessage = document.querySelector("#closeAlert");

let list = [];
const STORAGE_KEY = "shoppingList";

let itemId = 1;
let timeoutId;

document.addEventListener("DOMContentLoaded", () => {
  const storageList = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if(storageList){
    console.log(storageList);
    
    storageList.forEach(item => {
      itemId = item.id + 1;
      createNewItem(item.id, item.name, item.checked);
    });
  }
});

formList.addEventListener("submit", (event) => {
  event.preventDefault();

  if(newItemInput.value !== ""){
    createNewItem(itemId, newItemInput.value, false);
    itemId += 1;

    newItemInput.value = "";
    newItemInput.focus();

  } else {
    alert("O item deve possuir um nome!");
  }
});

function createNewItem(id, inputValue, inputChecked){
  // CRIA ELEMENTO LI, ADICIONA CONTEÚDO, ATRIBUE CLASSE E ID.
  let newItem = document.createElement("li");
  newItem.innerHTML += `
    <div>
      <input type="checkbox" name="checkboxItem" id=${"checkboxItem" + id} ${inputChecked ? "checked" : ""}>
      <label for=${"checkboxItem" + id}>${inputValue}</label>
    </div>
  `;
  newItem.classList.add("shoppingItem");
  newItem.id = id;

  // CRIA ELEMENTO  BUTTON, ADICIONA CONTEÚDO, ATRIBUE ARIA-LABEL E FUNÇÃO DE DELETAR.
  let btnItem = document.createElement("button");
  btnItem.innerHTML += `
    <img src="./assets/icons/delete.svg" alt="">
  `;
  btnItem.setAttribute("aria-label", "Deletar item");
  btnItem.onclick = () => deleteItem(id);

  // ADICIONA BUTTON NA LI E LI NA UL.
  newItem.appendChild(btnItem);
  shoppingList.append(newItem);

  list.push({
    id,
    name: inputValue,
    checked: inputChecked,
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  const checkbox = newItem.children[0].children[0];
  checkbox.addEventListener("change", (e) => onChecked(id, e.target.checked))
}

function onChecked(id, checked){
  const idx = list.findIndex(item => item.id === id);
  list[idx].checked = checked;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function deleteItem(id){
  // VERIFICA SE EXISTE UM SETTIMEOUT, SE EXISTIR APAGA E DEPOIS INICIA OUTRO
  if(timeoutId){
    clearTimeout(timeoutId);
  }

  document.getElementById(id).remove();

  const newList = list.filter(item => item.id !== id);
  list = newList;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  message.style.display = "flex";

  timeoutId = setTimeout(() => {
    message.style.display = "none";
  }, 2500);
}

closeMessage.addEventListener("click", () => {
  message.style.display = "none";
});
