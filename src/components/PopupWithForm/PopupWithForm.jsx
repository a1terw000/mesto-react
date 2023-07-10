export default function PopupWithForm({name, title, titleButton, children, isOpen, onClose}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} >
    <div className="popup__container">
      <button className="popup__close-button" type="button" onClick={onClose}/>
      <form className="form" method="post" action="./index.html" name={name}>
        <h2 className="form__title">{title}</h2>
        <fieldset className="form__fieldset">{children}</fieldset>
        <button className="popup__submit-button" type="submit">{titleButton || 'Сохранить'}</button>
      </form>
    </div>
  </div>
  )
}