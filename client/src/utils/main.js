export const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

export const on = (type, el, listener, all = false) => {
    const elements = select(el, all)
    if (Array.isArray(elements)) {
        elements.forEach(e => e.addEventListener(type, listener))
    } else if (elements) {
        elements.addEventListener(type, listener)
    }
}

export const getAuth = (key) => {
    const token = localStorage.getItem('access')
    if (token) {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        const decoded = JSON.parse(window.atob(base64))
        return key ? decoded[key] : decoded
    }
}

export const removeToken = (key) => {
    localStorage.clear()
}

export const is_admin = getAuth('is_admin')
export const is_manager = getAuth('is_manager')
export const is_employee = getAuth('is_employee')