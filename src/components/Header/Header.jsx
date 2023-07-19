import headerLogo from '../../images/headerLogo.svg'
export default function Header() {
  return (
    <header className="header">
      <img
        src={headerLogo}
        alt="Логотип"
        className="header__logo"
      />
    </header>
  )
}