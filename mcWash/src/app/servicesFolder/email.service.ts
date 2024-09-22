import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser'

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }


  contactUS(from_name:string, message:string,email:string){
    emailjs.init('dak2scKm_QnTJcZC-')
    emailjs.send("service_8cps2by","template_o3h774f",{
      to_name: "FM Mobile Car Wash Detailing",
      from_name: from_name,
      message: message,
      addresse: email,
      });
  }

}
