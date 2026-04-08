export class Project {
    prjId: string;
    title: string;
    story: string;
    risk: string;
    category: string;
    image;
    imgPath: string;
    target: number;
    startDate: Date;
    endDate: Date;
    prjType: string;        //Sm/ Donation
    fundingType: string;
    userId: string;
    status: string;
    aiScore: number;



    constructor(prjId: string, title: string, story: string, risk: string, category: string, target: number, startDate: Date, endDate: Date,
                prjType: string, fundingType: string, userId: string, status: string, image, aiScore: number) {
        this.prjId = prjId
        this.title = title
        this.story = story
        this.risk = risk
        this.category = category
        this.target = target
        this.startDate = startDate
        this.endDate = endDate
        this.prjType = prjType
        this.fundingType = fundingType
        this.userId = userId
        this.status = status
        this.image = image
        this.aiScore = aiScore
    }
}