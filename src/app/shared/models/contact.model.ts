export class Contact{
    name:string;
    email:string;
    phone:string;
    lastName:string;
    inlineRadioOptions:string;
    month:string;
    year:string;
    day:string;

    constructor(name:string, email:string, phone:string, lastName:string, inlineRadioOptions:string, month:string, year:string, day:string){
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.inlineRadioOptions= inlineRadioOptions;
        this.month = month;
        this.day = day;
        this.year= year;
    }
}