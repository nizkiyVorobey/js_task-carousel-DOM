'use strict';

const dotList = [...document.querySelectorAll('.carousel__dot')];

const carouselFirstItem = document.querySelector('.carousel__item');
const carouselItems = [...document.querySelectorAll('.carousel__item')];

const marginBetweenSlisers
  = parseFloat(getComputedStyle(carouselFirstItem).marginRight);

function slidingPrev(eventPrev) {
  if (eventPrev.target.className.includes('carousel__btn_prev')) {
    const margin
      = parseFloat(getComputedStyle(carouselFirstItem).marginLeft)
      + parseFloat(getComputedStyle(carouselFirstItem).width)
      + marginBetweenSlisers;

    if (margin > 0) {
      return;
    }
    carouselFirstItem.style.marginLeft = margin + 'px';
    activeDot(margin);
  }
}

function slidingNext(eventNext) {
  if (eventNext.target.className.includes('carousel__btn_next')) {
    const margin
      = (parseFloat(getComputedStyle(carouselFirstItem).marginLeft)
      - parseFloat(getComputedStyle(carouselFirstItem).width)
      - marginBetweenSlisers);

    if (
      Math.abs(margin) > (carouselItems.length
      * parseFloat(getComputedStyle(carouselFirstItem).width))) {
      return;
    }
    carouselFirstItem.style.marginLeft = margin + 'px';
    activeDot(margin);
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

document.addEventListener('click', slidingPrev);
document.addEventListener('click', slidingNext);
