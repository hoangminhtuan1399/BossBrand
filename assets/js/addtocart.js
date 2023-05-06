const quantity = document.querySelector("input.number");
const color = document.querySelector("select#color");
const addtocart = document.querySelector("button.button-effect");
const productName = document.querySelector("h1").innerText;
const image = document.querySelector("img.image").getAttribute("src");
const modal = document.querySelector('.noti-wrapper');
const price = products.find(item => item.name === productName).price;

//Tạo danh sách giỏ hàng
let shoppingList = [];
if (JSON.parse(localStorage.getItem("shoppingList"))) {
    shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
}
//Cập nhật số lượng trong giỏ hàng
document.querySelector("span#quantity").innerText = shoppingList.length;

document.querySelector('.dot').addEventListener('click', (e) => {
    modal.style.display = 'none';
})
//Chốt đơn
addtocart.addEventListener("click", function(event){
    // alert('Sản phẩm đã được thêm vào giỏ hàng!')
    modal.style.display = 'block';
    let find = false;
    for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i].name == productName) {
            if (shoppingList[i].color == color.value) {
                find = true;
                shoppingList[i].quantity += parseInt(quantity.value);
                shoppingList[i].price = shoppingList[i].quantity*price;
            }
        }
    }
    if (find == false) {
        shoppingList.push({
            name : productName,
            color : color.value,
            unitPrice : price,
            quantity : parseInt(quantity.value),
            image : image,
        })
    }
    localStorage.setItem("shoppingList",JSON.stringify(shoppingList));
    document.querySelector("span#quantity").innerText = shoppingList.length;
    updateCartList();
})

