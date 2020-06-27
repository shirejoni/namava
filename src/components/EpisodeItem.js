import React from "react";
import {getNamavaUrl} from "../utils/functions";
import './EpisodeItem.scss';
const EpisodeItem = ({item, placeholder = false}) => {
    return (
        <div className="episode-item">
            <div className="episode-image">
                {placeholder === false && (
                    <img src={getNamavaUrl(item['imageUrl']) + "?anchor=middlecenter&crop=auto&scale=both&w=472&h=308"} alt={item['caption']} />
                )}
            </div>
            {placeholder === false && (
                <React.Fragment>
                    <div className="episode-row">
                        <div className="episode-title">
                            <h2>{item['caption']}</h2>
                            <div className="episode-time">
                                {item['mediaDuration']}
                                دقیقه
                            </div>
                        </div>
                        <div className="episode-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                                 className="t-button-0-1-332">
                                <path className="svg-c1"
                                      d="M14.568 18.596a.54.54 0 0 0 .766 0l3.2-3.2a.542.542 0 1 0-.766-.766l-2.272 2.272V7.54a.54.54 0 1 0-1.084 0v9.363L12.14 14.63a.542.542 0 1 0-.766.766zm8.792-4.122a.54.54 0 0 0-.542.542v3.958c-.001 1.22-1 2.2-2.2 2.2H9.293c-1.22-.001-2.2-1-2.2-2.2v-3.958a.54.54 0 1 0-1.084 0v3.958a3.3 3.3 0 0 0 3.293 3.293h11.316a3.3 3.3 0 0 0 3.293-3.293v-3.958a.54.54 0 0 0-.54-.542z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="episode-row episode-description">
                        {item['shortDescription']}
                    </div>
                </React.Fragment>
            )}
        </div>
    )
}

export default EpisodeItem;
