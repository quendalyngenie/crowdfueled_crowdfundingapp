import { GeoPoint } from '@angular/fire/firestore';
import firebase from 'firebase/app';

export class Event {
    date: string;
    details: string;
    hostName: string;
    image: string;
    location: string;
    name: string;
    price_adult: number;
    price_student: number;
    slots: number;
    status: string;
    time: string;
    favorites: boolean;
    geopoint_location: GeoPoint;

    constructor(
        date: string,
        details: string,
        hostName: string,
        image: string,
        location: string,
        name: string,
        price_adult: number,
        price_student: number,
        slots: number,
        status: string,
        time: string,
        favorites: boolean,
        geopoint_location: GeoPoint,) {

            this.date = date;
            this.details = details;
            this.hostName = hostName;
            this.image = image;
            this.location = location;
            this.name = name;
            this.price_adult = price_adult;
            this.price_student = price_student;
            this.slots = slots;
            this.status = status;
            this.time = time;
            this.favorites = favorites;
            this.geopoint_location = geopoint_location;
    }
}
