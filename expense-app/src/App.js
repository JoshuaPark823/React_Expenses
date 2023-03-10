import React, { useEffect, useState } from "react"
import TopNav from "./components/TopNav"
import "./App.css"
import MockApi from "./api/MockApi"
import ProfileList from "./components/ProfileList"
import CreateEditUser from "./components/CreateEditUser"

const mockApi = new MockApi()

const App = () => {
    const [userProfiles, setUserProfiles] = useState([])
    const [isCreateMode, setIsCreateMode] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(undefined)

    useEffect(() => {
        mockApi.getAll()
            .then(profiles => {
                setUserProfiles(profiles.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleCreate = (formData) => {
        mockApi.create(formData)
            .then(createdUser => {
                if (createdUser) {
                    setUserProfiles([
                        createdUser,
                        ...userProfiles
                    ])
                    handleTabChange(0)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleUpdate = (formData) => {
        mockApi.update(formData)
            .then(updatedUser => {
                if (updatedUser) {
                    // Remove old user from the list of profiles
                    const profiles = userProfiles.filter(profile => profile.id !== updatedUser.id)
                    
                    // Add the updated user at the front
                    setUserProfiles([
                        updatedUser,
                        ...profiles
                    ])

                    handleTabChange(0)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleTabChange = (tabIndex) => {
        if (tabIndex === 0) {
            setIsCreateMode(false)
            setSelectedUserId(undefined)
        }
        if (tabIndex === 1) {
            setIsCreateMode(true)
        }
    }

    return (
        <div className="app">
            <TopNav userProfiles={userProfiles} />
            <div className="button-container">
                <button onClick={() => handleTabChange(0)}>User List</button>
                <button onClick={() => handleTabChange(1)}>Create User</button>
            </div>
            {isCreateMode && (
                <CreateEditUser 
                    handleCreate={handleCreate}
                    handleUpdate={handleUpdate}
                    selectedUserId={selectedUserId}
                    userProfiles={userProfiles}
                />
            )}
            {!isCreateMode && (
                <ProfileList 
                    userProfiles={userProfiles} 
                    setIsCreateMode={setIsCreateMode}
                    setSelectedUserId={setSelectedUserId}
                />
            )}
        </div>
    )
}

export default App