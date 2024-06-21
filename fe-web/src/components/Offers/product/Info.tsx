import React from "react";

const Info = (props: any) => {
    return (
       <div className="">
        <p className="info inline">
            {props.infoTitle}
        </p>
        <span className="text-gray-300 font-bold inline-block">
          {" " + props.infoContent}
        </span>
       </div>
    );
}

export default Info;