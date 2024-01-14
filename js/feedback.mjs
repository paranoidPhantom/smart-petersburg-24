import supabase from "./supabase.mjs"

const feedback = document.getElementById("feedback")
const form = feedback.querySelector(".form")
const sentFrame = feedback.querySelector(".sent")

const fieldName = form.querySelector(".name")
const fieldEmail = form.querySelector(".email")
const fieldComment = form.querySelector(".comment")

const submitButton = form.querySelector(".submit")

const submit = async () => {
	if (!fieldName.value || !fieldEmail.value || !fieldComment.value) return
	form.style.display = "none"
	sentFrame.style.display = "block"
	await supabase.from("feedback").insert({
		name: fieldName.value,
		email: fieldEmail.value,
		comment: fieldComment.value
	})
}

export const setupFeedback = () => {
	submitButton.addEventListener("click", submit)
}