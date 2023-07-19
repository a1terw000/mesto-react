import { useContext } from "react"
import Card from "../Card/Card.jsx"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"

export default function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardDelete, cards }) {
  const currentUser = useContext(CurrentUserContext)
  return (
    <main>
      <section className="profile">
        <div className="profile__information">
          <button type="button" className="profile__button-avatar" onClick={onEditAvatar}>
            <img src={currentUser.avatar ? currentUser.avatar : '#'} alt="Аватар пользователя" className="profile__photo" />
          </button>
          <div className="profile__info">
            <h1 className="profile__alias">{currentUser.name ? currentUser.name : ' '}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile} />
            <p className="profile__caption">{currentUser.about ? currentUser.about : ' '}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить новую картинку" onClick={onAddPlace} />
      </section>
      <section className="elements">
        <ul className="cards">{cards.map((data) => {
          return (
            <li className="card" key={data._id}>
              <Card card={data} onCardClick={onCardClick} onCardDelete={onCardDelete} />
            </li>
          )
        })}
        </ul>
      </section>
    </main>
  )
}