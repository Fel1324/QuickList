const formList = document.querySelector("#formList");
const newItemInput = document.querySelector("#newItemInput");
const shoppingList = document.querySelector("#shoppingList");
const message = document.querySelector("#alert");
const closeMessage = document.querySelector("#closeAlert");
let itemId = 1;

newItemInput.addEventListener("input", () => {
  const hasNumberRegex = /[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g;
  newItemInput.value = newItemInput.value.replace(hasNumberRegex, "");
});

formList.addEventListener("submit", (event) => {
  event.preventDefault();

  if(newItemInput.value !== ""){
    createNewItem(itemId, newItemInput.value);
    itemId += 1;

    newItemInput.value = "";
    newItemInput.focus();

  } else {
    alert("O item deve possuir um nome!");
  }
});

function createNewItem(id, inputValue){
  // CRIA ELEMENTO LI, ADICIONA CONTEÚDO, ATRIBUE CLASSE E ID.
  let newItem = document.createElement("li");
  newItem.innerHTML += `
    <div>
      <input type="checkbox" name="checkboxItem" id=${"checkboxItem" + id}>
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
}

function deleteItem(id){
  document.getElementById(id).remove();

  message.classList.add("show-alert");

  setTimeout(() => {
    message.classList.remove("show-alert");
  }, 2500);
}

closeMessage.addEventListener("click", () => {
  message.classList.remove("show-alert");
});