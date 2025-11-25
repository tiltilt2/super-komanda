// ============================================
// ИНИЦИАЛИЗАЦИЯ SWIPER ДЛЯ ГАЛЕРЕИ ТОВАРА
// ============================================

const productMainSlider = new Swiper(".product-main-slider", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoHeight: false,
});

// ============================================
// ИНИЦИАЛИЗАЦИЯ SWIPER ДЛЯ ОТЗЫВОВ
// ============================================

const reviewsSlider = new Swiper(".reviews-slider", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: '.reviews-button-next',
    prevEl: '.reviews-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// ============================================
// УПРАВЛЕНИЕ МИНИАТЮРАМИ ГАЛЕРЕИ
// ============================================

const thumbs = document.querySelectorAll(".gallery-thumbs-vertical .thumb");
const nextBtn = document.querySelector(".gallery-nav-btn-bottom.next-btn");
const prevBtn = document.querySelector(".gallery-nav-btn-bottom.prev-btn");

thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    productMainSlider.slideTo(index);
    updateThumbActive(index);
  });
});

nextBtn.addEventListener("click", () => {
  productMainSlider.slideNext();
});

prevBtn.addEventListener("click", () => {
  productMainSlider.slidePrev();
});

// Обновление активной миниатюры при смене слайда
productMainSlider.on("slideChange", () => {
  const activeIndex = productMainSlider.realIndex;
  updateThumbActive(activeIndex);
});

function updateThumbActive(index) {
  thumbs.forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add("thumb-active");
    } else {
      thumb.classList.remove("thumb-active");
    }
  });
}

// ============================================
// УПРАВЛЕНИЕ РАЗМЕРАМИ
// ============================================

const sizeButtons = document.querySelectorAll(".size-btn");
let selectedSize = "XS"; // Размер по умолчанию

sizeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    sizeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedSize = btn.dataset.size;
    updateSelectedSizeDisplay();
  });
});

// Установить первый размер как активный
if (sizeButtons.length > 0) {
  sizeButtons[0].classList.add("active");
}

function updateSelectedSizeDisplay() {
  const display = document.getElementById("selectedSizeDisplay");
  if (display) {
    display.textContent = selectedSize;
  }
}

// ============================================
// УПРАВЛЕНИЕ МОДАЛЬНЫМИ ОКНАМИ
// ============================================

const modalOverlay = document.getElementById("modalOverlay");
const modalSize = document.getElementById("modalSize");
const modalReview = document.getElementById("modalReview");
const addToCartBtn = document.getElementById("addToCartBtn");
const leaveReviewBtn = document.getElementById("leaveReviewBtn");
const closeButtons = document.querySelectorAll(".modal-close");

// Открытие модального окна выбора размера
addToCartBtn.addEventListener("click", () => {
  openModal(modalSize);
  // Обновить активный размер в модальном окне
  updateModalSizeActive();
});

// Открытие модального окна отзыва
leaveReviewBtn.addEventListener("click", () => {
  openModal(modalReview);
});

// Закрытие модальных окон
closeButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const modalId = btn.dataset.modal;
    const modal = document.getElementById(modalId);
    closeModal(modal);
  });
});

// Закрытие при клике на оверлей
modalOverlay.addEventListener("click", () => {
  closeModal(modalSize);
  closeModal(modalReview);
});

function openModal(modal) {
  modalOverlay.classList.add("active");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modalOverlay.classList.remove("active");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// ============================================
// ВЫБОР РАЗМЕРА В МОДАЛЬНОМ ОКНЕ
// ============================================

const modalSizeButtons = document.querySelectorAll(".modal-size-btn");

modalSizeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Установить активный размер
    modalSizeButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    selectedSize = btn.dataset.size;
    updateSelectedSizeDisplay();

    // Добавить в корзину и закрыть модальное окно
    setTimeout(() => {
      alert(`Товар размером ${selectedSize} добавлен в корзину!`);
      closeModal(modalSize);
    }, 200);
  });
});

// Установить первый размер как выбранный при открытии
modalSize.addEventListener("click", (e) => {
  if (e.target === modalSize) return;
});

function updateModalSizeActive() {
  modalSizeButtons.forEach((btn) => {
    if (btn.dataset.size === selectedSize) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
}

// ============================================
// ОТПРАВКА ОТЗЫВА
// ============================================

const reviewForm = document.getElementById("reviewForm");
const starRatings = document.querySelectorAll(".rating-selector .star");
let selectedRating = 0;

starRatings.forEach((star) => {
  star.addEventListener("click", () => {
    selectedRating = parseInt(star.dataset.rating);
    updateStarRatings();
  });

  star.addEventListener("mouseover", () => {
    const hoverRating = parseInt(star.dataset.rating);
    starRatings.forEach((s, index) => {
      if (index < hoverRating) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });
  });
});

function updateStarRatings() {
  starRatings.forEach((star, index) => {
    if (index < selectedRating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const reviewText = document.getElementById("reviewText").value;

  if (!selectedRating) {
    alert("Пожалуйста, выберите оценку");
    return;
  }

  if (!reviewText.trim()) {
    alert("Пожалуйста, напишите комментарий");
    return;
  }

  // Отправить отзыв (здесь может быть AJAX запрос)
  alert(
    `Отзыв отправлен!\nРазмер: ${selectedSize}\nОценка: ${selectedRating} звёзд\nКомментарий: ${reviewText}`
  );

  // Очистить форму
  reviewForm.reset();
  selectedRating = 0;
  updateStarRatings();

  // Закрыть модальное окно
  closeModal(modalReview);
});

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================

// Устанавливаем первый размер как активный при загрузке
if (sizeButtons.length > 0) {
  sizeButtons[0].click();
}
