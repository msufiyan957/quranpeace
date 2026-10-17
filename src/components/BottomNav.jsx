import { NavLink } from 'react-router-dom'
import { HomeIcon, SearchIcon, BookmarkIcon, SettingsIcon } from './Icons.jsx'

const items = [
  { to: '/', label: 'Home', icon: HomeIcon, end: true },
  { to: '/search', label: 'Search', icon: SearchIcon },
  { to: '/bookmarks', label: 'Bookmarks', icon: BookmarkIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `bottom-nav__item${isActive ? ' active' : ''}`}
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
