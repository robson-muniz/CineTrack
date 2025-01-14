import Logo from './Logo';

export function Navbar({children}) {
   return (
      <nav className="nav-bar">
         <Logo/>
         {children}
      </nav>
   )
}