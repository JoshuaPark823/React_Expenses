import './CreateUser.css'
import { useState } from 'react';

const INITIAL_STATE = {
    name: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    country: '',
    city: '',
    isAdmin: false
}

const CreateUser = ({ handleCreate }) => {
    const [formData, setFormData] = useState(INITIAL_STATE)

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
        setFormData(INITIAL_STATE)
    }

    return (
        <div className='create-user-container'>
            <form onSubmit={handleSubmit}>
                <div className='form-input'>
                    <label htmlFor='name'>Name</label>
                    <input id='name' name='name' value={formData.name} onChange={handleChange}></input>
                </div>
                <div className='form-input'>
                    <label htmlFor='city'>City</label>
                    <input id='city' name='city' value={formData.city} onChange={handleChange}></input>
                </div>
                <div className='form-input'>
                    <label htmlFor='country'>Country</label>
                    <input id='country' name='country' value={formData.country} onChange={handleChange}></input>
                </div>
                <div className='form-input'>
                    <label htmlFor='isAdmin'>Admin Status</label>
                    <input id='isAdmin' name='isAdmin' type='checkbox' value={formData.isAdmin} onChange={handleChange}></input>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateUser