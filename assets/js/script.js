//Tạo gian hàng
const store = document.querySelector("div.store");
store.innerHTML = "";
for (const item of products) {
    store.innerHTML += `
    <div class="product">
        <img class="product" src="${item.image}">
        <div class="middle">
            <div class="text"><i class='bx bx-search'></i></div>
        </div>
        <span class="product-name">${item.name}</span>
        <span class="product-price">${item.money}</span>
    </div>
    `;
}
//Hiện shopping box
const productList = document.querySelectorAll("div.product");
const shoppingBox = document.querySelector("div.shopping-box");
shoppingBox.innerHTML = "";
shoppingBox.style.display = "none";
for (let i = 0; i < productList.length; i++) {
    productList[i].addEventListener("click", function() {
    shoppingBox.style.display = "flex";
    shoppingBox.innerHTML = `
        <div class="shopping-image">
            <img src="${products[i].image}">
        </div>
        <div class="shopping-info">
            <h1 style="text-align: center; font-size: 25px">${products[i].name}</h1>
            <div class="shopping-size">
                <span class="shopping-size">Chọn cỡ áo: </span>
                <span class="shopping-button">
                    <button class="shopping-size">S</button>
                    <button class="shopping-size">M</button>
                    <button class="shopping-size">L</button>
                    <button class="shopping-size">XL</button>
                    <button class="shopping-size">XXL</button>
                </span>
            </div>
            <div class="shopping-number">
                <span>Số lượng: </span> <input type="number" min="1" placeholder="1">
            </div>
            <div class="shopping-price">${products[i].money}</div>
            <button class="add-to-cart">Thêm vào giỏ hàng</button>
            <button class="close-box">Xem các mẫu khác</button>
        </div>`
    const closeButton = document.querySelector("button.close-box");
    closeButton.addEventListener("click", function(){
        shoppingBox.style.display = "none";
    })
});
}


