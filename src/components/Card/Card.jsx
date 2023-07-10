export default function Card({card, onCardClick}) {
  return (
    <>
      <img src={card.link} alt={card.name} className="card__image" onClick={() => onCardClick({link: card.link, name: card.name})}/>
      <div className="card__integration">
        <h2 className="card__alies">{card.name}</h2>
        <div className="card__likes">
          <button className="card__like-button" type="button" aria-label="Лайкнуть фотографию"/>
          <p className="card__like-counter" />
        </div>
      </div>
      <button className="card__trash" type="button" aria-label="Удалить карточку" />
    </>
  )
}