import { useState } from "react";

export default function Login(props) {
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
    props.onLogin({ email, password });
  }

  return (
      <section className="auth">
        <h2 className="auth_title">Вход</h2>
        <form className="auth_form" onSubmit={handleSubmit}>
          <fieldset className="auth_fieldset">
            <input type="email"name="email" className="auth_input" placeholder="Email" required onChange={handleChangeEmail} />
            <input type="password" name="password" className="auth_input" placeholder="Пароль" minLength={2} maxLength={10} required onChange={handleChangePassword} />
          </fieldset>
          <button className="auth__submit">Войти</button>
        </form>
      </section>
  )
}