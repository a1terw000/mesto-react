export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, isSend, isValid = true, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
        <button className="popup__close-button" type="button" onClick={onClose} />
        <form className="form" method="post" action="./index.html" name={name} onSubmit={onSubmit}>
          <h2 className="form__title">{title}</h2>
          {children}
          <button className={`popup__submit-button ${isValid ? '' : 'popup__submit-button_disabled'}`} type="submit" disabled={!isValid}>{isSend ? 'Сохранение...' : titleButton || 'Сохранить'}</button>
        </form>
      </div>
    </div>
  )
}