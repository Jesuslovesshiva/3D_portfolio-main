import { NavLink, useLocation } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const showLogo = location.pathname !== '/';

  return (
    <header className='header'>
      <div className='w-10 h-10'>
        {showLogo && (
          <NavLink to='/'>
            <FaGlobe className='w-10 h-10 text-slate-700 hover:text-orange-300 transition-colors' />
          </NavLink>
        )}
      </div>
      
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink 
          to='/about' 
          className={({ isActive }) => 
            isActive ? "text-orange-500" : "text-slate-700"
          }
          style={({ isActive }) => ({ color: isActive ? 'var(--warm-orange)' : 'var(--dark-slate)' })}
        >
          About
        </NavLink>
        <NavLink 
          to='/projects' 
          className={({ isActive }) => 
            isActive ? "text-orange-500" : "text-slate-700"
          }
          style={({ isActive }) => ({ color: isActive ? 'var(--warm-orange)' : 'var(--dark-slate)' })}
        >
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
