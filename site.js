
const footerYear = document.querySelector('footer .current')
footerYear.textContent = new Date().getFullYear()

const heroContent = document.querySelector('#hero-content')
document.addEventListener('scroll', () => {
	heroContent.style.opacity = 1 - window.scrollY / 400
	heroContent.style.transform = `translateY(-${window.scrollY / 2}px)`
})

const setupNavLinks = () => {
	const navHeight = document.querySelector('nav').offsetHeight
	const navLinks = document.querySelectorAll('nav a')
	navLinks.forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault()
			const target = document.querySelector(link.getAttribute('href'))
			const position = target.getBoundingClientRect().top + window.scrollY - navHeight
			const top = (position < 0 ? 0 : position)
			const behavior = 'smooth'
			console.log(position)
			
			window.scrollTo({ top, behavior })
			//target.scrollIntoView({ behavior: 'smooth' })
		})
	})
}

// generate games

const fetchGameIds = async () => {
	const response = await fetch('/data/game-list.json')
	return await response.json()
}

const fetchGameData = async id => {
	const response = await fetch(`/data/${id}.json`)
	return await response.json()
}

const generateGameElement = async id => {
	const gameData = await fetchGameData(id)

	const {title, imageUrl, description} = gameData

	const gameElement = document.createElement('div')
	gameElement.classList.add('game')

	const imageElement = document.createElement('img')
	imageElement.src = `/images/games/${imageUrl}`
	imageElement.alt = title
	gameElement.appendChild(imageElement)

	const titleElement = document.createElement('h2')
	titleElement.textContent = title
	gameElement.appendChild(titleElement)

	const descriptionElement = document.createElement('p')
	descriptionElement.textContent = description
	gameElement.appendChild(descriptionElement)

	return gameElement
}


(async () => {
	const gameIds = await fetchGameIds()
	const promises = gameIds.map(id => generateGameElement(id))
	const gameElements = await Promise.all(promises)
	const gamesElement = document.querySelector('#games')
	gameElements.forEach(element => gamesElement.appendChild(element))

	setupNavLinks()	
})()