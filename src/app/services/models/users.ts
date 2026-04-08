export class User {
    name: string;
    photo;
    photoPath: string; // Path for retrieving
    dob: string;
    email: string;
    userType: string;
    userStatus: string;
    id?: string;
    constructor(
        name: string,
        photo,
        dob: string,
        email: string,
        userType: string,
        userStatus: string,
        id?: string) {
        this.name = name;
        this.photo = photo;
        this.dob = dob;
        this.email = email;
        this.userType = userType;
        this.userStatus = userStatus;
        this.id = id;
    }
}