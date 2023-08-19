
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ email, password });
  }

  return (
      <section className="auth">
        <h2 className="auth_title">Регистрация</h2>
        <form className="auth_form" onSubmit={handleSubmit}>
          <fieldset className="auth_fieldset">
            <input type="email" name="email" className="auth_input" placeholder="Email" required onChange={handleChangeEmail} />
            <input type="password" name="password" className="auth_input" placeholder="Пароль" minLength={2} maxLength={10} required onChange={handleChangePassword} />
          </fieldset>
          <button className="auth__submit">Зарегистрироваться</button>
        </form>
        <Link to="/sign-in" className="auth_link">Уже зарегистрированы? Войти</Link>
      </section>
  )
}