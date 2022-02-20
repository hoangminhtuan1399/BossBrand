const quantity = document.querySelector("input.number");
const price = document.querySelector("h2");
const size = document.querySelector("select#size");
const addtocart = document.querySelector("button.button-effect");
const productName = document.querySelector("h1").innerText;
const image = document.querySelector("img.image").getAttribute("src");
//test
// console.log(typeof(image));
//Tạo danh sách giỏ hàng
let shoppingList = [];
if (JSON.parse(localStorage.getItem("shoppingList"))) {
    shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
}
//Cập nhật số lượng trong giỏ hàng
document.querySelector("span#quantity").innerText = shoppingList.length;
//Chốt đơn
addtocart.addEventListener("click", function(event){
    let find = false;
    for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i].name == productName) {
            if (shoppingList[i].size == size.value) {
                find = true;
                shoppingList[i].quantity += parseInt(quantity.value);
                shoppingList[i].price = shoppingList[i].quantity*parseInt(price.innerHTML.substr(0,7))*1000;
            }
        }
    }
    if (find == false) {
        shoppingList.push({
            name : productName,
            size : size.value,
            unitPrice : parseInt(price.innerHTML.substring(0,3))*1000,            
            quantity : parseInt(quantity.value),
            image : image,
        })
    }
    localStorage.setItem("shoppingList",JSON.stringify(shoppingList));
    document.querySelector("span#quantity").innerText = shoppingList.length;
    updateCartList();
})

