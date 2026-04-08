import { Timestamp } from '@angular/fire/firestore';
import firebase from 'firebase/app';

export class Campaign {
    category: string;
    endDate: Timestamp;
    favorites: boolean;
    fundingType: string;
    prjName: string;
    prjType: string;
    risk: string;
    startDate: Timestamp;
    status: string;
    story: string;
    target: number;
    userID: string;
    image: string;

    constructor(
        category: string,
        endDate: Timestamp,
        favorites: boolean,
        fundingType: string,
        prjName: string,
        prjType: string,
        risk: string,
        startDate: Timestamp,
        status: string,
        story: string,
        target: number,
        userID: string,
        image: string) {

        this.category = category;
        this.endDate = endDate;
        this.favorites = favorites;
        this.fundingType = fundingType;
        this.prjName = prjName;
        this.prjType = prjType;
        this.risk = risk;
        this.startDate = startDate;
        this.status = status;
        this.story = story;
        this.target = target;
        this.userID = userID;
        this.image = image;
    }
}
