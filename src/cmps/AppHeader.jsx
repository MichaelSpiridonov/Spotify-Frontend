import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../store/actions/user.actions'
import { useEffect, useState } from 'react'

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const userName = "or bracha"
  const navigate = useNavigate()
  function onToggleModalLogout() {
    const elModal = document.querySelector('.modal-logout')
    if (elModal.style.height === '40px') {
      elModal.style.height = '0'
      elModal.style.fontSize = '0'
    } else {
      elModal.style.height = '40px'
      elModal.style.fontSize = '14px'
    }

  }
  const [pageWidth, setPageWidth] = useState(window.innerWidth)
  useEffect(() => {

    const handleResize = () => {
      setPageWidth(window.innerWidth)
    }


    window.addEventListener('resize', handleResize)

  }, [pageWidth])
  function onLogout() {
    const elModal = document.querySelector('.modal-logout')
    elModal.style.height = '0'
    elModal.style.fontSize = '0'
    logout()
  }
  if (pageWidth > 500) {
    return (
      <header className='app-header'>
        <section className='header-container'>
          <section className='pageing'>
            <section className='page-backward' onClick={() => navigate(-1)}>
              <svg
                data-encore-id='icon'
                role='img'
                aria-hidden='true'
                viewBox='0 0 16 16'
              >
                <path d='M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z'></path>
              </svg>
            </section>
            <section className='page-forward' onClick={() => navigate(1)}>
              <svg
                data-encore-id='icon'
                role='img'
                aria-hidden='true'
                viewBox='0 0 16 16'
              >
                <path d='M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z'></path>
              </svg>
            </section>
          </section>
          {user ? <div onClick={onToggleModalLogout} className='user-login'><b>{userName.charAt(0)}</b></div> : <div class="container">
            <Link to='/login'><button id="signupButton" class="btn sign-up">Sign Up</button></Link>
            <Link to='/login'> <button id="loginButton" class="btn log-in">Log in</button></Link>
          </div>}
          < article onClick={onLogout} className='modal-logout'><h1>Log out</h1></article>
        </section>
      </header>
    )
  } else {

    return <section className='phone-header'>
      <div onClick={onToggleModalLogout} className='user-login'><b>{userName.charAt(0)}</b></div>
    </section>
  }

}
