// var a = document.body
// var txt = document.createElement('h1')
// txt.className = 'title';
// txt.textContent = 'Hello World';
// a.appendChild(txt)
// const image1 = require('../assets/img/right-arrow.svg');

document.addEventListener("DOMContentLoaded", function(){
	
	class Model {
		
		constructor() {
			this.pages = [
				{
					title: 'Homepage',
					url: '#',
					background: '',
					content: `
									
					<div class="home">
						
					</div>
					<div class="home--about">
					<h2>Who we are</h2>
					<p>Et hanc quidem praeter oppida multa duae civitates exornant Seleucia opus Seleuci regis, et Claudiopolis quam deduxit coloniam Claudius Caesar. Isaura enim antehac nimium potens, olim subversa ut rebellatrix interneciva aegre vestigia claritudinis pristinae monstrat admodum pauca.</p>
					<button href="#test">Read our story</button>
					<hr>
					</div>

					`,
					dynamisme: () => {

						const h2 = document.querySelectorAll('h2')

						function toUpper(element) {
							element.innerText = element.innerText.toUpperCase()
						}

						h2.forEach(element => {
							toUpper(element)
						})

					
					}
				},
				{
					title: 'Contact',
					url: '#contact',
					background: 'green',
					form: true
				},
				{
					title: 'Test',
					url: '#test',
					background: 'purple',
					content: `
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nostrum quidem sequi aperiam numquam minima possimus? Atque possimus molestiae libero, voluptas quidem architecto facilis vero delectus nihil provident tempora velit.
							<ul>
								<li>lorem ipsum</li>
								<li>dolor sit</li>
								<li>amet consectetur</li>
							</ul>
						</div>
						<div class="parallax-container">
							<div class="parallax">

							</div>
						</div>
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nostrum quidem sequi aperiam numquam minima possimus? Atque possimus molestiae libero, voluptas quidem architecto facilis vero delectus nihil provident tempora velit.
							<ul>
								<li>lorem ipsum</li>
								<li>dolor sit</li>
								<li>amet consectetur</li>
							</ul>
						</div>
					`,
					dynamisme: () => {
						window.addEventListener('scroll', (e) => {
							let scrollTop = e.target.scrollingElement.scrollTop

							console.log(scrollTop)

							document.querySelector('.parallax').style.backgroundPosition = `center calc(50% - ${scrollTop / 2}px)`
						})
					}
				}
			]
		}

		getPageByUrl(url) {
			return this.pages.find(page => page.url == url)
		}

	}

	class View {

		constructor(pages) {
			this.container = document.querySelector('.container')
			this.container.innerHTML = ''
			this.addHeader(pages)
		}

		run(dynamisme) {
			dynamisme()
		}

		addContent(content) {
			const contentContainer = document.createElement('div')
			contentContainer.classList.add('content')
			contentContainer.innerHTML = content

			this.container.appendChild(contentContainer)
		}

		addHeader(pages) {
			pages.forEach((page) => {
				const button = document.createElement('button')

				button.innerText = page.title

				this.container.appendChild(button)

				button.addEventListener('click', () => {
					location.hash = page.url
				})
			})
		}

		changeTitle(text) {
			const title = document.createElement('h1')

			title.innerText = text

			this.container.appendChild(title)
		}

		changeBackground(color) {
			this.container.style.background = color
		}

		addForm() {
			let input = document.createElement('input')
			input.setAttribute('type', 'text')
			input.classList.add('input-text')

			this.container.appendChild(input)
		}

	}

	function controller() {
		let data = new Model()

		const currentPage = data.getPageByUrl(location.hash || '#')

		let page = new View(data.pages)
		page.changeTitle(currentPage.title)
		page.changeBackground(currentPage.background)

		if(currentPage.content) {
			page.addContent(currentPage.content)
		}

		if(typeof currentPage.dynamisme === 'function') {
			page.run(currentPage.dynamisme)
		}

		if(currentPage.form) {
			page.addForm()
		}
	}

	window.addEventListener('hashchange', () => {
		controller()
	})

	controller()

})