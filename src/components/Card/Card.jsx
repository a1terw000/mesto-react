import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import ButtonLike from "../ButtonLike/ButtonLike.jsx"
export default function Card({ card, onCardClick, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  return (
    <>
      <img src={card.link} alt={card.name} className="card__image" onClick={() => onCardClick({ link: card.link, name: card.name })} />
      <div className="card__integration">
        <h2 className="card__alies">{card.name}</h2>
        <div className="card__likes"><ButtonLike likes={card.likes} myId={currentUser._id} cardId={card._id} /></div>
      </div>
      {currentUser._id === card.owner._id && <button className={`card__trash`} type="button" aria-label="Удалить карточку" onClick={() => { onCardDelete(card._id) }} />}
    </>
  )
}