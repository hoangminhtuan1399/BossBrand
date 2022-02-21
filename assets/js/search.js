const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-list');

searchInput.addEventListener('input', (e) => {
    const search = e.target.value.replace(/\s+/g, ' ').trim().toLowerCase(); // Loại bỏ những khoảng trống thừa khi người dùng nhập
    if (search) {
        const res = products.filter((product) =>
            product.name.toLowerCase().includes(search) // Lọc ra những kết quả True từ file data
        );
        searchResults.style.display = 'block';
        if (!res[0]) {
            searchResults.innerHTML = `
                <li class="search-no-result">
                    <i>Không tìm thấy sản phẩm</i>
                </li>
            `;
        }

        else {
            searchResults.innerHTML = res
                .map(
                    (product) => `
                    <li class="search-item">
                        <a href="detail.html?name=${
                            product.name
                        }">
                            <div class="search-item__img">
                                <img src="${
                                    product.img
                                }" alt="" style="width: 100%;">
                            </div>
                            <div class="search-item__text">
                                <p class="item-name">${product.name}</p>
                                <p class="item-price">${new Intl.NumberFormat(
                                    'it-IT',
                                    { style: 'currency', currency: 'VND' }
                                ).format(product.price)}</p>
                            </div>
                        </a>
                    </li>
                `
                )
                .join('');
            }

    } 
    
    else {
        searchResults.style.display = 'none';
    }
});

searchInput.addEventListener('focus', (e) => {
    if (e.target.value.replace(/\s+/g, ' ').trim())
        searchResults.style.display = 'block';
});

window.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && !searchInput.contains(e.target))
        searchResults.style.display = 'none';
});
