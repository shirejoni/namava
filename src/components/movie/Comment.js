import React from "react";
import momentj from 'moment-jalaali';
import 'moment-timezone'
import fa from 'moment/locale/fa';

const Comment = ({comment}) => {
    momentj.locale("fa", fa);
    momentj.loadPersian({
        usePersianDigits: true ,
    });
    let createDateUTC = new momentj(comment["createDateUTC"].substr(0, 15));
    return <div className="comment">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40"
             className="t-profile-0-1-323">
            <path className="svg-c1"
                  d="M1429.6,630.193a19.238,19.238,0,1,0,19.239,19.238A19.26,19.26,0,0,0,1429.6,630.193Zm0,6.383a6.783,6.783,0,1,1-6.782,6.782A6.79,6.79,0,0,1,1429.6,636.576Zm12.7,22.675a15.8,15.8,0,0,1-12.7,6.4,16.2,16.2,0,0,1-12.632-6.37,4.141,4.141,0,0,1-.7-3.937,8.936,8.936,0,0,1,5.3-5.2,2.552,2.552,0,0,1,2.335.239,9.864,9.864,0,0,0,11.379,0,2.564,2.564,0,0,1,2.352-.234,8.936,8.936,0,0,1,5.3,5.241A4.141,4.141,0,0,1,1442.3,659.251Z"
                  transform="translate(-1409.595 -629.43)"></path>
            <rect width="40" height="40" fill="none"></rect>
        </svg>
        <div className="comment-container">
            <div className="comment-header">
                {comment['profileCaption']} - {createDateUTC.tz("Asia/Tehran").locale('fa').format("dddd jD jMMMM [ساعت] H")}
            </div>
            <div className="comment-description">{comment['body']}</div>
            <div className="comment-vote">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                     className="t-svg-0-1-337">
                    <path className="svg-c1"
                          d="M29.884 15.13c-2.536 0-9.32-1.1-10.248-6.118-.556-3-2.4-3.8-3.8-3.54-1.768.35-2.927 2.056-2.6 3.83l1.033 5.828h-2.83a3.84 3.84 0 0 0-3.095 1.546 3.84 3.84 0 0 0-.625 3.4l2.48 8.57a5.46 5.46 0 0 0 5.218 3.923h5.556a5.44 5.44 0 0 0 3.472-1.255l1.216-1.01a5.13 5.13 0 0 1 3.273-1.184h.957a2.56 2.56 0 0 0 2.557-2.557v-8.876a2.56 2.56 0 0 0-2.554-2.555zm.932 2.557v8.876c-.001.514-.418.93-.932.93h-.957a6.75 6.75 0 0 0-4.312 1.56l-1.215 1c-.684.568-1.544.88-2.433.88H15.4c-1.693-.006-3.18-1.124-3.656-2.75l-2.478-8.57c-.2-.678-.065-1.41.362-1.974.423-.57 1.09-.904 1.8-.9h4.768l-1.37-7.73a1.66 1.66 0 0 1 1.275-1.952c.91-.16 1.646.7 1.93 2.234.5 2.7 2.374 4.818 5.422 6.12a17.75 17.75 0 0 0 6.423 1.327c.514.003.93.42.928.935z"></path>
                </svg>
                <span>{comment['commentLikeDislike']['likeCount']}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
                     className="t-svg-0-1-337">
                    <path className="svg-c1"
                          d="M29.807 11.352c-.68-2.318-2.802-3.914-5.218-3.922h-5.56c-1.27 0-2.497.444-3.473 1.255l-1.215 1a5.13 5.13 0 0 1-3.274 1.184h-.956a2.56 2.56 0 0 0-2.557 2.557v8.876a2.56 2.56 0 0 0 2.557 2.557c2.536 0 9.322 1.1 10.248 6.118.614 3.324 2.7 3.582 3.322 3.582.164 0 .328-.014.49-.043a3.3 3.3 0 0 0 2.6-3.829l-1.032-5.828h2.83a3.84 3.84 0 0 0 3.1-1.546 3.84 3.84 0 0 0 .625-3.4zm.554 11a2.23 2.23 0 0 1-1.8.9h-4.768l1.37 7.73a1.66 1.66 0 0 1-1.275 1.951c-.91.16-1.646-.7-1.93-2.233-.5-2.7-2.373-4.818-5.422-6.122-2.04-.838-4.22-1.288-6.424-1.327-.514-.001-.93-.418-.93-.932v-8.876a.93.93 0 0 1 .931-.931h.956c1.576-.001 3.1-.553 4.313-1.56l1.215-1.01c.684-.568 1.545-.88 2.434-.88h5.556c1.693.006 3.18 1.124 3.656 2.748l2.48 8.57a2.23 2.23 0 0 1-.357 1.968z"></path>
                </svg>
                <span>{comment['commentLikeDislike']['dislikeCount']}</span>
            </div>
        </div>
    </div>;
}

export default Comment;
