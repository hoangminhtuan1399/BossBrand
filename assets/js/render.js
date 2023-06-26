const getInnerHtml = (category, count) =>
    products
        .filter((product) => product.category === category)
        .slice(-count)
        .reverse()
        .map(
            (product) => `
                <div class="product__item" onclick="window.location.href='./detail.html?name=${product.name}'">
                    <div class="product__img">
                        <img src="${
                            product.img
                        }" alt="Avatar" class="image" />
                        <div class="middle">
                            <a href="./detail.html?name=${product.name}" class="text">
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
const mobileEl = document.querySelector('.mobile__container');
const accessoryEl = document.querySelector('.accessory__container');
const laptopEl = document.querySelector('.laptop__container');

let mobileHtml = getInnerHtml('mobile', 4);

let laptopHtml = `
    <div class="laptop__poster">
        <img src="./assets/img/laptop.jpg" alt="Avatar" class="image" />
    </div>
`;
laptopHtml += getInnerHtml('laptop', 8);

mobileEl.innerHTML = mobileHtml;
accessoryEl.innerHTML = getInnerHtml('accessory', 4);
laptopEl.innerHTML = laptopHtml;
