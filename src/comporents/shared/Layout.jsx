import React from 'react'

import {Outlet} from 'react-router-dom'

import Hedder from '../shared/Hedder'
import Footer from '../shared/Footer'

export default function Layout() {
   return (
      <div className='flex flex-col justify-between h-screen'>
         <header className='sticky top-0 bg-gradient-to-r from-teal-800 to-indigo-950'> <Hedder/> </header>
         <main > <Outlet/> </main>
         <footer>  <Footer/> </footer>
      </div>
   )
}
