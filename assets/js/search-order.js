const heading = document.querySelector('.content_heading');
const orderCode = document.querySelector('#order-code');
const orderBtn = document.querySelector('#order-btn');
const error = document.querySelector('.error');
const empty = document.querySelector('.empty');
const correct = document.querySelector('.correct');

const data = JSON.parse(localStorage.getItem('shoppingHis'));

const format = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND'
});

const render = (e, data) => {
    error.innerHTML = '';

    if (!orderCode.value) {
        heading.classList.add('initial');
        correct.innerHTML = '';
        empty.innerHTML = '';
        error.innerHTML = 'Vui lòng điền mã đơn cần tra cứu';
        return;
    }

    const res = data.find((el) => el.id === orderCode.value);

    if (!res) {
        heading.classList.remove('initial');
        correct.innerHTML = '';
        empty.innerHTML = `
            <p>Chúng tôi không tìm thấy đơn hàng của bạn. Mã đơn hàng không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại mã đơn hàng bạn đã nhập.</p>
            <img src="./assets/img/empty-cart.png" alt="">`;
    } else {
        heading.classList.remove('initial');
        empty.innerHTML = '';
        correct.innerHTML = `
            <div class="progress">
                <h3>trạng thái đơn hàng <span>${res.id}</span></h3>
                <div class="order-status">
                    <div class="step active">
                        <p>Đặt hàng thành công</p>
                    </div>
                    <div class="step active">
                        <p>Chuyển qua giao nhận</p>
                    </div>
                    <div class="step">
                        <p>đang giao hàng</p>
                    </div>
                    <div class="step">
                        <p>giao hàng thành công</p>
                    </div>
                </div>

                <div class="sub-status">
                    <p>Thời gian xử lý đơn hàng có thể từ 1-2 ngày làm việc. Vui lòng gọi đến hotline 0963 429 749 (trong giờ
                        hành chính) nếu bạn muốn thay đổi thông tin đơn hàng trước khi đơn hàng của bạn được CHUYỂN QUA GIAO
                        NHẬN.</p>
                    <p>Đơn hàng của bạn đã được đóng gói và chuyển cho đơn vị vận chuyển.</p>
                    <p>Thời gian giao hàng tuỳ thuộc vào địa điểm và phương thức giao hàng bạn đã chọn.</p>
                    <p>Hãy tin rắng chúng tôi luôn cố gắng để hàng đến tay bạn sớm nhất!</p>
                </div>
            </div>

            <div class="box">
                <div class="user">
                    <h3>thông tin khách hàng</h3>
                    <p>Họ tên: <span id="user-name">${
                        res.userdata.name
                    }</span></p>
                    <p>Điện thoại: <span id="user-tel">${
                        res.userdata.tel
                    }</span></p>
                    <p>Email: <span id="user-mail">${
                        res.userdata.email
                    }</span></p>
                    <p>Địa chỉ: <span id="user-address">${
                        res.userdata.address
                    }</span></p>
                    <p>Phường/xã: <span id="user-ward">${
                        res.userdata.province
                    }</span></p>
                    <p>Quận/huyện: <span id="user-district">${
                        res.userdata.district
                    }</span></p>
                    <p>Thành phố/tỉnh: <span id="user-province">${
                        res.userdata.ward
                    }</span></p>
                </div>

                <div class="delivery">
                    <h3>Thanh toán</h3>
                    <div class="delivery-row">
                        <p class="title">Tạm tính:</p>
                        <p class="price" id="temporary">${
                            res.userdata.temp_price
                        }</p>
                    </div>
                    <div class="delivery-row">
                        <p class="title">Phí vận chuyển:</p>
                        <p class="price" id="shipping">0 VND</p>
                    </div>
                    <div class="delivery-row">
                        <p class="title">Giảm giá:</p>
                        <p class="price" id="deli-price">${
                            res.userdata.discount_price
                        }</p>
                    </div>
                    <div class="total delivery-row">
                        <p class="total-title">Tổng thanh toán:</p>
                        <p class="total-price">${res.userdata.total_price}</p>
                    </div>
                    <a href="./index.html">Quay lại trang chủ</a>
                </div>
            </div>

            <div class="box">
                <h3>Chi tiết đơn hàng</h3>
                ${res.shoppingdata.map(
                    (el) => `
                    <div class="product">
                        <div class="product-wrapper">
                            <div class="product-img">
                                <img src=${el.image} alt="" style="width: 100%">
                            </div>

                            <div class="product-info">
                                <h4>${el.name}</h4>
                                <p class="product-text">Giá: <span>${format.format(
                                    el.unitPrice
                                )}</span></p>
                                <p class="product-text">Size: <span>${
                                    el.size
                                }</span></p>
                                <p class="product-text">Số lượng: <span>${
                                    el.quantity
                                }</span></p>
                            </div>
                        </div>

                        <p class="product-price">${format.format(
                            el.quantity * el.unitPrice
                        )}</p>
                    </div>
                `
                )}
            </div>
        `;
    }
};

orderCode.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) render(e, data);
});
orderBtn.addEventListener('click', (e) => render(e, data));
