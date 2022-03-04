import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ContactGuard } from './guards/contact.guard';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { HttpClient, HttpClientModule } from '@angular/common/http'; 

//export function createTranslateLoader(http: HttpClient) {
 // return new TranslateHttpLoader(http, './assets/i18n/', '.json');
//}

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    //HttpClientModule
    //TranslateModule.forRoot({
    //  defaultLanguage: 'en',
    //  loader: {
    //    provide: TranslateLoader,
    //    useFactory: createTranslateLoader,
    //    deps: [HttpClient],
    //  },
   // }),
  ],
  providers: [ContactGuard]
})
export class ContactModule { }
