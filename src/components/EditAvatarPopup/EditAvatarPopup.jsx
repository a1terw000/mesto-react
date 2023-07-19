import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import useFormValidation from "../../utils/useFormValidation.js";
import { useRef } from "react";
export default function EditAvatarPopup({ isOpen, onClose, isSend, onUpdateAvatar }) {
  const { handleChange, isValid, values, errors, inputValid, reset } = useFormValidation()

  const link = useRef()

  function resetForClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({ avatar: link.current.value }, reset)
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={resetForClose}
      isSend={isSend}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input onChange={handleChange} ref={link} type="url" value={values.avatar || ''} id="avatar" className={`form__input form__input_type_url ${inputValid.avatar === undefined || inputValid.avatar ? '' : 'form__input_type_error'}`} placeholder="Ссылка на картинку" name="avatar" required />
        <span className={`form__error form__error_type_avatar  ${inputValid.avatar ? '' : 'form__error_visible'}`} id="error_avatar">{errors.avatar}</span>
      </fieldset>
    </PopupWithForm>
  )
}