document.addEventListener("DOMContentLoaded", function () {
    const burgerIcon = document.querySelector(".burger-icon");
    const menu = document.querySelector(".menu");

    burgerIcon.addEventListener("click", function () {
        menu.classList.toggle("menu-open");
    });
    const animatedImage = document.getElementById('animatedImage');
    const icon = document.querySelector('.icon');

    animatedImage.addEventListener('animationend', () => {
        icon.style.animation = 'none';
        icon.style.left = '50%';
        icon.style.transform = 'translate(-50%, -50%)';
    });
});

const menuBtn = document.getElementById('menuBtn');
const closeMenuBtn = document.getElementById('closeMenu');
const menu  = document.getElementById('menu');
const body = document.body ;
const links = document.querySelectorAll('a'); 
const paragraphs = document.querySelectorAll('p'); 
const menuItem = document.querySelectorAll('.menu-item');

menuBtn.addEventListener('click' , () => {
    menu.classList.toggle('visible');
    menu.classList.toggle('hidden') ;
})
closeMenuBtn.addEventListener('click', () => {
    menu.classList.remove('visible');
    menu.classList.add('hidden');
});

menuItem.forEach(item => {
    item.addEventListener('click', () => {
        const color = item.getAttribute('data-color')
        const textAnimate = document.querySelector('.text-animate');
        const about = document.querySelector('.about');

        if (about) {
            about.style.setProperty('--main2-bg-color', color); 
        }
        if (textAnimate) {
            textAnimate.style.setProperty('--main2-bg-color', color); 
        }
        body.style.color = color;
        links.forEach(link => {
            link.style.color = color;
        });
        paragraphs.forEach(paragraph => {
            paragraph.style.color = color;
        });
        menu.classList.remove('visible');
        menu.classList.add('hidden');
    })
})
function startCountdown(deadline) {
    const countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        const now = new Date();
        const timeLeft = deadline - now;
        if (!countdownElement) {
            return;
        }
        if (timeLeft <= 0) {
            countdownElement.textContent = "Время истекло!";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((timeLeft % 1000) / 10);

        let message = '';
        if (days > 3) {
            message = `Осталось ${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд, ${milliseconds} миллисекунд`;
        } else if (days > 1) {
            message = `Торопитесь! Осталось всего ${days} дня, ${hours} часов, ${minutes} минут, ${seconds} секунд, ${milliseconds} миллисекунд`;
        } else {
            message = `Скоро закончится! Остался ${days} день, ${hours} часов, ${minutes} минут, ${seconds} секунд, ${milliseconds} миллисекунд`;
        }

        countdownElement.textContent = message;
    }

    const interval = setInterval(updateCountdown, 10); 
    updateCountdown();
}

const deadline = new Date();
deadline.setDate(deadline.getDate() + 5);
startCountdown(deadline);