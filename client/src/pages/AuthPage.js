import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const AuthPage = () => {
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const handleChange = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const handleRegister = async () => {
    try {
      const data = await  request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {

    }
  }

  return (
    <div className='row'>
      <div className="col s6 offset-s3">
        <h2>Сократи ссылку</h2>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Email"
                  id="email"
                  type="email"
                  name="email"
                  className="yellow-input"
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>

            </div>
          </div>
          <div className="card-action" style={{display: 'flex', justifyContent: 'space-between'}}>
            <button className="btn yellow darken-4"
                    disabled={loading}
            >
              Войти
            </button>
            <button className="btn grey lighten-1 black-text"
                    onClick={handleRegister}
                    disabled={loading}
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}