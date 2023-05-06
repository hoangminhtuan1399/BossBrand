if (JSON.parse(localStorage.getItem('shoppingList'))) {
    document.querySelector('span#quantity').innerText = JSON.parse(
        localStorage.getItem('shoppingList')
    ).length;
} else {
    document.querySelector('span#quantity').innerText = 0;
}
// Slider
var slideIndex = 0;
showSlides();
var slides, dots;

function showSlides() {
    var i;
    slides = document.getElementsByClassName('mySlides');
    dots = document.getElementsByClassName('dot');
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].className += ' active';
    setTimeout(showSlides, 3000);
}

function plusSlides(position) {
    slideIndex += position;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    } else if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].className += ' active';
}

function currentSlide(index) {
    if (index > slides.length) {
        index = 1;
    } else if (index < 1) {
        index = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[index - 1].style.display = 'block';
    dots[index - 1].className += ' active';
}

const openChat = document.querySelector('.hotline-phone-ring-img-circle');
const closeChat = document.querySelector('.close i');
const chatBox = document.querySelector('.chat');
const chatIcon = document.querySelector('.hotline-phone-ring');

openChat.onclick = () => {
    chatIcon.style.display = 'none';
    chatBox.style.display = 'block';
};

closeChat.onclick = () => {
    chatIcon.style.display = 'block';
    chatBox.style.display = 'none';
};
