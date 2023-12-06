import { useTranslation } from "react-i18next"


export const itemTable = () =>{
    const {t} = useTranslation();
    return [ t('item.topic'), t('item.desc'), t('item.created_date'), t('item.tags'), t('item.link')]
}
export const collectionTable = () => {
    const {t} = useTranslation();
    return [ t('collection.name'), t('collection.description'), t('collection.theme'), t('collection.items'), t('collection.link')]
}