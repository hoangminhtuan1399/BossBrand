const filterType = [
    {
        name: 'Tất cả',
        value: 'all'
    },
    {
        name: 'Dưới 3 triệu',
        value: 'under3'
    },
    {
        name: 'Từ 3 - 4 triệu',
        value: '3-4'
    },
    {
        name: 'Trên 4 triệu',
        value: 'above4'
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
    case 'under3':
        data = data.filter((product) => product.price < 3000000);
        break;
    case 'above4':
        data = data.filter((product) => product.price > 4000000);
        break;
    case '3-4':
        data = data.filter(
            (product) => product.price >= 3000000 && product.price <= 4000000
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
                    }" alt="Avatar" class="image" />
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
