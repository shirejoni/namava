import React, { useState} from "react";
import PreviewItem from "../movie/PreviewItem";
import './SingleRowList.scss';


const SingleRowList = React.forwardRef(({className, data: {payloadType, payloadKey, items, key, slug}, ItemComponent, placeholder = false, preview = false, row }, ref) => {


    let [previewState, setPreviewState] = useState({
        id: undefined,
        active: false,
    });
    const togglePreview = (id) => {
        setPreviewState(oldState => {
            let newState = {...oldState};
            if(id != oldState['id']) {
                newState['id'] = id;
                newState['active'] = true;
            }else {
                newState['active'] = !oldState['active'];
            }
            return newState;
        });
    }

    const getItems = () => {
        let content = [];
        if(placeholder || (placeholder === false && items.length === 0)) {
            let count = 8;
            if(typeof placeholder === 'number') {
                count = placeholder;
            }
            for(let i = 0; i < count; i++) {
                content.push(<ItemComponent key={`single-row-item-${payloadType}-${payloadKey}-${i}`} placeholder={true}/>)
            }
        }else {
            console.log(items, items[0][key], `single-row-item-${payloadType}-${payloadKey}-${items[0][key]}`);
            content = items.map(item => (<ItemComponent className={((item[key]) === previewState['id']) && previewState['active'] ? 'active' : ''} key={`single-row-item-${payloadType}-${payloadKey}-${item[key]}-${item[slug]}`}
                                                        togglePreview={togglePreview} item={item}/>))
        }
        return content;
    }

    let canIRender = items.length > 0;
    return (
        <div ref={ref} className={`single-row col-12 p-0 ${className}`}>
            {(canIRender && ItemComponent !== undefined) && (
                <div className="list-container">
                    <div className="row">
                        {getItems()}
                    </div>
                </div>
            )}
            {(preview === true && canIRender) && (<PreviewItem id={previewState['id']} isActive={previewState['active']}/>)}
        </div>
    )
});

export default SingleRowList;
