export class Update {
    updatetitle: string;
    updateDetail: string;
    prjId: string;
    updateID?: string


    constructor(updatetitle: string, updateDetail: string,
        prjId: string, updateID?: string) {
        this.updatetitle = updatetitle
        this.updateDetail = updateDetail
        this.prjId = prjId
        this.updateID = updateID
    }
}