import React from "react";
import Price from "./Price";
import Time from "./Time";

const Bet = (props: any)=> {
    return (
        <div className="bet">
            <Price maximumLending={props.maximumLending} />
            <Time content="30 days duration" />
        </div>
    );
}

export default Bet;