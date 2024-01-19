import supabase from "./supabase.mjs"

const authenticate = document.getElementById("authenticate")
const dropdown = authenticate.querySelector(".dropdown")

const loginAction = dropdown.querySelector(".login .submit")
const loginFields = {
	email: dropdown.querySelector(".login input[name='email']"),
	password: dropdown.querySelector(".login input[name='password']")
}

const registerAction = dropdown.querySelector(".register .submit")
const registerFields = {
	name: dropdown.querySelector(".register input[name='name']"),
	email: dropdown.querySelector(".register input[name='email']"),
	password: dropdown.querySelector(".register input[name='password']")
}

const tabLogin = authenticate.querySelector(".topbar .login")
const tabRegister = authenticate.querySelector(".topbar .register")

const toggleVisibility = (event, hide) => {
	if (event) event.stopPropagation()
	if (dropdown.classList.contains("hidden")) {
		if (!hide) dropdown.classList.remove("hidden")
	} else {
		dropdown.classList.add("hidden")
	}
}

export const setupAuth = () => {
	// Функционал окна

	authenticate.addEventListener("click", toggleVisibility)
	window.addEventListener("click", (event) => toggleVisibility(event, true))

	dropdown.addEventListener("click", (event) => {
		if (event) event.stopPropagation()
	})

	tabLogin.addEventListener("click", () => {
		authenticate.dataset.mode = "login"
	})
	tabRegister.addEventListener("click", () => {
		authenticate.dataset.mode = "register"
	})

	// Логика авторизации

	loginAction.addEventListener("click", async () => {
		const { error } = await supabase.auth.signInWithPassword({
			email: loginFields.email.value,
			password: loginFields.password.value
		})
		if (error) {

		} else window.location.reload()
	})
	registerAction.addEventListener("click", async () => {
		const { error } = await supabase.auth.signUp(
			{
				email: loginFields.email.value,
				password: loginFields.password.value,
				options: {
					data: {
						first_name: loginFields.name.value,
					}
				}
			}
		)
		if (error) {

		} else window.location.reload()
	})
}