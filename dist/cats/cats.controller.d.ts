import { CatService } from './cat.service';
export declare class CatsController {
    private readonly appService;
    constructor(appService: CatService);
    findAll(): string;
    findOne(params: {
        id: number;
        type: string;
    }): string;
}
