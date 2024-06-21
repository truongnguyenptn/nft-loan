import React from "react";
import Profile from "./Profile";

const ProfileInfo = (props: any)=> {
    return(
        <div className="profile-info">
            <p>
                {props.label}
                <span className="author-name"> {props.author}</span>
            </p>
        </div>
    );
}

export default ProfileInfo;