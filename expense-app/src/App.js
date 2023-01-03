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
                console.log(profiles)
                setUserProfiles(profiles)
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

                    setSelectedUserId(undefined)
                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    return (
        <div className="app">
            <TopNav userProfiles={userProfiles} />
            <div className="button-container">
                <button onClick={() => setIsCreateMode(false)}>User List</button>
                <button onClick={() => setIsCreateMode(true)}>Create User</button>
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