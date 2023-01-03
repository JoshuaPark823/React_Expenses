import './CreateUser.css'
import { useState } from 'react';

const CreateUser = ({ userProfiles, handleCreate }) => {
    const [formData, setFormData] = useState({
        name: '',
        createdAt: Date.now(),
        updatedAt: Date.now()
    })

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        // Create the new user on the parent
        handleCreate(formData)

        // Reset the form
        setFormData({
            ...formData,
            name: ''
        })
    }

    return (
        <div className='create-user-container'>
            <form onSubmit={handleSubmit}>
                <div className='name-input'>
                    <label htmlFor='name'>Name</label>
                    <input id='name' name='name' value={formData.name} onChange={handleChange}></input>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateUser