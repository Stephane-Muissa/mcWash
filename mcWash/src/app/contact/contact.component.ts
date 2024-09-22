import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { EmailService } from '../servicesFolder/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="whole-contact-container">
  <div class="contact-container">
    <h2>Contactez-nous</h2>

    <div class="contact-info">
      <h3>Entrer en contact</h3>
      <p>
        Si vous avez des questions ou avez besoin d'assistance, n'hésitez pas à
        nous contacter !
      </p>
      <p><strong>Email :</strong> frankcarwashkin&#64;gmail.com</p>
      <p>
        <strong>Téléphone :</strong> (+243) 838584839 - (+243) 892310580 -
        (+243) 972508968
      </p>
      <p>
        <strong>Adresse :</strong> N° 1, Avenue Lt. Colonel Lukusa, Commune de
        Gombe
      </p>
    </div>

    <form (ngSubmit)="onSubmit(contactForm)" #contactForm="ngForm" class="contact-form">
      <div class="form-group">
        <label for="name">Nom:</label>
        <input type="text" id="name" name="name" required ngModel />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required ngModel />
      </div>

      <div class="form-group">
        <label for="message">Message:</label>
        <textarea
          id="message"
          name="message"
          required
          ngModel
          rows="4"
        ></textarea>
      </div>

      <button [ngClass]="{'disabled-button': !contactForm.valid}" type="submit" class="submit-button" [disabled]="!contactForm.valid">Envoyer le message</button>
    </form>

    <div class="map-container">
      <h3>Notre emplacement</h3>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.5771475853926!2d15.303534375739522!3d-4.301985095671965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a33f34b9b746b%3A0xcf1f680c07e00f7b!2s1%20Ave%20Lt.%20Colonel%20Lukusa%2C%20Kinshasa!5e0!3m2!1sen!2scd!4v1726924409985!5m2!1sen!2scd"
        width="100%"
        height="300"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
  </div>`,
  styleUrls: ['./contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  emailService = inject(EmailService);

  onSubmit(contactForm: any) {
    const { name, message, email } = contactForm.value;
    this.emailService.contactUS(name, message, email);
    alert('Votre message a été envoyé avec succès !');
    contactForm.reset(); // Optional: Reset the form after submission
  }
}