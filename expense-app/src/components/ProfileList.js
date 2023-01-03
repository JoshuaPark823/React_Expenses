import "./ProfileList.css"

const ProfileList = ({ userProfiles }) => {
    return (
        <div className="profiles">
            {userProfiles && (userProfiles.map((profile) => {
                return (
                    <button className="profile" key={profile.id}>
                        <h4>{profile.name}</h4>
                        <p>Last Updated: {profile.updatedAt}</p>
                    </button>
                )
            }))}
        </div>
    )
}

export default ProfileList