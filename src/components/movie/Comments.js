import React, {useEffect, useState} from 'react';
import {fetchData} from "../../utils/functions";
import Config from "../../config";
import './Comments.scss';
import Comment from "./Comment";

const Comments = ({mediaId}) => {

    let [state, setState] = useState({
        comments: [],
        error: false,
        loading: false,
        pi: 0,
        showMoreComments: false,
    });

    useEffect(() => {
        if(state['loading'] === false && state['error'] === false) {
            fetchNextComments(1);
        }
    }, []);

    const fetchNextComments = (pi) => {
        fetchData(mediaId, "Comments", (result) => {
            setState(state => ({...state, comments: [...state['comments'] , ...result], error: false, loading: false, pi: pi, showMoreComments: result.length < Config.sections.Comments.ps ? false : true}));
        }, () => {}, (isLoading) => {
            if(isLoading) {
                setState(state => ({...state, loading: true}));
            }
        }, {
            mediaId: mediaId,
            profileId: 0,
            pi: pi
        });
    };

    console.log("Comments", state);
    return <div className="comments">
            <div className="comments-header">
                نظرات کاربران
            </div>
            <div className="comments-container">
                {state['comments'].map(comment => (
                    <Comment comment={comment} key={`comments-${mediaId}-${comment['id']}`}/>
                ))}
                {state['showMoreComments'] && (
                    <div>
                        <div className="more-button" onClick={() => {
                            fetchNextComments(state['pi'] + 1)
                        }}>
                            بیشتر
                        </div>
                    </div>
                )}
            </div>
    </div>
}

export default Comments;
