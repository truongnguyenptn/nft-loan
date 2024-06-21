import { Injectable } from '@nestjs/common';
import { DATA_REQUESTS } from 'src/common/data';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OfferService {
  constructor(private readonly userService: UserService) { }

  getListRequestsOfOffer(offerId: number) {
    // HERE WE DEFAULT GET A REQUEST BELONG TO OFFER ID = 1;

    const listRequests = DATA_REQUESTS.filter(
      (request) => request.offerId === +offerId,
    );

    const listData = [];
    for (const request of listRequests) {
      const owner = this.userService.findUserById(request.ownerId);
      listData.push({ ...request, owner });
    }
    return listData;
  }
}
