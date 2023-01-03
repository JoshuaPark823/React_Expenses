import "./ProfileList.css"

const ProfileList = ({ userProfiles }) => {
    return (
        <div className="profiles">
            {userProfiles && userProfiles.map((profile) => {
                return (
                    <div className="profile" key={profile.id}>
                        <strong>{profile.name}</strong>
                        <p>Last Updated: {profile.updatedAt}</p>
                        <p>Location: {profile.city}, {profile.country}</p>
                        <p>Admin: {profile.isAdmin ? 'Yes' : 'No'}</p>
                        <hr/>
                    </div>
                )
            })}
        </div>
    )
}

export default ProfileList