import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function AppHeader() {
  const user = useSelector( (storeState) => storeState.userModule.user)
  const userName = "or bracha"
  const navigate = useNavigate()
  function onToggleModalLogout(){
    const elModal = document.querySelector('.modal-logout')
    if(elModal.style.height === '40px'){
      elModal.style.height = '0'
      elModal.style.fontSize  = '0'
    } else{
      elModal.style.height = '40px'
      elModal.style.fontSize  = '14px'
    }
      
   }
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
        {!user? <div onClick={onToggleModalLogout} className='user-login'><b>{userName.charAt(0)}</b></div>:<div class="container">
          <button id="signupButton" class="btn sign-up">Sign Up</button>
          <button id="loginButton" class="btn log-in">Log in</button>
        </div>}
        <article className='modal-logout'><h1>Log out</h1></article>
      </section>
    </header>
  )
}
