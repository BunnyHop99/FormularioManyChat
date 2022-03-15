import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/pages/contact/services/data.service';
import Swal from 'sweetalert2';
import meses from 'src/assets/i18n/es.json';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [DataService]
})
export class ContactComponent implements OnInit {

  @Output() response = new EventEmitter();

  days: string[] = [];
  day = null;
  month = null;
  year = null;

  data = {
    name: '',
    lastname: '',
    birthday: '',
    phone: '',
  };

  firstSetDays = true;
  contactForm!: FormGroup;
  private isEmail = "^[a-zA-Z._%+-]+([.-]?[a-zA-Z0-9._%+-]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$";
  private isPhoneNumber = '[0-9 ]{10}';

  anhos = [
    { valor: '1960', nombre: '1960' }, { valor: '1961', nombre: '1961' }, { valor: '1962', nombre: '1962' }, { valor: '1963', nombre: '1963' }, { valor: '1964', nombre: '1964' },
    { valor: '1965', nombre: '1965' }, { valor: '1966', nombre: '1966' }, { valor: '1967', nombre: '1967' }, { valor: '1968', nombre: '1968' }, { valor: '1969', nombre: '1969' },
    { valor: '1970', nombre: '1971' }, { valor: '1972', nombre: '1972' }, { valor: '1973', nombre: '1973' }, { valor: '1974', nombre: '1974' }, { valor: '1975', nombre: '1975' },
    { valor: '1976', nombre: '1976' }, { valor: '1977', nombre: '1977' }, { valor: '1978', nombre: '1978' }, { valor: '1979', nombre: '1979' }, { valor: '1980', nombre: '1980' },
    { valor: '1981', nombre: '1981' }, { valor: '1982', nombre: '1982' }, { valor: '1983', nombre: '1983' }, { valor: '1984', nombre: '1984' }, { valor: '1985', nombre: '1985' },
    { valor: '1986', nombre: '1986' }, { valor: '1987', nombre: '1987' }, { valor: '1988', nombre: '1988' }, { valor: '1989', nombre: '1989' }, { valor: '1990', nombre: '1990' },
    { valor: '1991', nombre: '1991' }, { valor: '1992', nombre: '1992' }, { valor: '1993', nombre: '1993' }, { valor: '1994', nombre: '1994' }, { valor: '1995', nombre: '1995' },
    { valor: '1996', nombre: '1996' }, { valor: '1997', nombre: '1997' }, { valor: '1998', nombre: '1998' }, { valor: '1999', nombre: '1999' }, { valor: '2000', nombre: '2000' },
    { valor: '2001', nombre: '2001' }, { valor: '2002', nombre: '2002' }
  ]
  res = [
    { valor: 'London', nombre: 'London' }, { valor: 'TestRest', nombre: 'TestRest' }
  ]
  meses = [
    { valor: '01', nombre: 'Enero' }, { valor: '02', nombre: 'Febrero' }, { valor: '03', nombre: 'Marzo' }, { valor: '04', nombre: 'Abril' }, { valor: '05', nombre: 'Mayo' },
    { valor: '06', nombre: 'Junio' }, { valor: '07', nombre: 'Julio' }, { valor: '08', nombre: 'Agosto' }, { valor: '09', nombre: 'Septiembre' }, { valor: '10', nombre: 'Octubre' },
    { valor: '11', nombre: 'Noviembre' }, { valor: '12', nombre: 'Diciembre' }
  ]
  dias = [
    { valor: '01', nombre: '01' }, { valor: '02', nombre: '02' }, { valor: '03', nombre: '03' }, { valor: '04', nombre: '04' }, { valor: '05', nombre: '05' },{valor:'06',nombre:'06'}, { valor: '07', nombre: '07' },
    { valor: '08', nombre: '08' }, { valor: '09', nombre: '09' }, { valor: '10', nombre: '10' }, { valor: '11', nombre: '11' }, { valor: '12', nombre: '12' }, { valor: '13', nombre: '13' },
    { valor: '14', nombre: '14' }, { valor: '15', nombre: '15' }, { valor: '16', nombre: '16' }, { valor: '17', nombre: '17' }, { valor: '18', nombre: '18' }, { valor: '19', nombre: '19' },
    { valor: '20', nombre: '20' }, { valor: '21', nombre: '21' }, { valor: '22', nombre: '22' }, { valor: '23', nombre: '23' }, { valor: '24', nombre: '24' }, { valor: '25', nombre: '25' },
    { valor: '26', nombre: '26' }, { valor: '27', nombre: '27' }, { valor: '28', nombre: '28' }, { valor: '29', nombre: '29' }, { valor: '30', nombre: '30' }, { valor: '31', nombre: '31' }
  ]
  constructor(
    private fb: FormBuilder,
    private dataSvc: DataService,
  ) { }
  ngOnInit(): void {
    this.initForm();
  }
  async dismiss(): Promise<void> {
    if (this.contactForm.valid) {
      try {
        const formValue = this.contactForm.value;
        await this.dataSvc.checkNumberRaffle(formValue.phone, formValue.restaurant);
        await this.dataSvc.checkNumber(formValue.phone, formValue.restaurant);
        await this.dataSvc.checkUserData(formValue.name, formValue.lastName, formValue.phone, formValue.email, formValue.restaurant);
        //await this.dataSvc.writeClientRaffleData(formValue.name, formValue.lastName, formValue.phone, formValue.email);
        await this.dataSvc.writeClientRaffleData(formValue.phone, formValue.month, formValue.day, formValue.year, formValue.restaurant).then(
          (data) => {
            if (data) {
              this.dataSvc
                .checkNumber(formValue.phone, formValue.restaurant)
                .then(async (resData) => {
                  if (!resData) {
                    this.response.emit(true);
                    return;
                  } else if (resData) {
                    this.dataSvc.writeClientData(formValue.name, formValue.lastName, formValue.email, formValue.phone, formValue.month, formValue.day, formValue.year, formValue.restaurant);
                  }
                });
            }
          },
          (error) => {
            alert(error);
          }
        );
        Swal.fire(
          'Gracias por registrarte. ¡Ya estás participando en nuestro Giveaway!<br>Los ganadores se darán a conocer por medio de nuestro Facebook Oficial!',
          '<div class="btnRow"><a class="btn-menu" href="https://londonribs.com">Ir a menu</a></div>',
          'success'
        );
        this.contactForm.reset();
        console.log(formValue);
      } catch (e) {
        alert(e);
      }
    } else {
      Swal.fire(
        'Oops!',
        'Por favor revisa tu info :(',
        'error'
      );
    }

  }
  //validate fields
  isValidField(field: string): string {
    const validatedField = this.contactForm.get(field);
    return (!validatedField?.valid && validatedField?.touched)
      ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }
  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      month: ['', [Validators.required]],
      day: ['', [Validators.required]],
      year: ['', [Validators.required]],
      email: ['', [Validators.pattern(this.isEmail)]],
      phone: ['', [Validators.required, Validators.pattern(this.isPhoneNumber)]],
      restaurant: ['', [Validators.required]],
    });
  }
}