import { Injectable } from '@nestjs/common';

@Injectable()
export class RepsService {
  getAllReps(): string {
    return 'you are now viewing all government representatives from all region';
  }

  getRepsFromOneRegion(region: string): string {
    return `you are now viewing all government representatives from ${region}`;
  }

  getOneRep(id: number, region: string): string {
    return `you are now viewing one government representative from ${region},  id - ${id}`;
  }
}
