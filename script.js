const formList = document.querySelector("#formList");
const newItemInput = document.querySelector("#newItemInput");
const shoppingList = document.querySelector("#shoppingList");
let itemId = 1;

newItemInput.addEventListener("input", () => {
  const hasNumberRegex = /\d+/g;
  newItemInput.value = newItemInput.value.replace(hasNumberRegex, "");
});

formList.addEventListener("submit", (event) => {
  event.preventDefault();

  if(newItemInput.value !== ""){
    createNewItem(itemId, newItemInput.value);
    itemId += 1;

  } else {
    alert("O item deve possuir um nome!");
  }
});

function createNewItem(id, inputValue){
  let newItem = document.createElement("li");
  newItem.innerHTML += `
    <div>
      <input type="checkbox" name="checkboxItem" id=${"checkboxItem" + id}>
      <label for=${"checkboxItem" + id}>${inputValue}</label>
    </div>

    <button id="delete" aria-label="Deletar item">
      <img src="./assets/icons/delete.svg" alt="">
    </button>
  `;
  newItem.classList.add("shoppingItem");
  newItem.id = id;

  shoppingList.append(newItem);
}