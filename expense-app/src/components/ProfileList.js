import "./ProfileList.css"

const ProfileList = ({ 
    userProfiles, 
    setIsCreateMode, 
    setSelectedUserId 
}) => {

    const handleUserClick = (userId) => {
        setIsCreateMode(true)
        setSelectedUserId(userId)
    }

    return (
        <div className="profiles">
            {userProfiles && userProfiles.map((profile) => {
                return (
                    <div className="profile" key={profile.id} onClick={() => handleUserClick(profile.id)}>
                        <strong>{profile.name}</strong>
                        <p>Last Updated: {profile.updatedAt}</p>
                        <p>Location: {profile.city}, {profile.country}</p>
                        <p>Admin: {profile.isAdmin ? 'True' : 'False'}</p>
                        <hr/>
                    </div>
                )
            })}
        </div>
    )
}

export default ProfileList