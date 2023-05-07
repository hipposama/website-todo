import { useState } from "react"
import { useCookies } from "react-cookie"

import loginImage from './img/login.png';
import signupImage from './img/reg.png';

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [isLogIn, setIsLogin] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setpassword] = useState(null)
    const [confirmpassword, setconfirmpassword] = useState(null)
    const [error, setError] = useState(null)

    console.log(cookies)

    const viewLogin = (status) => {
        setError(null)
        setIsLogin(status)
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()
        if (!isLogIn && password !== confirmpassword) {
            setError('รหัสผ่านไม่ตรงกัน')
            return
        }
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        

        const data = await response.json()

        if (data.detail) {
            setError(data.detail)
        } else {
            setCookie('Email', data.email)
            setCookie('AuthToken', data.token)

            window.location.reload()
        }
    }

    return (
        <div className="main">
            <div className="auth-container">
                <div className="auth-container-box">
                    <div className="auth-options">
                        <button onClick={() => viewLogin(true)}
                            style={{ backgroundColor: isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)' }}
                        >เข้าสู่ระบบ</button>
                        <button onClick={() => viewLogin(false)}
                            style={{ backgroundColor: !isLogIn ? 'rgb(255,255,255)' : 'rgb(188,188,188)' }}
                        >สมัครสมาชิก</button>
                    </div>
                    <form>
                        <img className="icon-login"
                            src={isLogIn ? loginImage : signupImage}
                            alt={isLogIn ? 'Login Icon' : 'Signup Icon'} />
                        <h2 className="text-login">{isLogIn ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</h2>
                        <input type="email"
                            placeholder="อีเมล"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="password"
                            placeholder="รหัสผ่าน"
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        {!isLogIn && <input type="password"
                            placeholder="ยืนยันรหัส"
                            onChange={(e) => setconfirmpassword(e.target.value)}
                        />}
                        <input type="submit" className="create" value='ยืนยัน' onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} />
                        {error && <p>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth