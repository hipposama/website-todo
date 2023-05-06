import { useState } from "react"
import Modal from "./Modal"
import { useCookies } from "react-cookie"

const Listheader = ({getData}) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [showModal, setShowModal] = useState(false)
    const signOut = () => {
        console.log('signOut')
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
    }

    return (
        <div className='list-header'>
            <h1>🏠สิ่งที่จะทำก่อนเปิดเทอม</h1>
            <div className='btn-container'>
                <button className='create' onClick={() => setShowModal(true)}>เพิ่มสิ่งที่จะทำ</button>
                <button className="signout" onClick={signOut}>ออกจากระบบ</button>
            </div>
            {showModal && <Modal mode={"create"} setShowModal={setShowModal} getData={getData}  />}
        </div>
    )
}

export default Listheader