// Danh sách giỏ hàng
const rightCol = document.querySelector('.right-col__content');
const discountWrapper = document.querySelector('.discount-wrapper');
const discountCode = document.querySelector('.discount-code');
const promotionInput = document.querySelector('.promotion-form-input');
const promotionBtn = document.querySelector('.promotion-form-button');
const discountPrice = document.querySelector("p.discount");
let shoppingList = [];
let shoppingHis = [];

if (JSON.parse(localStorage.getItem('shoppingList'))) {
    shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
}

if (JSON.parse(localStorage.getItem('shoppingHis'))) {
    shoppingHis = JSON.parse(localStorage.getItem('shoppingHis'));
}

const tamTinh = document.querySelector('p.price');
const totalPrice = document.querySelector('p.total_price');
const format = new Intl.NumberFormat('it-IT');

updateShoppingList();
updatePrice();
updateQuantity();

function updateQuantity() {
    let total = 0;
    for (let i = 0; i < shoppingList.length; i++) {
        total += shoppingList[i].quantity * shoppingList[i].unitPrice;
    }
    let total_quantity = 0;
    for (let i = 0; i < shoppingList.length; i++) {
        const item = shoppingList[i];
        total_quantity += parseInt(item.quantity);
    }
    if (total_quantity < 2) {
        discountWrapper.innerHTML = '';
    } else if (total_quantity < 5) {
        discountWrapper.innerHTML = `
        <p>Bạn đủ điều kiện sử dụng mã <span class="discount-code">mua2giam5%</span> : giảm 5% giá
        trị tổng đơn hàng</p>
        `
    } else {
        discountWrapper.innerHTML = `
        <p>Bạn đủ điều kiện sử dụng mã <span class="discount-code">mua5giam10%</span> : giảm 10% giá
        trị tổng đơn hàng</p>
        `
    }

    const discount_code = document.querySelector('.discount-code');
    discount_code.addEventListener('click', () => {
        promotionInput.value = discount_code.innerText;
    })

    discountPrice.innerHTML = `0 VND`;
    promotionBtn.addEventListener("click", function() {
        for (const item of voucher) {
            if (promotionInput.value == item.name) {
                let discountMoney = item.condition(total_quantity, total);
                discountPrice.innerHTML = `${format.format(discountMoney)} VND`;
                totalPrice.innerHTML = `${format.format(total-discountMoney)} VND`
            }          
        }
    })
}

function updateLocal() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function updatePrice() {
    let total = 0;
    for (let i = 0; i < shoppingList.length; i++) {
        total += shoppingList[i].quantity * shoppingList[i].unitPrice;
    }
    tamTinh.innerHTML = `${format.format(total)} VND`;
    totalPrice.innerHTML = `${format.format(total)} VND`;
}

function updateShoppingList() {
    rightCol.innerHTML = '';
    for (let i = 0; i < shoppingList.length; i++) {
        rightCol.innerHTML += `
            <div class="product">
                <div class="product-wrapper">
                    <div class="product_img">
                        <img src="${
                            shoppingList[i].image
                        }" alt="" style="width: 100%">
                    </div>
                    <div class="product_info">
                        <h3>${shoppingList[i].name}</h3>
                        <p class="size">Size: ${shoppingList[i].size}</p>
                        <div class="quantity-input">
                            <div class="minus">
                                <i class='bx bx-minus'></i>
                            </div>
                            <input type="number" class="number" value="${
                                shoppingList[i].quantity
                            }" name="quantity" min="0" />
                            <div class="add">
                                <i class='bx bx-plus'></i>
                            </div>
                        </div>
                    </div>
                </div>
                <span> <span class="product_price">${format.format(
                    shoppingList[i].quantity * shoppingList[i].unitPrice
                )} VND </span> <i class="material-icons" title="Xóa khỏi giỏ hàng">remove_shopping_cart</i> </span>
            </div>
        `;
    }
    
    const add = document.querySelectorAll('.add');
    const minus = document.querySelectorAll('.minus');
    const number = document.querySelectorAll('.number');
    const product_price = document.querySelectorAll('span.product_price');
    const deleteButton = document.querySelectorAll('i.material-icons');
    const product_container = document.querySelectorAll('.product');

    for (const item of shoppingList) {
        let i = shoppingList.indexOf(item);
        add[i].onclick = () => {
            number[i].value = parseInt(number[i].value) + 1;
            item.quantity = number[i].value;
            product_price[i].innerHTML = `${format.format(
                item.unitPrice * item.quantity
            )} VND`;
            updatePrice();
            updateQuantity();
            updateLocal();
        };

        minus[i].onclick = () => {
            number[i].value = parseInt(number[i].value) - 1;
            if (number[i].value < 1) {
                number[i].value = 1;
            }
            item.quantity = number[i].value;
            product_price[i].innerHTML = `${format.format(
                item.unitPrice * item.quantity
            )} VND `;
            updatePrice();
            updateQuantity();
            updateLocal();
        };

        deleteButton[i].addEventListener('click', function () {
            shoppingList.splice(i, 1);
            updateShoppingList();
            updateLocal();
            updatePrice();
            updateQuantity();
        });
    }
}

const form = document.querySelector('form.user-info');
const box = document.querySelector('.box');

box.style.display = 'none';

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let province = document.querySelector('select[name="provinces"]').value;
    let district = document.querySelector('select[name="districts"]').value;
    let ward = document.querySelector('select[name="wards"]').value;

    const provinceOpts = document.querySelectorAll(
        'select[name="provinces"] option'
    );
    const districtOpts = document.querySelectorAll(
        'select[name="districts"] option'
    );
    const wardOpts = document.querySelectorAll('select[name="wards"] option');

    province = Array.from(provinceOpts).find(
        (el) => el.value === province
    ).innerText;

    district = Array.from(districtOpts).find(
        (el) => el.value === district
    ).innerText;

    ward = Array.from(wardOpts).find((el) => el.value === ward).innerText;

    updateLocal();
    if (JSON.parse(localStorage.getItem('shoppingList')).length > 0) {
        let code = Math.random().toString(36).slice(-8);
        box.innerHTML = `
            <div class="box-title"><h2>Đặt hàng thành công!</h2></div>
            <div class="box-message"><p>Cảm ơn bạn đã ủng hộ BOSS BRAND. <br/><br/> Mã đơn hàng của bạn là: <span id='code'>${code}</span></p></div>
            <div class="box-button"><a href="index.html"><button>Quay về trang chủ</button></a></div>
        `;
        box.style.display = 'flex';
        shoppingHis.push({
            id: code,
            userdata: {
                name: document.querySelector('.user-name').value,
                tel: document.querySelector('.user-tel').value,
                email: document.querySelector('.user-mail').value,
                address: document.querySelector('.user-address').value,
                province,
                district,
                ward,
                discount_price: discountPrice.innerHTML,
                total_price: totalPrice.innerHTML,
                temp_price: tamTinh.innerHTML
            },
            shoppingdata: shoppingList
        });
        localStorage.setItem('shoppingHis', JSON.stringify(shoppingHis));
        localStorage.removeItem('shoppingList');
        console.log(shoppingHis);
        console.log(shoppingList);
    } else {
        box.innerHTML = `
            <div class="box-title"><h2>Đặt hàng thất bại!</h2></div>
            <div class="box-message"><p>Giỏ hàng của bạn đang trống, thêm vào đó ít quần áo đẹp nhé?</p></div>
            <div class="box-button"><a href="/"><button>Tiếp tục mua sắm</button></a></div>
        `;
        box.style.display = 'flex';
    }
});

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
});
