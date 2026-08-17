import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='bg-gray-900 text-white px-16 flex justify-center items-center h-16'>
      <p>Copyright &copy; {currentYear} Get me A Chai - All rights reserved</p>
    </footer>
  )
}

export default Footer
