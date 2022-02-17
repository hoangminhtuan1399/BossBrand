if (JSON.parse(localStorage.getItem("shoppingList"))) {
    document.querySelector("span#quantity").innerText = JSON.parse(localStorage.getItem("shoppingList")).length;
} else {
    document.querySelector("span#quantity").innerText = 0;
}
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
            <a target="_blank" href="detail.html?name=${item.name}">
                <img class="product" src="${item.img}">
                <div class="middle">
                    <a href="detail.html?name=${item.name}" class="text" target="_blank"><i class='bx bx-search'></i></a>
                </div>
                <span class="product-name">${item.name}</span>
                <span class="product-price">${new Intl.NumberFormat(
                    'it-IT', {style : 'currency', currency : 'VND'}
                ).format(item.price)}</span>
            </a>
            </div>
        `;
        document.querySelector("title").innerHTML = `${item.title}`;
        document.querySelector("div>h2").innerHTML = `Bộ sưu tập ${item.title}`;
    }    
}