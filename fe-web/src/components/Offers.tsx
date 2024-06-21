import Offer from './Offers/Offer';

import { OFFERS } from '@/constants';

const Offers = () => {
  return (
    <>
      {OFFERS.map((offer: any) => (
        <Offer key={offer.id} offer={offer} />
      ))}
    </>
  );
};

export default Offers;
