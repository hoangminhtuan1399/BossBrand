// Danh sách giỏ hàng
const rightCol = document.querySelector(".right-col__content");
const discountWrapper = document.querySelector('.discount-wrapper');
const discountCode = document.querySelector('.discount-code');
const promotionInput = document.querySelector('.promotion-form-input');
const promotionBtn = document.querySelector('.promotion-form-button');
let shoppingList = [];

if (JSON.parse(localStorage.getItem("shoppingList"))) {
    shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
}

const tamTinh = document.querySelector("p.price");
const totalPrice = document.querySelector("p.total_price");
const format = new Intl.NumberFormat("it-IT");
updateShoppingList();
updatePrice();
function updateLocal () {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}
function updatePrice() {
    let total = 0;
    for (let i = 0; i < shoppingList.length; i++) {
        total += shoppingList[i].quantity*shoppingList[i].unitPrice;
    }
    tamTinh.innerHTML = `${format.format(total)} VND`;
    totalPrice.innerHTML = `${format.format(total)} VND`;
}
function updateShoppingList() {
    rightCol.innerHTML = "";
    for (let i = 0; i < shoppingList.length; i++) {
        rightCol.innerHTML += `
        <div class="product">
            <div class="product-wrapper">
                <div class="product_img">
                    <img src="${shoppingList[i].image}" alt="" style="width: 100%">
                </div>
                <div class="product_info">
                    <h3>${shoppingList[i].name}</h3>
                    <p class="size">Size: ${shoppingList[i].size}</p>
                    <div class="quantity-input">
                        <div class="minus">
                            <i class='bx bx-minus'></i>
                        </div>
                        <input type="number" class="number" value="${shoppingList[i].quantity}" name="quantity" min="0" />
                        <div class="add">
                            <i class='bx bx-plus'></i>
                        </div>
                    </div>
                </div>
            </div>
            <span> <span class="product_price">${format.format(shoppingList[i].quantity*shoppingList[i].unitPrice)} VND </span> <i class="material-icons" title="Xóa khỏi giỏ hàng">remove_shopping_cart</i> </span>
        </div>`;
    }
    const add = document.querySelectorAll('.add');
    const minus = document.querySelectorAll('.minus');
    const number = document.querySelectorAll('.number');
    const product_price = document.querySelectorAll("span.product_price");
    const deleteButton = document.querySelectorAll("i.material-icons");
    const product_container = document.querySelectorAll(".product");
    for (const item of shoppingList) {
        let i = shoppingList.indexOf(item);
        add[i].onclick = () => {
            number[i].value = parseInt(number[i].value) + 1; 
            item.quantity = number[i].value;
            product_price[i].innerHTML = `${format.format(item.unitPrice*item.quantity)} VND`; 
            updatePrice();
            updateLocal();
        };
        
        minus[i].onclick = () => {
            number[i].value = parseInt(number[i].value) - 1;
            if (number[i].value < 1) {
                number[i].value = 1;
            }
            item.quantity = number[i].value;
            product_price[i].innerHTML = `${format.format(item.unitPrice*item.quantity)} VND `; 
            updatePrice();
            updateLocal();
        };
    
        deleteButton[i].addEventListener("click", function(){
            shoppingList.splice(i,1);
            updateShoppingList();
            updateLocal();
            updatePrice();
        })
    }
}

const form = document.querySelector("form.user-info");
const box = document.querySelector(".box");
box.style.display = "none";
form.addEventListener("submit",function(event){
    updateLocal();   
    if(JSON.parse(localStorage.getItem("shoppingList")).length > 0) {
        let code = Math.random().toString(36).slice(-8);
        box.innerHTML = `
            <div class="box-title"><h2>Đặt hàng thành công!</h2></div>
            <div class="box-message"><p>Cảm ơn bạn đã ủng hộ BOSS BRAND. <br/><br/> Mã đơn hàng của bạn là: <span id='code'>${code}</span></p></div>
            <div class="box-button"><a href="index.html"><button>Quay về trang chủ</button></a></div>
        `;
        box.style.display = "flex";
        localStorage.clear();
    } else {
        box.innerHTML = `
            <div class="box-title"><h2>Đặt hàng thất bại!</h2></div>
            <div class="box-message"><p>Giỏ hàng của bạn đang trống, thêm vào đó ít quần áo đẹp nhé?</p></div>
            <div class="box-button"><a href="product.html?category=t-shirt"><button>Tiếp tục mua sắm</button></a></div>
        `;
        box.style.display = "flex";
    }
    event.preventDefault();
});


const apiUrl = 'https://provinces.open-api.vn/api';





const localPicker = new LocalPicker({
    province: 'provinces',
    district: 'districts',
    ward: 'wards'
});

const shop = document.querySelector('.shop-wrapper');

document.querySelector('[name="provinces"]').addEventListener('change', (e) => {
    if (e.target.value === '1') {
        shop.style.display = 'block';
    } else {
        shop.style.display = 'none';
    }
})


