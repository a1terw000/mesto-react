export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_image ${isOpen ? 'popup_opened' : ''}`} id="popup_image" onClick={onClose}>
      <div className="popup__image-container">
        <button className="popup__close-button" type="button" onClick={onClose} />
        <figure className="figure">
          <img src={card.link ? card.link : '#'} alt={card.name ? card.name : '#'} className="figure__image" />
          <figcaption className="figure__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}