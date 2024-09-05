import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<div class="hero">
  <h1>Welcome to FM Mobile Car Wash <Span>Detailing</Span></h1>
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
<section class="gallery">
  <h2>Our Work</h2>
  <div class="gallery-grid">
    <img src="assets/car.png" alt="Car Wash Example 1" />
    <img src="assets/car.png" alt="Car Wash Example 2" />
    <img src="assets/car.png" alt="Car Wash Example 3" />
    <img src="assets/car.png" alt="Car Wash Example 4" />
    <img src="assets/car.png" alt="Car Wash Example 5" />
    <img src="assets/car.png" alt="Car Wash Example 6" />
  </div>
</section>
<section class="pricing">
  <h2>Pricing Plans</h2>
  <div class="pricing-list">
    <div class="pricing-item">
      <h3>Basic Package</h3>
      <p>$30</p>
      <p>Exterior wash and interior vacuum.</p>
      <ul>
        <li>Exterior wash</li>
        <li>Interior vacuum</li>
      </ul>
    </div>
    <div class="pricing-item">
      <h3>Standard Package</h3>
      <p>$50</p>
      <p>Basic package + interior cleaning and detailing.</p>
      <ul>
        <li>All Basic Package services</li>
        <li>Interior cleaning</li>
        <li>Detailing</li>
      </ul>
    </div>
    <div class="pricing-item">
      <h3>Premium Package</h3>
      <p>$80</p>
      <p>Standard package + waxing and tire shine.</p>
      <ul>
        <li>All Standard Package services</li>
        <li>Waxing</li>
        <li>Tire shine</li>
      </ul>
    </div>
  </div>
</section>

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

<!-- <footer>
  <p>&copy; 2024 Mobile Car Wash. All rights reserved.</p>
  <div class="footer-links">
    <a routerLink="/about">About Us</a>
    <a routerLink="/contact">Contact</a>
    <a routerLink="/privacy">Privacy Policy</a>
  </div>
</footer> -->
`,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
