const voucher = [
    {
        name: 'mua2giam5%',
        discount: 0.05,
        condition: function(total_quantity, tamTinh) {
            let discountMoney = 0;
            if (total_quantity >= 2) {
                discountMoney = tamTinh*this.discount;
            }
            return discountMoney;
        }
    },
    {
        name: 'mua5giam10%',
        discount: 0.1,
        condition: function(total_quantity, tamTinh) {
            let discountMoney = 0;
            if (total_quantity >= 5) {
                discountMoney = tamTinh*this.discount;
            }
            return discountMoney;
        }
    }
]