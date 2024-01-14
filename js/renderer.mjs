import { open } from "./modal.mjs"

export const renderMeme = (data) => {
	const container = document.getElementById("memes")

	const card = document.createElement("div")
	card.classList.add("meme")

	const coverImage = document.createElement("img")
	coverImage.classList.add("cover")

	const detail = document.createElement("p")
	detail.classList.add("name")

	card.append(coverImage, detail)

	coverImage.src = data.examples[0]
	detail.innerHTML = data.name
	
	card.dataset.id = data.id

	card.addEventListener("click", () => open(data))

	container.append(card)

	return card
}