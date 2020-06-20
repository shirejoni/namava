import React, {useEffect, useRef, useState} from "react";
import './PreviewItem.scss';
import MovieDetail from "./MovieDetail";
import styled, {keyframes} from "styled-components";
import {fetchData, getCoords} from "../../utils/functions";

const fadeIn = keyframes`
      0% {
        opacity: 0;       
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    `;

const FadeInAnimation = styled.div`
        width: 100%;
        height: 100%;
        opacity: 0;
        &.clear-animation {
          opacity: 1;
        }
        &.run-animation {
          opacity: 1;
          animation: ${fadeIn} 500ms linear;
        }
    `;


const PreviewItem = ({id, isActive}) => {
    let [state, setState] = useState({
        id: undefined,
        data: null,
        loading: false,
    });
    let previewRef = useRef();
    useEffect(() => {
        if(isActive === true && state['id'] != id && state['loading'] === false ) {
            fetchData(id, "Preview", (result) => {
                setState(({id: id, data: result, loading: false}));
            }, () => {}, (isLoading) => {
                if(isLoading) {
                    setState(oldState => ({...oldState, loading: true}));
                }
            })
        }
    }, [id]);
    const afterAnimationDone = () => {
        let element = previewRef.current;
        let {top} = getCoords(element);
        window.scrollBy({top: (top + element.clientHeight + 50 - window.innerHeight) - window.pageYOffset, left: 0, behavior: "smooth" } );
        if(element.querySelector('.run-animation')) {
            element.querySelector('.run-animation').removeEventListener('animationend', afterAnimationDone);
            element.querySelector('.fade-in-animation').classList.remove('run-animation');
            element.querySelector('.fade-in-animation').classList.add('clear-animation');
        }
    }

    useEffect(() => {
        let element = previewRef.current;
        if(element.querySelector('.fade-in-animation') && isActive === true) {
            element.querySelector('.fade-in-animation').classList.add('run-animation');
        }
        if(element.querySelector('.run-animation')) {
            element.querySelector('.run-animation').addEventListener('animationend', afterAnimationDone);
        }
        return () => {
            let fadeInAnimation = element.querySelector('.fade-in-animation');
            if(fadeInAnimation) {
                fadeInAnimation.classList.remove('run-animation');
                fadeInAnimation.classList.remove('clear-animation');
            }
        }
    }, [id, isActive]);

    return <div className={`preview-item ${isActive === true ? 'active' : ''}`} ref={previewRef}>
        <FadeInAnimation className={`fade-in-animation ${isActive === true ? '' : 'clear-animation'}`}>
            <MovieDetail loading={state['loading']} data={state['data']}/>
        </FadeInAnimation>
    </div>
}

export default PreviewItem;
