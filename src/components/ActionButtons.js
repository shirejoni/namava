import React from "react";
import './ActionButtons.scss';
import Config from '../config';
import momentj from 'moment-jalaali';
import fa from 'moment/locale/fa';
import 'moment-timezone';
import {Link} from "react-router-dom";

const ActionButtons = ({item, moreButton, defaultButton}) => {

    let buttons = [];

    if(item['publishInFuture'] === true) {
        momentj.locale("fa", fa);
        momentj.loadPersian({
            usePersianDigits: true ,
        });

        let publishDate = new momentj(item["publishDate"].substr(0, 15));
        buttons.push(
            <div key={`action-button-${item['id']}`} className="date-box">
                <div className="box-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                         className="t-icon-0-1-195">
                        <path className="svg-c1"
                              d="M12.074 23c-4.478 0-8.516-2.698-10.23-6.835s-.766-8.9 2.4-12.066S12.174-.015 16.3 1.7s6.835 5.752 6.834 10.23c-.004 6.11-4.958 11.064-11.07 11.07zm0-19.83a8.76 8.76 0 0 0-8.759 8.759 8.76 8.76 0 0 0 8.759 8.759 8.76 8.76 0 0 0 8.759-8.759 8.77 8.77 0 0 0-8.759-8.759zM15.1 16.115c-.307 0-.6-.122-.818-.34l-3.03-3.03c-.217-.217-.34-.5-.34-.818V6.262c0-.64.518-1.157 1.157-1.157s1.157.518 1.157 1.157v5.187l2.7 2.7c.33.33.43.828.25 1.26s-.6.714-1.07.713z"></path>
                    </svg>
                    <div className="date-text">
                        زمان انتشار: {publishDate.tz("Asia/Tehran").locale('fa').format("dddd jD jMMMM [ساعت] H")}
                    </div>
                </div>
            </div>
        );
    }else if(item['type'] === Config.itemTypes.PurchasableMovie) {
        buttons.push(
            <div key={`action-button-${item['id']}`} className="button-box">
                <div className="box-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                         className="Button-icon-0-1-58">
                        <path
                            d="M14.66 8.347l-8.537-4.93c-.502-.287-1.12-.286-1.62.005s-.81.825-.81 1.404v9.858c-.001.58.307 1.115.808 1.406s1.12.293 1.62.005l8.537-4.93a1.64 1.64 0 0 0 0-2.82z"></path>
                    </svg>
                    <div className="button-title">
                        خرید بلیط
                    </div>
                </div>
            </div>
        );
    }

    if(buttons.length === 0) {
        buttons.push(defaultButton === undefined ? <div key={`action-button-${item['id']}`} className="button-box">
            <div className="button-title">
                عضویت و دریافت یک روز اشتراک رایگان
            </div>
        </div> : defaultButton);
    }

    if(moreButton === true) {
        buttons.push(<div className="more-button has-icon" key={`button-more-${item['id']}`}>
            <Link to="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                     className="Button-icon-0-1-58">
                    <g transform="matrix(-1 0 0 -1 1649.226 -336.319)" className="svg-c1">
                        <path className="svg-c1"
                              d="M1634.13-339.32a12.02 12.02 0 0 1-12.102-12.101 12.02 12.02 0 0 1 12.102-12.101 12.02 12.02 0 0 1 8.557 3.544 12.12 12.12 0 0 1 0 17.114 12.02 12.02 0 0 1-8.557 3.544zm0-23.08a10.91 10.91 0 0 0-10.98 10.98 10.91 10.91 0 0 0 10.98 10.98 10.91 10.91 0 0 0 7.764-3.216c4.28-4.29 4.28-11.238 0-15.53a10.91 10.91 0 0 0-7.764-3.215z"></path>
                        <rect width="3.14" height="10.632" rx="1.57" x="1632.561" y="-359.153"></rect>
                        <rect width="3.14" height="3.14" rx="1.57" x="1632.561" y="-346.124"></rect>
                    </g>
                </svg>
                <span>توضیحات بیشتر</span>
            </Link>
        </div>)
    }

    return (
        <div className="actions">
            {buttons}
        </div>
    )
}

export default ActionButtons;
