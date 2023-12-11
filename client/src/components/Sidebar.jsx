import {Listbox, ListboxItem} from "@nextui-org/react";
import { ItemCounter, IconWrapper } from "../wrappers/index";
import { CogIcon, TagIcon, ItemIcon, ProfileIcon, LayoutIcon } from "../icons/index";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PopupContext } from "../App";
import { useTranslation } from "react-i18next";
import { routes, useLocalStorage } from '../utils/index'

function Sidebar({collections, items, tags, vision}) {
    const navigate = useNavigate();
    const {setIsCollection, setIsItems, setIsTags} = vision;

    const { getItem } = useLocalStorage()

    const {darkMode} = useContext(PopupContext)
    const {t} = useTranslation();

    const handleActions = (key) =>{
        const user = getItem('currentUser')
        if(key === "profile" ){
            navigate(`/profile/${user._id}`)
        }else if(key === "collection"){
            setIsCollection(true);
            setIsItems(false);
            setIsTags(false);
        }else if(key === "items"){
            setIsCollection(false);
            setIsItems(true);
            setIsTags(false); 
        }else if(key === "tags"){
            setIsCollection(false);
            setIsItems(false);
            setIsTags(true);
        }else if(key === "admin"){
            navigate(routes.admin)
        }
    }
    
    useEffect(()=>{
        console.log(getItem('currentUser'))
    })


  return (
    <div className="pl-2">
        <Listbox
            aria-label="User Menu"
            onAction={(key) => handleActions(key)}
            className="border rounded-xl"
            itemClasses={{
                base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
            }}
            >
            <ListboxItem
                key="collection"
                endContent={<ItemCounter number={collections.length} />}
                startContent={
                <IconWrapper className="bg-default/50 text-foreground">
                    <LayoutIcon className="text-lg " fill={`${darkMode ? "#f8fafc" : ""}`}/>
                </IconWrapper>
                }
            >
                <span className="font-bold">{t('sidebar.collections')}</span>
            </ListboxItem>
            <ListboxItem
                key="items"
                endContent={<ItemCounter number={items.length} />}
                startContent={
                <IconWrapper className="bg-default/50 text-foreground">
                    <ItemIcon className="text-lg " fill={`${darkMode ? "#f8fafc" : ""}`}/>
                </IconWrapper>
                }
            >
                <span className="font-bold">{t('sidebar.items')}</span>
            </ListboxItem>
            <ListboxItem
                key="tags"
                endContent={<ItemCounter number={tags.length} />}
                startContent={
                <IconWrapper className="bg-default/50 text-foreground">
                    <TagIcon className="text-lg " fill={`${darkMode ? "#f8fafc" : ""}`}/>
                </IconWrapper>
                }
            >
                <span className="font-bold">{t('sidebar.tags')}</span>
            </ListboxItem>
            { getItem('currentUser') && <ListboxItem
                key="profile"
                endContent={<ItemCounter/>}
                startContent={
                <IconWrapper className="bg-default/50 text-foreground">
                    <ProfileIcon className="text-lg " fill={`${darkMode ? "#f8fafc" : ""}`}/>
                </IconWrapper>
                }
            >
                <span className="font-bold">{t('sidebar.profile')}</span>
            </ListboxItem>}
            {getItem('currentUser') && getItem('currentUser').roles.includes('admin') && <ListboxItem
                key="admin"
                endContent={<ItemCounter/>}
                startContent={
                <IconWrapper className="bg-default/50 text-foreground">
                    <CogIcon className="text-lg " fill={`${darkMode ? "#f8fafc" : ""}`}/>
                </IconWrapper>
                }
            >
                <span className="font-bold">{t('sidebar.admin_panel')}</span>
            </ListboxItem>}
            
        </Listbox>
    </div>
  )
}

export default Sidebar