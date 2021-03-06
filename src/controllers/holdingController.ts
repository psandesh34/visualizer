import { Request, Response, NextFunction } from 'express';
import holdingService from '../services/holdingService';

export async function getHoldings(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        let result: any;
        const symbol = req.query.symbol as string;
        let holdingDate: Date;
        holdingDate = req.query.holdingDate? new Date(req.query.holdingDate as string) : new Date();
        holdingDate = new Date('2021-02-26');
        holdingDate.setUTCHours(0, 0, 0, 0);
        // get next day of the holdingDate
        holdingDate.setDate(holdingDate.getDate() + 1);
        if (symbol) {
            result = await holdingService.getSymbolDetails(req.params.userId, symbol);
        } else {
            result = await holdingService.getHoldings(req.params.userId, holdingDate);
        }
        res.send(result);
    } catch (err) {
        next(err);
    }
}

export async function getChartData(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await holdingService.getChartData(req.params.userId);
        res.send(result);
    } catch (err) {
        next(err);
    }
}
