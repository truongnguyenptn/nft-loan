import React from 'react';

const Price = (props: any) => {
  return (
    <div className="flex">
      <p className="mr-[8px]">{'Amount: '}</p>
      <div className="price">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6001/6001527.png"
          width="24"
          height="24"
          alt="Solana free icon"
          title="Solana free icon"
        />
        <p className="ml-[4px]">{'0.1'}</p>
      </div>
    </div>
  );
};

export default Price;
