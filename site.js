

const heroContent = document.querySelector('#hero-content')
document.addEventListener('scroll', () => {
	heroContent.style.opacity = 1 - window.scrollY / 400
	heroContent.style.transform = `translateY(-${window.scrollY / 2}px)`
})

const footerYear = document.querySelector('footer .current')
footerYear.textContent = new Date().getFullYear()

const navHeight = document.querySelector('nav').offsetHeight
const navLinks = document.querySelectorAll('nav ul a')
navLinks.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault()
		const target = document.querySelector(link.getAttribute('href'))
		const position = target.getBoundingClientRect().top + window.scrollY - navHeight
		const top = (position < 0 ? 0 : position)
		const behavior = 'smooth'
		console.log(position)
		
		window.scrollTo({ top, behavior })
	})
})
