import { environment } from './environment'

export const environmentProd = {
    production: true,
    BASEURL: environment.BASEURL,
    loginURL: environment.loginURL,
    registerURL: environment.registerURL,
}
