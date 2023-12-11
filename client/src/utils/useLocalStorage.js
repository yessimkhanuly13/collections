export const useLocalStorage = () => {

    const getItem = (string) =>{
        try{
            const item = JSON.parse(localStorage.getItem(string))
            return item ? JSON.parse(item) : undefined
        }catch(e){
            console.log(e)
        }
    }

    const setItem = (string, value) => {
        try{
            localStorage.setItem(string, JSON.stringify(value));
        }catch(e){
            console.log(e)
        }
    }

    const removeItem = (string) =>{
        try{
            localStorage.removeItem(string)
        }catch(e){
            console.log(e)
        }
    }
    

    return {
        getItem, setItem, removeItem
    }
}