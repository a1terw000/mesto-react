import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import PopupImage from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import api from "../utils/api.js" 
import * as AuthApi from "../utils/AuthApi.js"
import EditProfilePopup from "../components/EditProfilePopup/EditProfilePopup.jsx"
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [imagePopupVisibility, setImagePopupVisibility] = useState(false)
  const [onCardDelete, setOnCardDelete] = useState(false)
  const [deleteCardId, setDeleteCardId] = useState('')

  const [currentUser, setCurrentUser] = useState({})

  const [cards, setCards] = useState([])
  const [isSend, setIsSend] = useState(false)

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
  const [headerEmail, setHeaderEmail] = useState("");

  function handleRegister(data) {
    AuthApi()
      .register(data)
      .then((res) => {
        if (res && res.data) {
          setIsInfoTooltipSuccess(true);
          Navigate("/sign-in");
        }
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        console.log(err);
      })
      .finally(() => setIsInfoTooltipPopup(true));
  }

  function handleLogin(data) {
    AuthApi()
      .login(data)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          Navigate("/");
          setHeaderEmail(data.email);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        setIsInfoTooltipPopup(true);
        console.error(err);
      });
  }

  function checkToken() {
    const token = localStorage.getItem("jwt");
    if (token) {
      AuthApi()
        .checkToken(token)
        .then((res) => {
          if (res && res.data) {
            setLoggedIn(true);
            Navigate("/");
            setHeaderEmail(res.data.email);
          }
        })
        .catch((err) => console.error(err));
    } else {
      setLoggedIn(false);
    }
  }
  
  function logOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setHeaderEmail("");
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListenerOnDocument()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setEventListenerOnDocument()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    setEventListenerOnDocument()
  }

  const setAllStatesForClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopupVisibility(false)
    setOnCardDelete(false)
  }, [])

  const closePopupWhenClickOnEscape = useCallback((event) => {
    if (event.key === 'Escape') {
      setAllStatesForClosePopups()
      document.removeEventListener('keydown', closePopupWhenClickOnEscape)
    }
  }, [setAllStatesForClosePopups])

  const closeAllPopups = useCallback(() => {
    setAllStatesForClosePopups()
    document.removeEventListener('keydown', closePopupWhenClickOnEscape)
  }, [setAllStatesForClosePopups, closePopupWhenClickOnEscape])

  function setEventListenerOnDocument() {
    document.addEventListener('keydown', closePopupWhenClickOnEscape)
  }

  function handleCardClick(card) {
    setImagePopupVisibility(true)
    setSelectedCard(card)
    setEventListenerOnDocument()
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData)
        setCards(cardData)
      })
      .catch((error) => console.error(`Ошибка загрузки начальных данных: ${error}`))
      .finally()
  }, [])

  function handleCardDelete(cardId) {
    setOnCardDelete(true)
    setDeleteCardId(cardId)
    setEventListenerOnDocument()
  }

  function handleDeleteClick(evt) {
    evt.preventDefault()
    setIsSend(true)
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        }))
        closeAllPopups()
      })
      .catch((error) => {
        console.error(`Ошибка при удалении карточки: ${error}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSend(true)
    api.setUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => {
        console.error(`Ошибка обновления данных профиля: ${error}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSend(true)
    api.setAvatar(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => {
        console.error(`Ошибка при обновлении аватарки: ${error}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    setIsSend(true)
    api.addCard(dataCard)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()
      })
      .catch((error) => {
        console.error(`Ошибка создания новой карточки: ${error}`)
      })
      .finally(() => setIsSend(false))

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={headerEmail} logOut={logOut} />

          <Routes>
            <Route path='/' element={
              <ProtectedRoute
                element={<Main/>} 
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                cards={cards}
                loggedIn={loggedIn}
              />
            } />
            <Route path='/sign-up' element={<Register onRegister={handleRegister} />}/>
            <Route path='/sign-in' element={<Login onLogin={handleLogin} />}/>
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>

        {/* <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          cards={cards}
        /> */}

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSend={isSend}
        />


        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />


        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
          onUpdateAvatar={handleUpdateAvatar}
        />


        <PopupWithForm
          isOpen={onCardDelete}
          onClose={closeAllPopups}
          name='delete-card'
          titleButton='Да'
          title='Вы уверены?'
          onSubmit={handleDeleteClick}
        ></PopupWithForm>


        <PopupImage
          card={selectedCard}
          isOpen={imagePopupVisibility}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
