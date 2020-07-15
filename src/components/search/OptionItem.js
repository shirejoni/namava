import React from "react";

const getOptionItemIcon = (checked, type = 'checkbox') => {

    switch (type) {
        case "checkbox":
            return checked !== true ? (
                <svg data-testid="checkbox-unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"
                     preserveAspectRatio="xMidYMid slice"
                     style={{width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)"}}>
                    <defs>
                        <clipPath id="__lottie_element_1235">
                            <rect width="200" height="200" x="0" y="0"></rect>
                        </clipPath>
                    </defs>
                    <g clipPath="url(#__lottie_element_1235)">
                        <g transform="matrix(1,0,0,1,-0.25,-0.25)" opacity="1" style={{display: "block"}}>
                            <g opacity="1" transform="matrix(1,0,0,1,100.25,100.25)">
                                <path fill="rgb(255,255,255)" fillOpacity="1"
                                      d=" M0,0 C0,0 0,0 0,0 C0,0 0,0 0,0 C0,0 0,0 0,0 C0,0 0,0 0,0z"></path>
                            </g>
                            <g opacity="1" transform="matrix(1,0,0,1,100.25,100.25)">
                                <path fill="rgb(255,255,255)" fillOpacity="1"
                                      d=" M50,-100 C50,-100 -50,-100 -50,-100 C-77.61399841308594,-100 -100,-77.61399841308594 -100,-50 C-100,-50 -100,50 -100,50 C-100,77.61399841308594 -77.61399841308594,100 -50,100 C-50,100 50,100 50,100 C77.61399841308594,100 100,77.61399841308594 100,50 C100,50 100,-50 100,-50 C100,-77.61399841308594 77.61399841308594,-100 50,-100z M90,50 C90,72.05599975585938 72.05599975585938,90 50,90 C50,90 -50,90 -50,90 C-72.05599975585938,90 -90,72.05599975585938 -90,50 C-90,50 -90,-50 -90,-50 C-90,-72.05599975585938 -72.05599975585938,-90 -50,-90 C-50,-90 50,-90 50,-90 C72.05599975585938,-90 90,-72.05599975585938 90,-50 C90,-50 90,50 90,50z"></path>
                            </g>
                        </g>
                        <g transform="matrix(1,0,0,1,-24,-7.75)" opacity="1" style={{display: "block"}}>
                            <g opacity="1" transform="matrix(1,0,0,1,124,108.25)">
                                <path fill="rgb(255,255,255)" fillOpacity="1" d="M0 0"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0"
                                      stroke="rgb(18,18,18)"
                                      strokeOpacity="1" strokeWidth="28" d="M0 0"></path>
                            </g>
                        </g>
                    </g>
                </svg>
            ) : (
                <svg data-testid="checkbox-checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"
                     preserveAspectRatio="xMidYMid slice"
                     style={{width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)"}}>
                    <defs>
                        <clipPath id="__lottie_element_2">
                            <rect width="200" height="200" x="0" y="0"></rect>
                        </clipPath>
                    </defs>
                    <g clipPath="url(#__lottie_element_2)">
                        <g transform="matrix(1,0,0,1,-0.25,-0.25)" opacity="1" style={{display: "block"}}>
                            <g opacity="1" transform="matrix(1,0,0,1,100.25,100.25)">
                                <path fill="rgb(255,255,255)" fillOpacity="1"
                                      d=" M92,-49 C92,-49 92,49 92,49 C92,72.73169708251953 72.73169708251953,92 49,92 C49,92 -49,92 -49,92 C-72.73169708251953,92 -92,72.73169708251953 -92,49 C-92,49 -92,-49 -92,-49 C-92,-72.73169708251953 -72.73169708251953,-92 -49,-92 C-49,-92 49,-92 49,-92 C72.73169708251953,-92 92,-72.73169708251953 92,-49z"></path>
                            </g>
                            <g opacity="1" transform="matrix(1,0,0,1,100.25,100.25)">
                                <path fill="rgb(255,255,255)" fillOpacity="1"
                                      d=" M50,-100 C50,-100 -50,-100 -50,-100 C-77.61399841308594,-100 -100,-77.61399841308594 -100,-50 C-100,-50 -100,50 -100,50 C-100,77.61399841308594 -77.61399841308594,100 -50,100 C-50,100 50,100 50,100 C77.61399841308594,100 100,77.61399841308594 100,50 C100,50 100,-50 100,-50 C100,-77.61399841308594 77.61399841308594,-100 50,-100z M90,50 C90,72.05599975585938 72.05599975585938,90 50,90 C50,90 -50,90 -50,90 C-72.05599975585938,90 -90,72.05599975585938 -90,50 C-90,50 -90,-50 -90,-50 C-90,-72.05599975585938 -72.05599975585938,-90 -50,-90 C-50,-90 50,-90 50,-90 C72.05599975585938,-90 90,-72.05599975585938 90,-50 C90,-50 90,50 90,50z"></path>
                            </g>
                        </g>
                        <g transform="matrix(1,0,0,1,-24,-7.75)" opacity="1" style={{display: "block"}}>
                            <g opacity="1" transform="matrix(1,0,0,1,124,108.25)">
                                <path fill="rgb(255,255,255)" fillOpacity="1"
                                      d=" M-54,6.75 C-54,6.75 -22.5,38.25 -22.5,38.25 C-22.5,38.25 32.78200149536133,-17.031999588012695 49.358001708984375,-33.608001708984375"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0"
                                      stroke="rgb(18,18,18)" strokeOpacity="1" strokeWidth="28"
                                      d=" M-54,6.75 C-54,6.75 -22.5,38.25 -22.5,38.25 C-22.5,38.25 32.78200149536133,-17.031999588012695 49.358001708984375,-33.608001708984375"></path>
                            </g>
                        </g>
                    </g>
                </svg>
            );
            break;
        case "radio":
            return checked !== true ? (
                <svg data-testid="radio-unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201 201" width="201" height="201"
                     preserveAspectRatio="xMidYMid slice"
                     style={{width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)"}}>
                    <defs>
                        <clipPath id="__lottie_element_247">
                            <rect width="201" height="201" x="0" y="0"></rect>
                        </clipPath>
                    </defs>
                    <g clipPath="url(#__lottie_element_247)">
                        <g transform="matrix(1,0,0,1,0,0)" opacity="1" style={{display: "block"}}>
                            <g opacity="1"
                               transform="matrix(0.0000028348356408969266,0,0,0.0000028348356408969266,100.25,100.25)">
                                <path fill="rgb(255,255,255)" fillOpacity="1"
                                      d=" M95,0 C95,-52.46699905395508 52.46699905395508,-95 0,-95 C-52.46699905395508,-95 -95,-52.46699905395508 -95,0 C-95,52.46699905395508 -52.46699905395508,95 0,95 C52.46699905395508,95 95,52.46699905395508 95,0z"></path>
                            </g>
                            <g opacity="1" transform="matrix(1,0,0,1,100.25,100.25)">
                                <path fill="rgb(255,255,255)" fillOpacity="1"
                                      d=" M0,100 C-55.13999938964844,100 -100,55.14099884033203 -100,0 C-100,-55.13999938964844 -55.13999938964844,-100 0,-100 C55.14099884033203,-100 100,-55.13999938964844 100,0 C100,55.14099884033203 55.14099884033203,100 0,100z M0,-90 C-49.625999450683594,-90 -90,-49.625999450683594 -90,0 C-90,49.625999450683594 -49.625999450683594,90 0,90 C49.625999450683594,90 90,49.625999450683594 90,0 C90,-49.625999450683594 49.625999450683594,-90 0,-90z"></path>
                            </g>
                        </g>
                    </g>
                </svg>
            ) : (
                <svg data-testid="radio-checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201 201" width="201" height="201"
                     preserveAspectRatio="xMidYMid slice"
                     style={{width: "100%", height: "100%", transform: "translate3d(0px, 0px, 0px)"}}>
                    <defs>
                        <clipPath id="__lottie_element_242">
                            <rect width="201" height="201" x="0" y="0"></rect>
                        </clipPath>
                    </defs>
                    <g clipPath="url(#__lottie_element_242)">
                        <g transform="matrix(1,0,0,1,0,0)" opacity="1" style={{display: "block"}}>
                            <g opacity="1" transform="matrix(1,0,0,1,100.25,100.25)">
                                <path fill="rgb(255,255,255)" fillOpacity="1"
                                      d=" M95,0 C95,-52.46699905395508 52.46699905395508,-95 0,-95 C-52.46699905395508,-95 -95,-52.46699905395508 -95,0 C-95,52.46699905395508 -52.46699905395508,95 0,95 C52.46699905395508,95 95,52.46699905395508 95,0z"></path>
                            </g>
                            <g opacity="1" transform="matrix(1,0,0,1,100.25,100.25)">
                                <path fill="rgb(255,255,255)" fillOpacity="1"
                                      d=" M0,100 C-55.13999938964844,100 -100,55.14099884033203 -100,0 C-100,-55.13999938964844 -55.13999938964844,-100 0,-100 C55.14099884033203,-100 100,-55.13999938964844 100,0 C100,55.14099884033203 55.14099884033203,100 0,100z M0,-90 C-49.625999450683594,-90 -90,-49.625999450683594 -90,0 C-90,49.625999450683594 -49.625999450683594,90 0,90 C49.625999450683594,90 90,49.625999450683594 90,0 C90,-49.625999450683594 49.625999450683594,-90 0,-90z"></path>
                            </g>
                        </g>
                    </g>
                </svg>
            );
            break;
    }
};


const OptionItem = ({option, onClick, type}) => {
    return <div className="option-item">
        <div onClick={onClick} className="option-item-icon-container">
            {getOptionItemIcon(option['selected'], type)}
        </div>
        <span>{option['caption']}</span>
    </div>
}

export default OptionItem;
