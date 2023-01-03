import React, { useEffect, useState } from "react"
import TopNav from "./components/TopNav"
import "./App.css"
import MockApi from "./api/MockApi"
import ProfileList from "./components/ProfileList"
import CreateUser from "./components/CreateUser"

const mockApi = new MockApi()

const App = () => {
    const [userProfiles, setUserProfiles] = useState([])
    const [isCreateMode, setIsCreateMode] = useState(false)

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
                        ...userProfiles,
                        createdUser
                    ])

                    console.log(createdUser)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="app">
            <TopNav />
            <div className="button-container">
                <button onClick={() => setIsCreateMode(false)}>User List</button>
                <button onClick={() => setIsCreateMode(true)}>Create User</button>
            </div>
            {isCreateMode && (
                <CreateUser 
                    userProfiles={userProfiles}
                    handleCreate={handleCreate}    
                />
            )}
            {!isCreateMode && (
                <ProfileList userProfiles={userProfiles} />
            )}
        </div>
    )
}

export default App