const dialog = document.querySelector("dialog")
const closeButton = dialog.querySelector(".close")

const nameLabel = dialog.querySelector(".name")
const descriptionLabel = dialog.querySelector(".description")

const exampleList = dialog.querySelector(".examples")
const rightButton = exampleList.querySelector(".right-scroll")
const leftButton = exampleList.querySelector(".left-scroll")

export const open = (data) => {
	// Загрузка данных
	const oldImages = exampleList.querySelectorAll("img")
	oldImages.forEach((img) => img.remove())
	data.examples.forEach(imgSource => {
		const img = document.createElement("img")
		img.src = imgSource
		exampleList.append(img)
	});
	setTimeout(() => {
		exampleList.scrollLeft = 0
	}, 100);

	nameLabel.innerHTML = data.name
	descriptionLabel.innerHTML = data.description
	
	// Открыть окно
	dialog.showModal()
}

export const close = () => {
	dialog.close()
}

export const setupModal = () => {
	closeButton.addEventListener("click", close)
	rightButton.addEventListener("click", () => exampleList.scrollLeft += 300)
	leftButton.addEventListener("click", () => exampleList.scrollLeft -= 300)
}