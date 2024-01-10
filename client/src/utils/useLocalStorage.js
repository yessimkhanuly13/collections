export const useLocalStorage = () => {

    const getItem = (string) =>{
        try{
            if(string === 'currentUser'){
                const user = localStorage.getItem(string)
                return user ? JSON.parse(user) : undefined
            }else{
                const item = localStorage.getItem(string);
                return item ? item : undefined
            }
        }catch(e){
            console.log(e)
        }
    }

    const setItem = (string, value) => {
        try{
            localStorage.setItem(string, value);
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