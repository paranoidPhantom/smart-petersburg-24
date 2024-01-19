import { renderMeme } from "./js/renderer.mjs"
import { setupModal } from "./js/modal.mjs"
import { setupFeedback } from "./js/feedback.mjs"
import { setupAuth } from "./js/auth.mjs"
import supabase from "./js/supabase.mjs"

const renderMemes = async () => {
	const { data, error } = await supabase.from("memes").select();
	if (!error) {
		data.forEach(renderMeme)
	}
}


document.addEventListener("DOMContentLoaded", () => {
	// Запуск всяческих рендер функций
	renderMemes()
	setupModal()
	setupFeedback()
	setupAuth()
})