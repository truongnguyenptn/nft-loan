import React from "react";
import ProfilePic from "./ProfilePic";
import ProfileInfo from "./ProfileInfo";

const Profile = (props: any)=> {
    return(
        <div className="profile">
            <ProfilePic source={props.userImg} />
            <ProfileInfo label="Topic of"  author={props.userName} />
        </div>
    )
}

export default Profile;