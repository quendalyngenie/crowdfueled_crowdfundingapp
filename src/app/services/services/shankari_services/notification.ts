export class RewardNotification {
    notId: string
    prjName: string;
    userId: string;
    unread: boolean;
    claimed: string;
    image;
    imgPath: string;
    rewardName?: string;
    rewardToken?: string;
    rewardEstDel?: Date;


    constructor(notId:string,prjName: string, userId: string, unread: boolean, claimed: string, image, rewardName?:string, rewardToken?: string, rewardEstDel?: Date) {
        this.notId = notId
        this.prjName = prjName
        this.userId = userId
        this.unread = unread
        this.claimed = claimed
        this.image = image
        this.rewardName = rewardName
        this.rewardToken = rewardToken
        this.rewardEstDel = rewardEstDel
    }
}

// export class RewardNotification {
//     prjName: string;
//     userId: string;
//     unread: boolean;
//     claimed?: boolean;
//     rewardid?: string;
//     rewardToken?: string;


//     constructor(prjName: string, userId: string, unread: boolean, claimed?: boolean, rewardid?:       string, rewardToken?: string) {
//         this.prjName = prjName
//         this.userId = userId
//         this.unread = unread
//         this.claimed = claimed
//         this.rewardid = rewardid
//         this.rewardToken = rewardToken
//     }
// }