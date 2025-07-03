
import { ModeToggle } from '@/components/mode-toggle';
import { Link, NavLink } from 'react-router';


export default function Navbar() {
  const navItems = [
  { name: "All Books", path: "/books" },
  { name: "Add Book", path: "/create-book" },
  { name: "Borrow Summary", path: "/borrow-summary" },
];
  return (
    <div className='navbar bg-base-100 shadow-sm  dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-4 '>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {' '}
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? 'text-blue-500 font-bold underline' : 'text-gray-700 dark:text-gray-300 hover:text-blue-400'
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
       <Link to='/books' className=' normal-case text-xl font-bold'>
        📚  Library Management
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'text-blue-500 font-bold underline' : ' text-gray-700 dark:text-gray-300 hover:text-blue-400'
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className='navbar-end'>
       <ModeToggle/>
      </div>
    </div>
  );
}
