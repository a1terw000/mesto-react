import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, isSend, onAddPlace }) {
  const { handleChange, isValid, values, errors, inputValid, reset } = useFormValidation()

  function resetForClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({ title: values.title, link: values.link }, reset)
  }

  return (
    <PopupWithForm
      name='cards'
      title='Новое место'
      titleButton='Создать'
      isOpen={isOpen}
      onClose={resetForClose}
      isSend={isSend}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input onChange={handleChange} value={values.title || ''} type="text" id="title" className={`form__input form__input_type_title ${inputValid.avatar === undefined || inputValid.avatar ? '' : 'form__input_type_error'}`} placeholder="Название" name="title" minLength={2} maxLength={30} required />
        <span className={`form__error form__error_type_title  ${inputValid.name ? '' : 'form__error_visible'}`} id="error_title">{errors.title}</span>
        <input onChange={handleChange} value={values.link || ''} type="url" id="link" className={`form__input form__input_type_url ${inputValid.avatar === undefined || inputValid.avatar ? '' : 'form__input_type_error'}`} placeholder="Ссылка на картинку" name="link" required />
        <span className={`form__error form__error_type_link  ${inputValid.name ? '' : 'form__error_visible'}`}>{errors.link}</span>
      </fieldset>
    </PopupWithForm>
  )
}