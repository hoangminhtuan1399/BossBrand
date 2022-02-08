//Tạo gian hàng
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const store = document.querySelector("div.store");
store.innerHTML = "";
for (const item of products) {
    if (item.category == params.category) {
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
        document.querySelector("title").innerHTML = `${item.title}`;
        document.querySelector("div>h2").innerHTML = `Bộ sưu tập ${item.title}`;
    }    
}
//Tạo danh sách mua hàng
let shoppingList = [];
const shoppingQuantity = document.querySelector("#quantity");
if (JSON.parse(localStorage.getItem("shoppingList"))) {
    shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    shoppingQuantity.innerHTML = shoppingList.length;
} else {
    shoppingQuantity.innerHTML = 0;
}
//Hiện shopping-box
function productRender(category) {
    let productRender = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].category == category) {
            productRender.push(products[i]);
        }
    }
    return productRender;
}
let vnd = Intl.NumberFormat("en-US");
const productList = document.querySelectorAll("div.product");
const shoppingBox = document.querySelector("div.shopping-box");
shoppingBox.innerHTML = "";
shoppingBox.style.display = "none";
for (let i = 0; i < productList.length; i++) {
    productList[i].addEventListener("click", function() {
        let productCategory = productRender(params.category);
        shoppingBox.style.display = "flex";
        shoppingBox.innerHTML = `
            <div class="shopping-image">
                <img src="${productCategory[i].image}">
            </div>
            <div class="shopping-info">
                <h1 style="text-align: center; font-size: 25px">${productCategory[i].name}</h1>
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
                    <span>Số lượng: </span> <input class="shopping-number" type="number" min="1">
                </div>
                <div class="shopping-price">${vnd.format(productCategory[i].price)} VND</div>
                <button class="add-to-cart">Thêm vào giỏ hàng</button>
                <button class="close-box">Xem các mẫu khác</button>
            </div>`
    //Tính tiền tại shopping-box
        const shoppingNumber = document.querySelector("input.shopping-number");
        const shoppingPrice = document.querySelector(".shopping-price");
        shoppingNumber.defaultValue = 1;
        shoppingNumber.addEventListener("change", function(){
            shoppingNumber.value != "" ? shoppingPrice.innerHTML = `${vnd.format(productCategory[i].price*parseInt(shoppingNumber.value))} VND` : shoppingPrice.innerHTML = `0 VND`;
            if (shoppingNumber.value < 0) {
                shoppingNumber.value = 0;
                shoppingPrice.innerHTML = `0 VND`;
            }   
        });
    //Chọn size
        const buttonSize = document.querySelectorAll("button.shopping-size");
        //Đặt size L làm mặc định
        buttonSize[2].classList.add("selected");            
        for (const button of buttonSize) {
            button.addEventListener("click", function(event){
                for (const button of buttonSize) {
                    button.style.backgroundColor = "whitesmoke";
                    button.classList.remove("selected");
                }
                event.target.classList.add("selected");
                event.target.style.backgroundColor = "rgb(133, 170, 250)";
            })
            if (button.classList.contains("selected")){
                button.style.backgroundColor = "rgb(133, 170, 250)";                
            }
        }
    //Đóng shopping-box
        const closeButton = document.querySelector("button.close-box");
        closeButton.addEventListener("click", function(){
            shoppingBox.style.display = "none";
        })
    //Chốt đơn
        const addButton = document.querySelector("button.add-to-cart");
        addButton.addEventListener("click",function(event){
            let size = document.querySelector("button.selected");
            let find = false;
            for (let k = 0; k < shoppingList.length; k++) {
                if (shoppingList[k].id == productCategory[i].id) {
                    if (shoppingList[k].size == size.innerText) {
                        find = true;
                        shoppingList[k].quantity += parseInt(shoppingNumber.value);
                        shoppingList[k].price = shoppingList[k].quantity*productCategory[i].price;
                    } else {
                        continue;
                    } 
                }
            }
            if (find == false) {
                shoppingList.push({
                    id : productCategory[i].id,
                    name : productCategory[i].name,
                    quantity : parseInt(shoppingNumber.value),
                    price : parseInt(shoppingNumber.value)*productCategory[i].price,
                    size : size.innerText,
                })  
            };
            localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
            shoppingQuantity.innerHTML = `${JSON.parse(localStorage.getItem("shoppingList")).length}`;
            shoppingBox.style.display = "none";
        })
    });
}




