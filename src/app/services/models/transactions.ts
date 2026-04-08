export class Transaction {
    prjId: string;
    rewardId: string;
    status: string;
    txnAmt: number;
    userId: string;
    id?: string;
    constructor(
        prjId: string,
        rewardId: string,
        status: string,
        txnAmt: number,
        userId: string,
        id?: string) {
        this.prjId = prjId;
        this.rewardId = rewardId;
        this.status = status;
        this.txnAmt = txnAmt;
        this.userId = userId;
        this.id = id;
    }
}