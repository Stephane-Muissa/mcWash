import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
  template: `<div class="contact-container">
  <h2>Contact Us</h2>
  
  <div class="contact-info">
    <h3>Get in Touch</h3>
    <p>If you have any questions or need assistance, feel free to reach out!</p>
    <p><strong>Email:</strong> supportexample.com</p>
    <p><strong>Phone:</strong> (123) 456-7890</p>
    <p><strong>Address:</strong> 123 Main St, Anytown, USA</p>
  </div>

  <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="contact-form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required ngModel>
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required ngModel>
    </div>

    <div class="form-group">
      <label for="message">Message:</label>
      <textarea id="message" name="message" required ngModel rows="4"></textarea>
    </div>

    <button type="submit" class="submit-button">Send Message</button>
  </form>

  <div class="map-container">
    <h3>Our Location</h3>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509259!2d144.9537363156865!3d-37.81720997975196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f19f3f7%3A0x5045675218ceed2!2s123%20Main%20St%2C%20Anytown%2C%20USA!5e0!3m2!1sen!2sau!4v1614852201927!5m2!1sen!2sau"
      width="100%"
      height="300"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
    ></iframe>
  </div>
</div>`,
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  onSubmit() {
    // Handle form submission logic
    alert('Your message has been sent! We will get back to you shortly.');
    // Reset form logic can be added here if needed
  }
 }
