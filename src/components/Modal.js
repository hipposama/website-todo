import { useState } from "react"
import { useCookies } from "react-cookie"

const Modal = ({ mode, setShowModal, getData, task}) => {
    const editmode = mode === 'edit' ? true:false 
    const [cookies] = useCookies(null)

    const [data, setData] = useState({
        user_email: editmode ? task.user_email : cookies.Email,
        title: editmode ? task.title : null,
        progress: editmode ? task.progress : 50,
        date: editmode ? task.date : new Date(),
      })

    const postData = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todo`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
            })
            if (response.status === 200) {
                console.log('WORKED')
                setShowModal(false)
                getData()
            }
            
        }catch(err) {
            console.error(err)
        }
    }

    const editData = async (e) => {
        e.preventDefault()
        try {
            const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/todo/${task.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            if (response.status === 200) {
                setShowModal(false)
                getData()
            }
        } catch(err) {
            console.error(err)
        }
    }


    const handleChange = (e) => {
        const {name, value} = e.target
        setData(data => ({
            ...data,
            [name] : value
        }))
        console.log(data)
    }

    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-title-contanier">
                <h3 className="Text-edit">{editmode ? "มาแก้ไขสิ่งที่อยากทำกัน" : "มาเพิ่มสิ่งที่อยากทำกัน"}</h3>
                <button onClick={() => setShowModal(false)}>X</button>
                </div>
            <form>
                <input required maxLength={30} placeholder="ใส่สิ่งที่อยากทำ" name="title" value={data.title} onChange={handleChange}/>
                <br/>
                <label> ความคืบหน้าของสิ่งที่จะทำ</label>
                <input required type="range" min="0" max="100" name="progress" value={data.progress} onChange={handleChange}/>
                <input className={mode} type="submit" value="เพิ่มสิ่งที่จะทำ" onClick={editmode ? editData:postData} />
            </form>

            </div>
        </div>
    )
}

export default Modal