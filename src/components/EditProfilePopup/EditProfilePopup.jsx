import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import useFormValidation from "../../utils/useFormValidation.js";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSend }) {
  const { handleChange, isValid, values, errors, inputValid, reset, setValue } = useFormValidation()
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setValue("name", currentUser.name)
    setValue("info", currentUser.about)
  }, [currentUser, setValue])

  function resetForClose() {
    onClose()
    reset({ name: currentUser.name, info: currentUser.about })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({ name: values.name, info: values.info }, reset)
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      onSubmit={handleSubmit}
      isSend={isSend}
    >
      <fieldset className="form__fieldset">
        <input type="text" id="name" disabled={isSend} className={`form__input form__input_type_name ${inputValid.name === undefined || inputValid.name ? '' : 'form__input_type_error'}`} placeholder="Имя" name="name" value={values.name ? values.name : ''} minLength={2} maxLength={40} required onChange={handleChange} />
        <span className={`form__error form__error_type_name ${inputValid.name ? '' : 'form__error_visible'}`}>{errors.name}</span>
        <input type="text" id="info" disabled={isSend} className={`form__input form__input_type_job ${inputValid.info === undefined || inputValid.info ? '' : 'form__input_type_error'}`} placeholder="О себе" name="info" value={values.info ? values.info : ''} minLength={2} maxLength={200} required onChange={handleChange} />
        <span className={`form__error form__error_type_info ${inputValid.info ? '' : 'form__error_visible'}`} id="error_job">{errors.info}</span>
      </fieldset>

    </PopupWithForm>
  )
}