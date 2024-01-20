import supabase from "./supabase.mjs"

const authenticate = document.getElementById("authenticate")
const authenticated = document.getElementById("authenticated")
const nameInfo = authenticated.querySelector(".name")
const dropdown = authenticate.querySelector(".dropdown")

const loginAction = dropdown.querySelector(".login .submit")
const loginFields = {
	email: dropdown.querySelector(".login input[name='email']"),
	password: dropdown.querySelector(".login input[name='password']"),
	error: dropdown.querySelector(".login .err"),
	info: dropdown.querySelector(".login .info")
}

const registerAction = dropdown.querySelector(".register .submit")
const registerFields = {
	name: dropdown.querySelector(".register input[name='name']"),
	email: dropdown.querySelector(".register input[name='email']"),
	password: dropdown.querySelector(".register input[name='password']"),
	error: dropdown.querySelector(".register .err")
}

const tabLogin = authenticate.querySelector(".topbar .login")
const tabRegister = authenticate.querySelector(".topbar .register")

const logoutButton = document.getElementById("logout")

const toggleVisibility = (event, hide) => {
	if (event) event.stopPropagation()
	if (dropdown.classList.contains("hidden")) {
		if (!hide) dropdown.classList.remove("hidden")
	} else {
		dropdown.classList.add("hidden")
	}
}

export const setupAuth = async () => {
	// Проверкяем если пользователь авторизован
	const { data: { session } } = await supabase.auth.getSession()
	const user = session ? session.user : undefined
	if (user) {
		document.body.classList.add("authenticated")
		nameInfo.textContent = user.user_metadata.first_name
	}

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
		// Валидируем данные в форме

		loginFields.error.textContent = ""
		loginAction.disabled = true
        if (!loginFields.email.value) {
			loginAction.disabled = false
            loginFields.error.textContent = "Введите email"
            return
        } else if (!loginFields.password.value) {
			loginAction.disabled = false
            loginFields.error.textContent = "Введите пароль"
            return
        } else if (loginFields.password.value.length < 8) {
			loginAction.disabled = false
			loginFields.error.textContent = "Пароль должен быть не менее 8 символов"
			return
		}
		
		const { data, error } = await supabase.auth.signInWithPassword({
			email: loginFields.email.value,
			password: loginFields.password.value
		})
		if (error) {
			loginFields.error.textContent = error.message
		} else window.location.reload()
	})
	registerAction.addEventListener("click", async () => {
		// Валидируем данные в форме

		registerFields.error.textContent = ""
        registerAction.disabled = true
        if (!registerFields.name.value) {
            registerAction.disabled = false
            registerFields.error.textContent = "Введите имя"
            return
        } else if (!registerFields.email.value) {
            registerAction.disabled = false
            registerFields.error.textContent = "Введите email"
            return
        } else if (!registerFields.password.value) {
            registerAction.disabled = false
            registerFields.error.textContent = "Введите пароль"
            return
        } else if (registerFields.password.value.length < 8) {
            registerAction.disabled = false
            registerFields.error.textContent = "Пароль должен быть не менее 8 символов"
            return
        }

		const { error } = await supabase.auth.signUp(
			{
				email: registerFields.email.value,
				password: registerFields.password.value,
				options: {
					data: {
						first_name: registerFields.name.value,
					}
				}
			}
		)
		if (error) {
			registerFields.error.textContent = error.message
		} else {
			authenticate.dataset.mode = "login"
			loginFields.info.textContent = "Вам отправлено письмо подтверждения"
		}
	})
	// Выход из аккаунта
	logoutButton.addEventListener("click", async () => {
		await supabase.auth.signOut()
        window.location.reload()
    })
}