import React from "react";
import Overlay from "./Overlay";
import ArtPic from "./ArtPic";

const Pic = (props: any) => {
    return (
        <div className="art">
            <ArtPic source={props.source} />
            <Overlay />
        </div>
    );
}

export default Pic;