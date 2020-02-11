'use strict';

const dotList = document.querySelectorAll('.carousel__dot');

const carouselFirstItem = document.querySelector('.carousel__item');
const carouselItems = document.querySelectorAll('.carousel__item');

const marginBetweenSliders
  = parseFloat(getComputedStyle(carouselFirstItem).marginRight);

let marginValue = 0;
let checkMarginValue = 0;

function slidingPrev(eventPrev) {
  if (eventPrev.target.className.includes('carousel__btn_prev')) {
    checkMarginValue
      = marginValue
      + parseFloat(getComputedStyle(carouselFirstItem).width)
      + marginBetweenSliders;

    if (checkMarginValue > 0) { // граница слайдера
      return false;
    }

    marginValue += parseFloat(getComputedStyle(carouselFirstItem).width)
    + marginBetweenSliders;
    // Асинхронный запуск - защита от множетсва кликов при transition
    marginSet();
  }
}

function slidingNext(eventNext) {
  if (eventNext.target.className.includes('carousel__btn_next')) {
    checkMarginValue = marginValue
      - parseFloat(getComputedStyle(carouselFirstItem).width)
      + marginBetweenSliders;

    if ( // граница слайдера
      Math.abs(checkMarginValue) > (carouselItems.length
      * parseFloat(getComputedStyle(carouselFirstItem).width))
    ) {
      return false;
    }

    marginValue -= parseFloat(getComputedStyle(carouselFirstItem).width)
      + marginBetweenSliders;
    // Асинхронный запуск - защита от множетсва кликов при transition
    marginSet();
  }
}

function activeDot(margin) {
  let activeNumber = margin
    / parseFloat(getComputedStyle(carouselFirstItem).width);

  activeNumber = Math.abs(Math.round(activeNumber));

  dotList.forEach(dot => {
    if (dot.className.includes('carousel__dot--active')) {
      dot.classList.remove('carousel__dot--active');
    }
  });

  dotList[activeNumber].classList.add('carousel__dot--active');
}

function marginSet() {
  setTimeout(() => {
    carouselFirstItem.style.marginLeft = marginValue + 'px';
    activeDot(marginValue);
  }, 0);
}

document.addEventListener('click', slidingPrev);
document.addEventListener('click', slidingNext);
