'use strict';

const dotList = [...document.querySelectorAll('.carousel__dot')];

const carouselFirstItem = document.querySelector('.carousel__item');
const carouselItems = [...document.querySelectorAll('.carousel__item')];

const marginBetweenSlisers
  = parseFloat(getComputedStyle(carouselFirstItem).marginRight);

let marginValue = 0;

function slidingPrev(eventPrev) {
  if (eventPrev.target.className.includes('carousel__btn_prev')) {
    marginValue
      += parseFloat(getComputedStyle(carouselFirstItem).width)
      + marginBetweenSlisers;

    if (marginValue > 0) { // граница слайдера
      return;
    }

    // Асинхронный запуск - защита от множетсва кликов при transition
    marginSet();
  }
}

function slidingNext(eventNext) {
  if (eventNext.target.className.includes('carousel__btn_next')) {
    marginValue
      -= parseFloat(getComputedStyle(carouselFirstItem).width)
      + marginBetweenSlisers;

    if ( // граница слайдера
      Math.abs(marginValue) > (carouselItems.length
      * parseFloat(getComputedStyle(carouselFirstItem).width))) {
      return;
    }

    // Асинхронный запуск - защита от множетсва кликов при transition
    marginSet();
  }
}

function activeDot(margin) {
  const activeNumber
    = Math.abs(Math.round(
      margin / parseFloat(getComputedStyle(carouselFirstItem).width)
    ));

  dotList.forEach(dot => {
    if (dot.className.includes('carousel__dot_active')) {
      dot.classList.remove('carousel__dot_active');
    }
  });
  dotList[activeNumber].classList.add('carousel__dot_active');
}

function marginSet() {
  setTimeout(() => {
    carouselFirstItem.style.marginLeft = marginValue + 'px';
    activeDot(marginValue);
  }, 0);
}

document.addEventListener('click', slidingPrev);
document.addEventListener('click', slidingNext);
