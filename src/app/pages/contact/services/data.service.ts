import { DoBootstrap, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import Swal from 'sweetalert2';


export interface data {
  name: string;
  lastName: string;
  email: string;
  id: string;
  phone: string;
  inlineRadioOptions: string;
  month: string;
  day: string;
  year: string;
}


@Injectable()
export class DataService {




  constructor(
    private db: AngularFirestore
  ) {

  }
  //check number raffle
  async checkNumberRaffle(phone: string): Promise<boolean> {
    return await this.db
      .collection('restaurants')
      .doc('London')
      .collection('clientRaffle', (ref) =>
        ref.where('phone', '==', phone)
      )
      .get()
      .toPromise()
      .then(async (data) => {
        console.log('la info es la de abajo:');
        if (data.empty) return data.empty;
        //Today check
        var todayDate = false;
        data.docs.forEach((doc) => {
          let x = doc.data();
          if (
            new Date(x['dateCrated']).setHours(0, 0, 0, 0) ===
            new Date(Date.now()).setHours(0, 0, 0, 0)
          ) {
            todayDate = true;
            return;
          }
        });
        return !todayDate;
      });
  }
  //check phone number
  async checkNumber(phone: String): Promise<boolean> {
    return await this.db
      .collection('restaurants')
      .doc('London')
      .collection('clients', (ref) => ref.where('phone', '==', phone))
      .get()
      .toPromise()
      .then(async (data) => {
        data.docs.forEach((doc) => {
          console.log(doc.id);
        });
        console.log(data.empty);
        return data.empty;
      });
  }
  //checkUserData
  async checkUserData(
    name: string,
    lastName: string,
    phone: string,
    email: string
  ): Promise<boolean> {
    let nombre = name + lastName;
    let phoneNumber = phone;
    let correo = email;

    return await this.db
      .collection('restaurants')
      .doc('London')
      .collection('clients', (ref) =>
        ref
          .where('name', '==', nombre)
          .where('lastName', '==', phoneNumber)
          .where('phone', '==', phone)
          .where('email', '==', correo)
      )
      .get()
      .toPromise()
      .then(async (data) => {
        console.log(data.empty);
        return data.empty;
      });
  }
  //write client raffle data
  async writeClientRaffleData(phone: string, mes:any, dia:any,anho:any): Promise<string> {
    let clientPhone = '+52' + phone;
    let date =  Date.now();
    let dateCreated =  date;
    let raffleId = 'londonRaffle01';
    let birthday = mes + '/' + dia + '/' + anho;
    let data = {  clientPhone, raffleId, birthday, dateCreated }

    return await this.db
      .collection('restaurants')
      .doc('London')
      .collection('clientRaffle')
      .add(data)
      .then((d) => {
        return d.id;
      });
  }
  //write client
  async writeClientData(nombre: any, apellido: any, correo: any, telefono: any, mes: any, dia: any, anho: any, place: any): Promise<any> {
    let name = nombre;
    let lastName = apellido;
    let email = correo;
    let phone = '+52' + telefono;
    let birthday = mes + '/' + dia + '/' + anho;
    let sucursal = place;
    let date =  Date.now();
    let timestamp =  date;
   
    let data = { name, lastName, email, phone, birthday, sucursal, timestamp }
    return await this.db
      .collection('restaurants')
      .doc('London')
      .collection('clients')
      .add(data)
      .then((d) => {
        return d.id;
      });
  }
}








