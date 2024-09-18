import { LayoutDashboardIcon, Repeat, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white  text-black border-t border-gray-200 flex items-center justify-around py-2">
      <Link href={'/'} className="flex flex-col items-center text-xs gap-1 h-auto p-2">
        <LayoutDashboardIcon className="" />
        <span className=''>Dashboard</span>
      </Link>
      <Link href={'/trades'} className="flex flex-col items-center text-xs gap-1 h-auto p-2">
        <Repeat className="" />
        <span>Trades</span>
      </Link>
      <Link href={'/profile'} className="flex flex-col items-center text-xs gap-1 h-auto p-2">
        <User className="" />
        <span>Profile</span>
      </Link>
    </nav>
  )
}

export default NavBar