import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<div class="about-container">
  <h2>About Us</h2>

  <section class="about-history">
    <h3>Our History</h3>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-content">
          <h4>2020</h4>
          <p>Founded with the goal of providing exceptional services.</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-content">
          <h4>2021</h4>
          <p>Expanded services to meet customer demand.</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-content">
          <h4>2022</h4>
          <p>Launched our online booking system for convenience.</p>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-content">
          <h4>2023</h4>
          <p>Celebrated our 3rd anniversary with a community event.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="about-mission">
    <h3>Our Mission</h3>
    <p>
      Our mission is to deliver the best customer experience through high-quality services. We believe in building lasting relationships with our clients and contributing positively to our community.
    </p>
  </section>

  <section class="about-values">
    <h3>Our Values</h3>
    <p>We are guided by our core values:</p>
    <ul>
      <li><strong>Integrity:</strong> We uphold the highest standards of integrity in all our actions.</li>
      <li><strong>Quality:</strong> We strive for excellence in every service we provide.</li>
      <li><strong>Customer Focus:</strong> Our customers are at the heart of everything we do.</li>
      <li><strong>Teamwork:</strong> We work together to achieve our common goals.</li>
    </ul>
  </section>

  <section class="about-team">
    <h3>Meet Our Team</h3>
    <div class="team-grid">
      <div class="team-member" *ngFor="let member of teamMembers">
        <img [src]="member.image" alt="{{ member.name }}" class="team-image">
        <h4>{{ member.name }}</h4>
        <p>{{ member.position }}</p>
        <p class="team-bio">{{ member.bio }}</p>
      </div>
    </div>
  </section>

  <section class="call-to-action">
    <h3>Join Us on Our Journey</h3>
    <p>Interested in learning more about our services or becoming part of our community? <a routerLink="/contact">Contact us</a> today!</p>
  </section>
</div>`,
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent { 
  teamMembers = [
    {
      name: 'John Doe',
      position: 'CEO',
      image: 'assets/images/john.jpg',
      bio: 'With over 10 years of experience in the industry, John leads our team with a vision for excellence.'
    },
    {
      name: 'Jane Smith',
      position: 'Project Manager',
      image: 'assets/images/jane.jpg',
      bio: 'Jane ensures that every project runs smoothly and meets our high standards of quality.'
    },
    {
      name: 'Emily Johnson',
      position: 'Lead Developer',
      image: 'assets/images/emily.jpg',
      bio: 'Emily specializes in innovative solutions and is passionate about technology and design.'
    },
    {
      name: 'Michael Brown',
      position: 'Designer',
      image: 'assets/images/michael.jpg',
      bio: 'Michael brings creativity and a keen eye for detail to every project, ensuring our services shine.'
    }
  ];
}
