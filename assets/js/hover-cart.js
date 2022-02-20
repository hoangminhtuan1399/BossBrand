const cart = document.querySelector("li.cart");
const subcart_list = document.querySelector("ul.subcart");
const cart_quantity = document.querySelector("span#quantity");
let shopping_list = [];
function updateLocal() {
    localStorage.setItem("shoppingList", JSON.stringify(shopping_list));
}
function updateCartList() {
    if (JSON.parse(localStorage.getItem("shoppingList"))) {
        shopping_list = JSON.parse(localStorage.getItem("shoppingList"));
        subcart_list.innerHTML = "";
        for (let i = 0; i < shopping_list.length; i++) {
            const item = shopping_list[i];
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
        for (let i = 0; i < shopping_list.length; i++) {
            const item = shopping_list[i];
            delete_button[i].addEventListener("click", function() {
                shopping_list.splice(i,1);
                cart_quantity.innerHTML = shopping_list.length;
                updateLocal();
                updateCartList();
            })
        }  
    } 
    if (shopping_list.length == 0) {
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