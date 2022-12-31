import React, { useEffect, useState } from "react"
import TopNav from "./components/TopNav"
import "./App.css"
import MockApi from "./api/MockApi"

const mockApi = new MockApi()

const App = () => {
    const [userProfiles, setUserProfiles] = useState([])

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

    return (
        <div className="app">
            <TopNav></TopNav>
            <div className="profiles">
                {
                    userProfiles && (userProfiles.map((profile) => {
                        <div key={profile.id}>
                            <h1>
                                {profile.name}
                            </h1>
                            <h2>
                                Last Updated: {profile.updated}
                            </h2>
                        </div>
                    }))
                }
            </div>
        </div>
    )
}

export default App