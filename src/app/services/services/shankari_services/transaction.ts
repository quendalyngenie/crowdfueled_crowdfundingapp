export class Transaction {
    txnId: string;
    prjId: string;
    txnAmt: number;
    userId: string;
    type: string;
    status: string;
    rewardId?: string;


    constructor(txnId: string, prjId: string, txnAmt: number, userId: string, type: string, status: string, rewardId?: string) {
        this.txnId = txnId
        this.prjId = prjId
        this.txnAmt = txnAmt
        this.userId = userId
        this.type = type
        this.status = status
        this.rewardId = rewardId
    }
}