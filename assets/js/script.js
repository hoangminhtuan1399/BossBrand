const filterType = [
    {
        name: 'Tất cả',
        value: 'all'
    },
    {
        name: 'Dưới 300 nghìn',
        value: 'under300'
    },
    {
        name: 'Từ 300 - 400 nghìn',
        value: '300-400'
    },
    {
        name: 'Trên 400 nghìn',
        value: 'above400'
    }
];

const sortType = [
    {
        name: 'Giá từ thấp đến cao',
        value: 'asc'
    },
    {
        name: 'Giá từ cao đến thấp',
        value: 'desc'
    }
];

const getParams = (search) => {
    const params = search.slice(1).split('&');
    const res = {};
    params.forEach((el) => {
        const temp = el.split('=');
        res[temp[0]] = temp[1];
    });
    return res;
};

const setParams = (params) => {
    let res = '?';
    for (const key in params) {
        res += `${key}=${params[key]}&`;
    }
    return res.substring(0, res.length - 1);
};

// get cart info
if (JSON.parse(localStorage.getItem('shoppingList'))) {
    document.querySelector('span#quantity').innerText = JSON.parse(
        localStorage.getItem('shoppingList')
    ).length;
} else {
    document.querySelector('span#quantity').innerText = 0;
}

// get params use destructuring
const {
    category,
    filter = 'all',
    orderby = 'asc'
} = getParams(window.location.search);

// make filter select
const filterEl = document.getElementById('filter');
filterEl.innerHTML = filterType
    .map(
        (el) =>
            `<option value=${el.value} ${
                filter === el.value ? 'selected' : ''
            }>${el.name}</option>`
    )
    .join('');

filterEl.addEventListener('change', (e) => {
    window.location.search = setParams({
        category,
        filter: e.target.value,
        orderby
    });
});

// make sort select
const sortEl = document.getElementById('sort');
sortEl.innerHTML = sortType
    .map(
        (el) =>
            `<option value=${el.value} ${
                orderby === el.value ? 'selected' : ''
            }>${el.name}</option>`
    )
    .join('');

sortEl.addEventListener('change', (e) => {
    window.location.search = setParams({
        category,
        filter,
        orderby: e.target.value
    });
});

// filter by category
let data = products.filter((product) => product.category === category);

// filter by price
switch (filter) {
    case 'under300':
        data = data.filter((product) => product.price < 300000);
        break;
    case 'above400':
        data = data.filter((product) => product.price > 400000);
        break;
    case '300-400':
        data = data.filter(
            (product) => product.price >= 300000 && product.price <= 400000
        );
        break;

    case 'all':
    default:
        break;
}

// sort by price
if (orderby === 'asc') {
    data.sort((a, b) => a.price - b.price);
} else {
    data.sort((a, b) => b.price - a.price);
}

document.querySelector(
    '.main_heading>h2'
).innerText = `Bộ sưu tập ${data[0].title}`;

document.querySelector('title').innerText = `${data[0].title}`;

//Tạo gian hàng
document.querySelector('.store').innerHTML = data
    .map(
        (product) => `
            <div class="product__item">
                <div class="product__img">
                    <img src="${
                        product.img
                    }" alt="Avatar" class="image" style="width: 100%" />
                    <div class="middle">
                        <a href="./detail.html?name=${
                            product.name
                        }" class="text">
                            <i class="bx bx-search"></i>
                        </a>
                    </div>
                </div>
                <div class="product__info">
                    <h4 class="product_name">${product.name}</h4>
                    <p class="product__price">${new Intl.NumberFormat('it-IT', {
                        style: 'currency',
                        currency: 'VND'
                    }).format(product.price)}</p>
                </div>
            </div>
        `
    )
    .join('');
