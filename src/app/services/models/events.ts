export class Event {
    name: string;
    price_adult: number;
    price_student: number;
    image;
    imagePath: string; // Path for retrieving
    date: string;
    time: string;
    slots: number;
    status:string;
    detail: string;
    hostName: string;
    location: string;
    id?: string;
    constructor(
        name: string,
        price_adult: number,
        price_student: number,
        image,
        date: string,
        time: string,
        slots: number,
        status: string,
        detail: string,
        hostName: string,
        location: string,
        id?: string) {
        this.name = name;
        this.price_adult = price_adult;
        this.price_student = price_student;
        this.image = image;
        this.date = date;
        this.time = time;
        this.slots = slots;
        this.status = status;
        this.detail = detail;
        this.hostName = hostName;
        this.location = location;
        this.id = id;
    }
}