export {routes} from './routes'

const CURRENT_USER = JSON.parse(localStorage.getItem('currentUser'))
const THEME = localStorage.getItem('theme')
const LANG = localStorage.getItem('lang');
const url = import.meta.env.VITE_URL;

export {
    CURRENT_USER,
    THEME,
    LANG,
    url
}