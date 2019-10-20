import { RepsService } from './reps.service';
export declare class RepsController {
    private readonly appService;
    constructor(appService: RepsService);
    fetchAllReps(): string;
    fetchRepsFromOneRegion(params: {
        region: string;
    }): string;
    fetchOneRep(params: {
        region: string;
        id: number;
    }): string;
}
