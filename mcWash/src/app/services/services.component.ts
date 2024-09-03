import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="services-container">
  <h2>Our Services</h2>
  <div class="services-grid">
    <div class="service-card" *ngFor="let service of services">
      <img [src]="service.image" alt="{{ service.title }}" class="service-image">
      <h3>{{ service.title }}</h3>
      <p>{{ service.description }}</p>
      <div class="service-rating">
        <span *ngFor="let star of [].constructor(service.rating); let i = index" class="star">&#9733;</span>
      </div>
      <p class="service-duration">Duration: {{ service.duration }}</p>
      <button class="learn-more-button">Book Now</button>
    </div>
  </div>

  <h2>Customer Testimonials</h2>
  <div class="testimonials">
    <div class="testimonial" *ngFor="let testimonial of testimonials">
      <p>"{{ testimonial.text }}"</p>
      <p class="testimonial-author">- {{ testimonial.author }}</p>
    </div>
  </div>

  <h2>Frequently Asked Questions</h2>
  <div class="faq">
    <div class="faq-item" *ngFor="let item of faqs">
      <div class="faq-question" (click)="item.open = !item.open">
        <h4>{{ item.question }}</h4>
        <span class="toggle-icon" [ngClass]="{'open': item.open}">&#x25BC;</span>
      </div>
      <div class="faq-answer" *ngIf="item.open">
        <p>{{ item.answer }}</p>
      </div>
    </div>
  </div>
</div>
  `,
  styleUrl: './services.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent { 
  services = [
    {
      title: 'Full Service Wash',
      description: 'A comprehensive wash that includes interior and exterior cleaning.',
      image: 'assets/images/full-service.jpg',
      rating: 5,
      duration: '1.5 hours'
    },
    {
      title: 'Express Wash',
      description: 'A quick wash for those on the go.',
      image: 'assets/images/express-wash.jpg',
      rating: 4,
      duration: '30 minutes'
    },
    {
      title: 'Detailing Package',
      description: 'Deep cleaning and detailing for your vehicle.',
      image: 'assets/images/detailing.jpg',
      rating: 5,
      duration: '3 hours'
    },
    {
      title: 'Waxing and Polishing',
      description: 'Protect your car’s paint with our waxing service.',
      image: 'assets/images/waxing.jpg',
      rating: 4,
      duration: '2 hours'
    }
  ];

  testimonials = [
    { text: 'Excellent service! My car looks brand new.', author: 'John Doe' },
    { text: 'Fast and reliable. Highly recommend!', author: 'Jane Smith' },
    { text: 'The detailing package is worth every penny!', author: 'Emily Johnson' }
  ];

  faqs = [
    { question: 'How often should I get my car washed?', answer: 'It depends on your usage, but we recommend at least once a month.', open: false },
    { question: 'Do you offer mobile services?', answer: 'Yes, we can come to your location for some services.', open: false },
    { question: 'What payment methods do you accept?', answer: 'We accept cash, credit cards, and PayPal.', open: false }
  ];
}
