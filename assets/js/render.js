const getInnerHtml = (category, count) =>
    products
        .filter((product) => product.category === category)
        .slice(-count)
        .reverse()
        .map(
            (product) => `
                <div class="product__item">
                    <div class="product__img">
                        <img src="${
                            product.img
                        }" alt="Avatar" class="image" style="width: 100%" />
                        <div class="middle">
                            <a href="./detail.html?name=${product.name}" class="text" target="_blank">
                                <i class="bx bx-search"></i>
                            </a>
                        </div>
                    </div>
                    <div class="product__info">
                        <h4 class="product_name">${product.name}</h4>
                        <p class="product__price">${new Intl.NumberFormat(
                            'it-IT', {style : 'currency', currency : 'VND'}
                        ).format(product.price)}</p>
                    </div>
                </div>
            `
        )
        .join('');

// get DOM element
const tshirtEl = document.querySelector('.t-shirt__container');
const sweaterEl = document.querySelector('.Sweater__container');
const hoodieEl = document.querySelector('.hoodie__container');

let tshirtHtml = getInnerHtml('t-shirt', 3);
tshirtHtml += `
    <div class="t-shirt__poster">
        <img src="./assets/image/t-shirt.jpg" alt="Avatar" class="image" style="width: 100%" />
    </div>
`;

let hoodieHtml = `
    <div class="hoodie__poster">
        <img src="./assets/image/hoodie.jpg" alt="Avatar" class="image" style="height: 100%" />
    </div>
`;
hoodieHtml += getInnerHtml('hoodie', 8);

tshirtEl.innerHTML = tshirtHtml;
sweaterEl.innerHTML = getInnerHtml('sweater', 4);
hoodieEl.innerHTML = hoodieHtml;
