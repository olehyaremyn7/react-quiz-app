import http from '../../axios/axios-quiz'
import { environment } from '../../../environments/environment'
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes'

export function auth(email, password, isLogin) {
    return async (dispatch) => {
        const user = {
            email,
            password,
            returnSecureToken: true,
        }
        let url = environment.registerURL

        if (isLogin) {
            url = environment.loginURL
        }

        try {
            const response = await http.post(url, user)

            if (response.data) {
                const { data } = response
                const expirationDate = new Date(
                    new Date().getTime() + data.expiresIn * 1000
                )
                sessionStorage.setItem('token', data.idToken)
                sessionStorage.setItem('userId', data.localId)
                sessionStorage.setItem('expirationDate', expirationDate)

                dispatch(authSuccess(data.idToken))
                dispatch(autoLogout(data.expiresIn))

                isLogin === true
                    ? alert('Sign in success!')
                    : alert('Sign up success! You can sign in!')
            } else {
                isLogin === true
                    ? alert('Login failed! Try again')
                    : alert('Sign up failed! Try again')
            }
        } catch (e) {
            isLogin === true
                ? alert('Login error! Check you data or user may not be found')
                : alert('Sign up error! Check you data and try again!')
        }
    }
}

export function logout() {
    sessionStorage.clear()
    return {
        type: AUTH_LOGOUT,
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token,
    }
}

export function autoLogout(time) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function autoLogin() {
    return (dispatch) => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(
                sessionStorage.getItem('expirationDate')
            )
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(
                    autoLogout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                )
            }
        }
    }
}
