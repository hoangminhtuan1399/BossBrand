const heading = document.querySelector('.content_heading')
const orderCode = document.querySelector('#order-code')
const orderBtn = document.querySelector('#order-btn')
const error = document.querySelector('.error')
const empty = document.querySelector('.empty')
const correct = document.querySelector('.correct')

orderCode.addEventListener('keyup', (e) => {
    error.innerHTML = '';
    if (e.keyCode === 13) {
        e.preventDefault();
        orderBtn.click();
        if (!orderCode.value) {
            heading.classList.add("initial");
            correct.innerHTML = '';
            empty.innerHTML = '';
            error.innerHTML = 'Vui lòng điền mã đơn cần tra cứu'
        }

        if (orderCode.value == 1) {
            heading.classList.remove("initial");
            correct.innerHTML = '';
            empty.innerHTML = `
            <p>Chúng tôi không tìm thấy đơn hàng của bạn. Mã đơn hàng không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại mã đơn hàng bạn đã nhập.</p>
            <img src="./assets/img/empty-cart.png" alt="">`
        }

        else {
            heading.classList.remove("initial");
            empty.innerHTML = '';
            correct.innerHTML = `
            <div class="progress">
                        <h3>trạng thái đơn hàng <span>abcxyz</span></h3>
                        <div class="order-status">
                            <div class="step active"><p>Đặt hàng thành công</p></div>
                            <div class="step active"><p>Chuyển qua giao nhận</p></div>
                            <div class="step"><p>đang giao hàng</p></div>
                            <div class="step"><p>giao hàng thành công</p></div>
                        </div>
    
                        <div class="sub-status">
                            <p>Thời gian xử lý đơn hàng có thể từ 1-2 ngày làm việc. Vui lòng gọi đến hotline 0963 429 749 (trong giờ hành chính) nếu bạn muốn thay đổi thông tin đơn hàng trước khi đơn hàng của bạn được CHUYỂN QUA GIAO NHẬN.</p>
                            <p>Đơn hàng của bạn đã được đóng gói và chuyển cho đơn vị vận chuyển.</p>
                            <p>Thời gian giao hàng tuỳ thuộc vào địa điểm và phương thức giao hàng bạn đã chọn.</p>
                            <p>Hãy tin rắng chúng tôi luôn cố gắng để hàng đến tay bạn sớm nhất!</p>
                        </div>
                    </div>

                    <div class="box">
                        <div class="user">
                            <h3>thông tin khách hàng</h3>
                            <p>Họ tên: <span id="user-name">Nguyễn Văn A</span></p>
                            <p>Điện thoại: <span id="user-tel">0123456789</span></p>
                            <p>Email: <span id="user-mail">abc@gmail.com</span></p>
                            <p>Địa chỉ: <span id="user-address">86 Lê Trọng Tấn</span></p>
                            <p>Phường/xã: <span id="user-ward">Phường Khương Mai</span></p>
                            <p>Quận/huyện: <span id="user-district">Quận Thanh Xuân</span></p>
                            <p>Thành phố/tỉnh: <span id="user-province">Hà Nội</span></p>
                        </div>

                        <div class="delivery">
                            <h3>Thanh toán</h3>
                            <div class="delivery-row">
                                <p class="title">Tạm tính:</p>
                                <p class="price" id="temporary">0 VND</p>
                            </div>
                            <div class="delivery-row">
                                <p class="title">Phí vận chuyển:</p>
                                <p class="price" id="shipping">0 VND</p>
                            </div>
                            <div class="delivery-row">
                                <p class="title">Giảm giá:</p>
                                <p class="price" id="deli-price">0 VND</p>
                            </div>
                            <div class="total delivery-row">
                                <p class="total-title">Tổng thanh toán:</p>
                                <p class="total-price">0 VND</p>
                            </div>
                            <a href="./index.html">Quay lại trang chủ</a>
                        </div>
                    </div>

                    <div class="box">
                        <h3>Chi tiết đơn hàng</h3>
                        <div class="product">
                            <div class="product-wrapper">
                                <div class="product-img">
                                    <img src="./assets/img/sweaters/sweater6.jpg" alt="" style="width: 100%">
                                </div>
    
                                <div class="product-info">
                                    <h4>CIAO Easy Camo Sweatshirt</h4>
                                    <p class="product-text">Giá: <span>540.000 VND</span></p>
                                    <p class="product-text">Size: <span>L</span></p>
                                    <p class="product-text">Số lượng: <span>1</span></p>
                                </div>
                            </div>

                            <p class="product-price">540.000 VND</p>
                        </div>
                    </div>`
        }
    }
})
