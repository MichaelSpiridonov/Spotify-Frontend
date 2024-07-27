import { useNavigate } from "react-router"

export function MenuPhone() {
    const Navigate = useNavigate()
    function onClickSearch(){
        /* document.querySelector(`.header-container form`).style.opacity = 1 */
        Navigate('/search')
    }
    function onClickHome(){  
        Navigate('/')
    }
    function onClickLibrary(){  
        Navigate('/library')
    }
    return (
        <section className='menu-phone'>
            <section onClick={onClickHome}>
                <svg className='icon' data-encore-id='icon' role='img' aria-hidden='true'  viewBox='0 0 24 24'><path d='M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z'></path></svg>
                <b>Home</b>
            </section>
            <section  onClick={onClickSearch}>
                 <svg className='icon' role='img' height='24' width='24' aria-hidden='true'  viewBox='0 0 24 24' data-encore-id='icon'><path d='M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z' ></path><path d='M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 0 1-2.077 5.816l4.344 4.344a1 1 0 0 1-1.414 1.414l-4.353-4.353a9.454 9.454 0 0 1-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z' fill='#FFFFFF'></path></svg>            
                <b>Search</b>
            </section>
            <section  onClick={onClickLibrary}>
            <svg className='library-svg' data-encore-id='icon' role='img' aria-hidden='true' viewBox='0 0 24 24' ><path d='M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z'></path></svg>
                <b>Library</b>
            </section>
        </section>
    )

}