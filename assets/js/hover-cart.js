const cart = document.querySelector("li.cart");
const subcart_list = document.querySelector("ul.subcart");
const quantity = document.querySelector("span#quantity");
let shoppingList = [];
function updateLocal() {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}
function updateCartList() {
    if (JSON.parse(localStorage.getItem("shoppingList"))) {
        shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
        subcart_list.innerHTML = "";
        for (let i = 0; i < shoppingList.length; i++) {
            const item = shoppingList[i];
            subcart_list.innerHTML += `
                <li class="subcart">
                    <div class="subcart">
                        <img src="${item.image}">
                    </div>
                    <div class="subcart">
                        <span class="subcart">${item.name} - ${item.size}</span>
                        <span class="subcart">${item.unitPrice} VND x ${item.quantity}</span>
                    </div>
                    <button id="delete-item"><b>X</b></button>
                </li>
            `
        }
        const delete_button = document.querySelectorAll("button#delete-item");
        for (let i = 0; i < shoppingList.length; i++) {
            const item = shoppingList[i];
            delete_button[i].addEventListener("click", function() {
                shoppingList.splice(i,1);
                quantity.innerHTML = shoppingList.length;
                updateLocal();
                updateCartList();
            })
        }  
    } 
    if (shoppingList.length == 0) {
        subcart_list.innerHTML += `
            <li class="empty-cart">
                Giỏ hàng của bạn đang trống
            </li>
        `
    }
}
updateCartList();
cart.addEventListener("mouseover",function(){
    subcart_list.style.display = "flex";
})
cart.addEventListener("mouseout", function(){
    subcart_list.style.display = "none";
})