document.addEventListener('DOMContentLoaded', function () {
	const today = (new Date().getDay() + 6) % 7 // Смещаем день, чтобы понедельник был первым днем
	const sliderElement = document.querySelector(
		'.elementor-widget-slides .swiper'
	)

	function setSlideToToday() {
		if (sliderElement && sliderElement.swiper) {
			sliderElement.swiper.slideTo(today, 0) // Переключаем на нужный слайд
			sliderElement.closest('.elementor-widget-slides').style.opacity = '1' // Делаем слайдер видимым после переключения
		} else {
			setTimeout(setSlideToToday, 100) // Повторяем проверку, пока слайдер не будет инициализирован
		}
	}

	if (sliderElement) {
		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (
					mutation.attributeName === 'class' &&
					sliderElement.classList.contains('swiper-initialized')
				) {
					setSlideToToday()
					observer.disconnect() // Отключаем наблюдатель после выполнения функции
				}
			})
		})

		observer.observe(sliderElement, { attributes: true })
	} else {
		setSlideToToday()
	}
})
