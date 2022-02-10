const apiUrl = 'https://provinces.open-api.vn/api';

const add = document.querySelector('.add');
const minus = document.querySelector('.minus');
const number = document.querySelector('.number');

add.onclick = () => {
    number.value = parseInt(number.value) + 1;
    if (number.value > 4) {
        number.value = 1;
    }
};

minus.onclick = () => {
    number.value = parseInt(number.value) - 1;
    if (number.value < 0) {
        number.value = 4;
    }
};

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

