import Cookies from 'js-cookie'
import cookie from 'cookie'


export const isLoggedIn = (reqCookies = null) => {
    // if we don't have request cookies, get the cookie from client
    if (! reqCookies) {
        return !! Cookies.get('_authenticate')
    }
    // otherwise get cookie from server
    return !! cookie.parse(reqCookies)._authenticate
}
