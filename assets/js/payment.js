let add = document.querySelector(".add"),
    minus = document.querySelector(".minus"),
    number = document.querySelector(".number")

add.onclick = () => {
    number.value = parseInt(number.value) + 1
    if(number.value > 4) {
        number.value = 1
    }
    
}

minus.onclick = () => {
    number.value = parseInt(number.value) - 1
    if(number.value < 0) {
        number.value = 4
    }
}