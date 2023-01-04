import './CreateEditUser.css'
import { useState, useEffect } from 'react';

const INITIAL_STATE = {
    name: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    country: '',
    city: '',
    isAdmin: false
}

const CreateEditUser = ({ 
    handleCreate,
    handleUpdate,
    selectedUserId,
    userProfiles
}) => {
    const [formData, setFormData] = useState({...INITIAL_STATE})

    useEffect(() => {
        if (selectedUserId) {
            const updatingUser = userProfiles.find(profile => profile.id === selectedUserId)
            loadUpdatingUser(updatingUser)
        }
    }, [selectedUserId, userProfiles])

    const loadUpdatingUser = (updatingUser) => {
        if (updatingUser) {
            const userForm = {}
            for (const [key, value] of Object.entries(updatingUser)) {
                userForm[key] = value
            }

            setFormData(userForm)
        }
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.type === 'checkbox' 
                ? event.target.checked 
                : event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        // Create/Update the user using the handler from the parent
        if (selectedUserId) {
            handleUpdate({
                ...formData,
                'updatedAt': new Date().toISOString()
            })
        }
        else {
            handleCreate(formData)
        }

        // Reset the form
        setFormData({...INITIAL_STATE})
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
                    <input 
                        id='isAdmin' 
                        name='isAdmin' 
                        type='checkbox' 
                        value={formData.isAdmin} 
                        onChange={handleChange}
                        checked={formData.isAdmin}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateEditUser