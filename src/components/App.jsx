import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import PopupImage from "./PopupImage/PopupImage.jsx";
import {useState} from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [imagePopupVisibility, setImagePopupVisibility] = useState(false)

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopupVisibility(false)
  }

  function handleCardClick(card) {
    setImagePopupVisibility(true)
    setSelectedCard(card)
  }

  return (
    <div className="page">

      <Header />

      <Main 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name='edit-profile'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      > 
        <input
          type="text"
          id="name"
          className="form__input form__input_type_name"
          placeholder="Имя"
          defaultValue=""
          name="name"
          minLength={2}
          maxLength={40}
          required=""
        />
        <span className="form__error form__error_type_name" />
        <input
          type="text"
          id="info"
          className="form__input form__input_type_job"
          placeholder="О себе"
          defaultValue=""
          name="info"
          minLength={2}
          maxLength={200}
          required=""
        />
        <span className="form__error form__error_type_info" id="error_job" />
      </PopupWithForm>

      <PopupWithForm
        name='cards'
        title='Новое место'
        titleButton='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          id="title"
          className="form__input form__input_type_title"
          placeholder="Название"
          defaultValue=""
          name="title"
          minLength={2}
          maxLength={30}
          required=""
        />
        <span
          className="form__error form__error_type_title"
          id="error_title"
        />
        <input
          type="url"
          id="link"
          className="form__input form__input_type_url"
          placeholder="Ссылка на картинку"
          defaultValue=""
          name="link"
          required=""
        />
        <span className="form__error form__error_type_link" id="error_url" />
      </PopupWithForm>

      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          id="avatar"
          className="form__input form__input_type_url"
          placeholder="Ссылка на картинку"
          defaultValue=""
          name="avatar"
          required=""
        />
        <span
          className="form__error form__error_type_avatar"
          id="error_avatar"
        />
      </PopupWithForm>

      <PopupImage 
        card={selectedCard}
        isOpen={imagePopupVisibility}
        onClose = {closeAllPopups}
      />
      {/* <div className="popup popup_delete-card">
        <div className="popup__container">
          <button
            className="popup__close-button"
            type="button"
            aria-label="Закрыть окно"
          />
          <form
            className="form"
            method="post"
            action="./index.html"
            name="deleteForm"
          >
            <h2 className="form__title">Вы уверены?</h2>
            <button
              className="popup__submit-button"
              type="submit"
              aria-label="Создать"
            >
              Да
            </button>
          </form>
        </div>
      </div> */}
    </div>
  );
}

export default App;
