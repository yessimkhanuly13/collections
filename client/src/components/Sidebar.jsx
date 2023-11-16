import {Listbox, ListboxItem} from "@nextui-org/react";
import { ItemCounter } from "../wrappers/ItemCounter";
import { IconWrapper } from "../wrappers/IconWrapper";
import { LayoutIcon } from "../icons/CollectionItem";
import { useNavigate } from "react-router-dom";

function Sidebar({collections, items, tags, vision}) {
    const navigate = useNavigate();
    const {setIsCollection, setIsItems, setIsTags} = vision;
    const handleActions = (key) =>{
        if(key === "profile" ){
            navigate('/profile')
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
            navigate('/admin')
        }
    }
    


  return (
    <div className="pl-2">
        <Listbox
            aria-label="User Menu"
            onAction={(key) => handleActions(key)}
            className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
            itemClasses={{
                base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
            }}
            >
            <ListboxItem
                key="collection"
                endContent={<ItemCounter number={collections.length} />}
                startContent={
                <IconWrapper className="bg-default/50 text-foreground">
                    <LayoutIcon className="text-lg " />
                </IconWrapper>
                }
            >
                Collections
            </ListboxItem>
            <ListboxItem
                key="items"
                endContent={<ItemCounter number={items.length} />}
                startContent={
                <IconWrapper className="bg-default/50 text-foreground">
                    <LayoutIcon className="text-lg " />
                </IconWrapper>
                }
            >
                Items
            </ListboxItem>
            <ListboxItem
                key="tags"
                endContent={<ItemCounter number={tags.length} />}
                startContent={
                <IconWrapper className="bg-default/50 text-foreground">
                    <LayoutIcon className="text-lg " />
                </IconWrapper>
                }
            >
                Tags
            </ListboxItem>
            {JSON.parse(localStorage.getItem('currentUser')) && <ListboxItem
                key="profile"
                endContent={<ItemCounter/>}
                startContent={
                <IconWrapper className="bg-default/50 text-foreground">
                    <LayoutIcon className="text-lg " />
                </IconWrapper>
                }
            >
                Profile
            </ListboxItem>}
            {JSON.parse(localStorage.getItem('currentUser')) && JSON.parse(localStorage.getItem('currentUser')).roles.includes('admin') && <ListboxItem
                key="admin"
                endContent={<ItemCounter/>}
                startContent={
                <IconWrapper className="bg-default/50 text-foreground">
                    <LayoutIcon className="text-lg " />
                </IconWrapper>
                }
            >
                Admin Panel
            </ListboxItem>}
            
        </Listbox>
    </div>
  )
}

export default Sidebar