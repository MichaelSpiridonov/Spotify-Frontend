import React from 'react'
import { Link } from 'react-router-dom'
import InstagramIcon from '../assets/icons/instagram.svg?react'
import TwitterIcon from '../assets/icons/twitter.svg?react'
import FacebookIcon from '../assets/icons/facebook.svg?react'

export function AppFooter() {
  return (
    <footer className='app-footer'>
      <div className='footer-content'>
        <div className='footer-section'>
          <h3>Company</h3>
          <Link to='#'>About</Link>
          <Link to='#'>Jobs</Link>
          <Link to='#'>For the Record</Link>
        </div>
        <div className='footer-section'>
          <h3>Communities</h3>
          <Link to='#'>For Artists</Link>
          <Link to='#'>Developers</Link>
          <Link to='#'>Advertising</Link>
          <Link to='#'>Investors</Link>
          <Link to='#'>Vendors</Link>
        </div>
        <div className='footer-section'>
          <h3>Useful links</h3>
          <Link to='#'>Support</Link>
          <Link to='#'>Free Mobile App</Link>
        </div>
        <div className='footer-section'>
          <h3>Beatify Plans</h3>
          <Link to='#'>Premium Individual</Link>
          <Link to='#'>Premium Duo</Link>
          <Link to='#'>Premium Family</Link>
          <Link to='#'>Premium Student</Link>
          <Link to='#'>Beatify Free</Link>
        </div>
        <div className='footer-section social-media'>
          <Link to='#'>
            <InstagramIcon />
          </Link>
          <Link to='#'>
            <TwitterIcon />
          </Link>
          <Link to='#'>
            <FacebookIcon />
          </Link>
        </div>
      </div>
      <div className='footer-bottom'>
        <div className='footer-links'>
          <Link to='#'>Legal</Link>
          <Link to='#'>Safety & Privacy Center</Link>
          <Link to='#'>Privacy Policy</Link>
          <Link to='#'>Cookies</Link>
          <Link to='#'>About Ads</Link>
          <Link to='#'>Accessibility</Link>
        </div>
        <div className='footer-copyright'>2024 Beatify AB</div>
      </div>
    </footer>
  )
}
