import React from "react";
import HeaderOffer from "./HeaderOffer";
import Info from "./Info";
import Bet from "./Bet";

  const TextOffer =(props: any) => {
    return (
        <div className="text mt-[16px]">
            <HeaderOffer content={props.title} />
            <Info infoTitle="Collection: " infoContent={props.nftCollectionName} />

            <Info infoTitle="Interest Rate: " infoContent={props.interestRate + "%"} />           

            <Bet maximumLending={props.maximumLending} />
            
            {/* <div className="bet">
                <p className="info inline">{"Lendable Money: "}</p>
                <div className="price mb-10px">    
                    <svg width="11" height="18" xmlns="http://www.w3.org/2000/svg"><path
                        d="M11 10.216 5.5 18 0 10.216l5.5 3.263 5.5-3.262ZM5.5 0l5.496 9.169L5.5 12.43 0 9.17 5.5 0Z"
                        fill="#00FFF8"/></svg>
                    <p>{props.maximumLending}</p>
                </div>
            </div> */}

            

        </div>
    );
}

export default TextOffer;