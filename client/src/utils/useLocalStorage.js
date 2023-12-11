export const useLocalStorage = () => {

    const getItem = (string) =>{
        try{
            const item = JSON.parse(window.localStorage.getItem(string))
            return item ? item : undefined
        }catch(e){
            console.log(e)
        }
    }

    const setItem = (string, value) => {
        try{
            window.localStorage.setItem(string, JSON.stringify(value));
        }catch(e){
            console.log(e)
        }
    }

    const removeItem = (string) =>{
        try{
            window.localStorage.removeItem(string)
        }catch(e){
            console.log(e)
        }
    }
    

    return {
        getItem, setItem, removeItem
    }
}