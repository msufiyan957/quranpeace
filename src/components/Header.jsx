import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">ق</span>
          QuranPeace
        </Link>
      </div>
    </header>
  )
}
