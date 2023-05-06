if (JSON.parse(localStorage.getItem('shoppingList'))) {
    document.querySelector('span#quantity').innerText = JSON.parse(
        localStorage.getItem('shoppingList')
    ).length;
} else {
    document.querySelector('span#quantity').innerText = 0;
}
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const detailEl = document.querySelector('.product_container');
const titleEl = document.querySelector('title');

let detailHtml = '';
let titleHtml = '';

for (const item of products) {
    if (params.name === item.name) {
        detailHtml = `
            <div class="product_img">
            <img src="${item.img}" alt="" class="image" style="width: 100%">
            </div>
    
            <div class="product_info">
            <h1>${item.name}</h1>
            <div class="status">
                <p class="cate">Thể loại: <a href="product.html?category=${
                    item.category
                }">${
            item.category.charAt(0).toUpperCase() + item.category.slice(1)
        }</a></p>
                <p class="line">|</p>
                <p class="stt">Tình trạng: <span>Còn hàng</span></p>
            </div>
            <h2>${new Intl.NumberFormat('it-IT', {
                style: 'currency',
                currency: 'VND'
            }).format(item.price)}</h2>
            <form action="" class="order">
                <div class="product_quan">
                    <label for="quantity">Số lượng:</label>
                    <div class="quantity-input">
                        <div class="minus">
                            <i class='bx bx-minus'></i>
                        </div>
                        <input type="number" class="number" value="1" name="quantity" min="1"/>
                        <div class="add">
                            <i class='bx bx-plus'></i>
                        </div>
                    </div>
                </div>
                <div class="product_color">
                    <label for="color">Màu:</label>
                    <select name="color" id="color">
                        <option value="Đen">Đen</option>
                        <option value="Trắng">Trắng</option>
                        <option value="Vàng">Vàng</option>
                        <option value="Xanh">Xanh</option>
                        <option value="Đỏ">Đỏ</option>
                    </select>
                </div>
                <button class="button-effect" type="button">Thêm vào giỏ hàng <i class='bx bx-right-arrow-alt'></i></button>
            </form>
            </div>
        `;

        titleHtml = `${item.name}`;
    }
}

detailEl.innerHTML = detailHtml;
titleEl.innerHTML = titleHtml;

let add = document.querySelector('.add'),
    minus = document.querySelector('.minus'),
    number = document.querySelector('.number');

add.onclick = () => {
    number.value = parseInt(number.value) + 1;
};

minus.onclick = () => {
    number.value = parseInt(number.value) - 1;
    if (number.value < 1) {
        number.value = 1;
    }
};
