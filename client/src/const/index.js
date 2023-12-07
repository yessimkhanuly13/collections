export {routes} from './routes'
export {itemTable, collectionTable, collectionTableOwner} from './tableColumns'


const CURRENT_USER = localStorage.getItem('currentUser')
const THEME = localStorage.getItem('theme')
const LANG = localStorage.getItem('lang');
const url = import.meta.env.VITE_URL;

export {
    CURRENT_USER,
    THEME,
    LANG,
    url
}