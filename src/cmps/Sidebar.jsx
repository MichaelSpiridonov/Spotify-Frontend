import { useState } from "react";
import { useNavigate } from "react-router"

export function Sidebar() {
    const Navigate = useNavigate()
    const [classSearch, setClassSearch] = useState('not-active');
    const [classHome, setClassHome] = useState('active');
    function onClickSearch(){
        setClassSearch('active')
        setClassHome('not-active')
        /* document.querySelector(`.header-container form`).style.opacity = 1 */
        Navigate('/search')
    }
    function onClickHome({target}){  
        setClassHome('active')
       /*  document.querySelector(`.header-container form`).style.opacity = 0 */
        setClassSearch('not-active')
        Navigate('/')
    }
    return (
        <section className="side-bar">
            <section className={classHome} onClick={onClickHome}>
                <svg className="icon" data-encore-id="icon" role="img" aria-hidden="true" /* class="Svg-sc-ytk21e-0 bneLcE home-active-icon QbaKKdcHNA2x3_YJvpYu" */ viewBox="0 0 24 24"><path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path></svg>
                <b>Home</b>
            </section>
            <section className={classSearch} onClick={onClickSearch}>
                <svg className="icon" data-encore-id="icon" role="img" aria-hidden="true" /* class="Svg-sc-ytk21e-0 bneLcE search-icon QbaKKdcHNA2x3_YJvpYu" */ viewBox="0 0 24 24"><path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path></svg>
                <b>Search</b>
            </section>

        </section>
    )
}