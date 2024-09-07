import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<div class="hero">
  <h1>Welcome to FM Mobile Car Wash <span>Detailing</span></h1>
  <p>Convenient car cleaning at your doorstep.</p>
  <a routerLink="/booking" class="cta-button">Book Now</a>
</div>

<section class="services">
  <h2>Our Services</h2>
  <div class="service-list">
    <div class="service-item">
      <img src="assets/icons/exterior-wash.png" alt="Exterior Wash" />
      <h3>Exterior Wash</h3>
      <p>Thorough cleaning of your car's exterior.</p>
    </div>
    <div class="service-item">
      <img src="assets/icons/interior-cleaning.png" alt="Interior Cleaning" />
      <h3>Interior Cleaning</h3>
      <p>Deep cleaning of seats, carpets, and surfaces.</p>
    </div>
    <div class="service-item">
      <img src="assets/icons/detailing.png" alt="Detailing" />
      <h3>Detailing</h3>
      <p>Comprehensive detailing for a showroom shine.</p>
    </div>
    <div class="service-item">
      <img src="assets/icons/waxing.png" alt="Waxing" />
      <h3>Waxing</h3>
      <p>Protect your paint with a premium wax finish.</p>
    </div>
  </div>
</section>

<div class="section-divider"></div>

<section class="features">
  <h2>Why Choose Us?</h2>
  <div class="feature-list">
    <div class="feature-item">
      <h3>Convenience</h3>
      <p>We come to you, saving you time and effort.</p>
    </div>
    <div class="feature-item">
      <h3>Quality</h3>
      <p>Our team uses top-of-the-line products for the best results.</p>
    </div>
    <div class="feature-item">
      <h3>Eco-Friendly</h3>
      <p>We use eco-friendly products to protect the environment.</p>
    </div>
    <div class="feature-item">
      <h3>Affordable Pricing</h3>
      <p>Competitive pricing without compromising quality.</p>
    </div>
  </div>
</section>

<div class="section-divider"></div>

<section class="gallery">
  <h2>Our Work</h2>
  <div class="gallery-images" [style.transform]="'translateX(-' + currentImageIndex * 100 + '%)'">
        <img *ngFor="let image of images; let i = index"
             [src]="image"
             [alt]="'Car Wash Example ' + (i + 1)" />
    </div>
    <div class="gallery-controls">
        <button class="nav-button" (click)="prevImage()">Previous</button>
        <button class="nav-button" (click)="nextImage()">Next</button>
    </div>
</section>

<div class="section-divider"></div>

<section class="pricing">
  <h2>Car Wash Pricing Plans</h2>
  <div class="pricing-list">
    <div class="pricing-item">
      <h3>Basic Package</h3>
      <p><strong>Price:</strong> $30</p>
      <p>A quick and efficient exterior wash combined with a thorough interior vacuuming.</p>
      <ul>
        <li>Exterior wash</li>
        <li>Interior vacuum</li>
      </ul>
    </div>
    <div class="pricing-item">
      <h3>Standard Package</h3>
      <p><strong>Price:</strong> $50</p>
      <p>Includes all Basic Package services plus a detailed interior cleaning and exterior detailing.</p>
      <ul>
        <li>All Basic Package services</li>
        <li>Interior cleaning (seats, carpets, surfaces)</li>
        <li>Detailing (waxing and polishing)</li>
      </ul>
    </div>
    <div class="pricing-item">
      <h3>Premium Package</h3>
      <p><strong>Price:</strong> $80</p>
      <p>Comprehensive cleaning that includes everything from the Standard Package, plus waxing and tire shine.</p>
      <ul>
        <li>All Standard Package services</li>
        <li>Waxing for paint protection</li>
        <li>Tire shine for a polished look</li>
      </ul>
    </div>
  </div>
</section>

<div class="section-divider"></div>

<section class="pricing">
  <h2>Home Cleaning Packages</h2>
  <div class="pricing-list">
    <div class="pricing-item">
      <h3>Basic Cleaning Package</h3>
      <p><strong>Price:</strong> $100</p>
      <p>Regular maintenance cleaning to keep your home fresh and tidy.</p>
      <ul>
        <li>Dusting all surfaces</li>
        <li>Vacuuming and mopping floors</li>
        <li>Kitchen cleaning (counters, sinks)</li>
        <li>Bathroom cleaning (toilets, sinks, mirrors)</li>
      </ul>
    </div>
    <div class="pricing-item">
      <h3>Standard Cleaning Package</h3>
      <p><strong>Price:</strong> $150</p>
      <p>A deeper clean that includes all Basic Package services plus detailed attention to neglected areas.</p>
      <ul>
        <li>All Basic Package services</li>
        <li>Detailed dusting of baseboards and windows</li>
        <li>Floor cleaning (vacuuming and mopping)</li>
      </ul>
    </div>
    <div class="pricing-item">
      <h3>Premium Cleaning Package</h3>
      <p><strong>Price:</strong> $250</p>
      <p>Extensive cleaning service for homes needing thorough detailing.</p>
      <ul>
        <li>All Standard Package services</li>
        <li>Deep cleaning of bathrooms (including grout)</li>
        <li>Cleaning inside of appliances (oven, microwave)</li>
        <li>Sofa cleaning for upholstery care</li>
      </ul>
    </div>
    <div class="pricing-item">
      <h3>Post-Construction Cleaning Package</h3>
      <p><strong>Price:</strong> From $300</p>
      <p>Specialized cleaning for homes after renovations or construction.</p>
      <ul>
        <li>Debris removal from the site</li>
        <li>Dusting all surfaces, including walls and ceilings</li>
        <li>Window cleaning (inside and outside)</li>
        <li>Thorough floor cleaning (vacuuming and mopping)</li>
      </ul>
    </div>
  </div>
</section>

<div class="section-divider"></div>

<section class="testimonials">
  <h2>What Our Customers Say</h2>
  <div class="testimonial-list">
    <div class="testimonial-item">
      <p>"Fantastic service! My car looks brand new!"</p>
      <p>- Jane Doe</p>
    </div>
    <div class="testimonial-item">
      <p>"The convenience of having a car wash at home is unbeatable."</p>
      <p>- John Smith</p>
    </div>
  </div>
</section>

<div class="section-divider"></div>

<section class="faq">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-item">
    <h3>How do I book a service?</h3>
    <p>You can book a service through our online booking system.</p>
  </div>
  <div class="faq-item">
    <h3>What areas do you service?</h3>
    <p>We service various areas. Check our website for details.</p>
  </div>
  <div class="faq-item">
    <h3>Are your products safe for my car?</h3>
    <p>Yes, we use only safe and eco-friendly products.</p>
  </div>
</section>

<div class="section-divider"></div>

<section class="contact">
  <h2>Contact Us</h2>
  <form>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="message">Message:</label>
    <textarea id="message" name="message" required></textarea>
    
    <button type="submit">Send Message</button>
  </form>
</section>
`,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { 
  currentImageIndex = 0;
  images = [
    'assets/car.png',
    'assets/logo.png',
    'assets/car.png',
    'assets/car.png',
    'assets/car.png',
    'assets/car.png'
];

  showImage(index: number) {
      this.currentImageIndex = index;
  }
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
}

prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
}
}
