import {useEffect, useState} from "react"
import api from "../../utils/api.js"
import Card from "../Card/Card.jsx"

export default function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {

  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')  
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        cardData.forEach((data) => {
          data.myId = userData._id
        })
        setCards(cardData)
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
      })
      .catch((error) => console.error(`Ошибка загрузки начальных данных: ${error}`))
      .finally()
  }, [])

  return (
    <main>
      <section className="profile">
        <div className="profile__information">
          <button type="button" className="profile__button-avatar" onClick={onEditAvatar}>
            <img src={userAvatar} alt="Аватар пользователя" className="profile__photo" />
          </button>
          <div className="profile__info">
            <h1 className="profile__alias">{userName}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}/>
            <p className="profile__caption">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить новую картинку" onClick={onAddPlace}/>
      </section>
      <section className="elements">
        <ul className="cards">{cards.map((data) => {
          return (
              <li className="card" key={data._id}>
                <Card card={data} onCardClick={onCardClick}/>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}