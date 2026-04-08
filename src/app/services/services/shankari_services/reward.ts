export class Reward {
    rewardtitle: string;
    rewardDetail: string;
    price: number;
    prjId: string;
    estDelieveryDate: Date;
    rewqardId?: string;



    constructor(rewardtitle: string, rewardDetail: string, price: number,
        prjId: string, estDelieveryDate: Date, rewqardId?: string) {
        this.rewardtitle = rewardtitle
        this.rewardDetail = rewardDetail
        this.price = price
        this.prjId = prjId
        this.estDelieveryDate = estDelieveryDate
        this.rewqardId = rewqardId
    }
}