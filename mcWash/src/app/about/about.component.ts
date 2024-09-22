import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive
  ],
  template: `
  <div class="whole-contact-container">
  <div class="about-container">
  <h2>Qui sommes-nous ?</h2>
  <p><strong>FM Mobile Car Wash Detailing</strong> est la solution idéale pour bénéficier d’un service de lavage de véhicules, ainsi que de nettoyage de maisons, de sites post-construction et de canapés, le tout directement à votre porte.</p>

  <section class="about-why-choose">
    <h3>Pourquoi choisir FM Mobile Car Wash Detailing ?</h3>
    <ul>
      <li><strong>Qualité :</strong> Vous aimez la qualité ? Vous aimez vivre dans des espaces propres ? Ne perdez plus votre temps, car nous venons vers vous.</li>
      <li><strong>Praticité :</strong> Nos services de lavage et de nettoyage se déplacent à l’endroit où vous en avez besoin.</li>
      <li><strong>Matériel de pointe :</strong> Nous utilisons des équipements de haute qualité qui nous permettent d’offrir des services comparables à ceux d’autres continents (Europe, Amérique, etc.).</li>
      <li><strong>Professionnalisme :</strong> Nos techniciens expérimentés vous garantissent un nettoyage de qualité.</li>
    </ul>
  </section>

  <section class="about-book-now">
    <h3>Réservez dès maintenant !</h3>
    <p>N’hésitez pas à prendre rendez-vous le plus tôt possible pour profiter de nos services. Vous pouvez planifier un lavage ou un nettoyage à partir d’un simple appel téléphonique ou par messagerie sur nos réseaux sociaux.</p>
    <p><strong>La rapidité et la qualité, c’est nous !</strong> Profitez du savoir-faire et du professionnalisme de nos équipes.</p>
  </section>

  <section class="about-history">
    <h3>Notre Histoire</h3>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-content">
          <h4>2022</h4>
          <p>Fondée pour offrir des services exceptionnels de lavage et nettoyage.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="about-mission">
    <h3>Notre Mission</h3>
    <p>Offrir la meilleure expérience client avec des services de haute qualité et établir des relations durables.</p>
  </section>

  <section class="about-values">
    <h3>Nos Valeurs</h3>
    <ul>
      <li><strong>Intégrité:</strong> Standards élevés dans toutes nos actions.</li>
      <li><strong>Qualité:</strong> Excellence dans chaque service.</li>
      <li><strong>Orientation Client:</strong> Nos clients au cœur de nos actions.</li>
      <li><strong>Esprit d'Équipe:</strong> Travaillons ensemble vers nos objectifs communs.</li>
    </ul>
  </section>

  <section class="about-team">
    <h3>Notre Équipe</h3>
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
    <h3>Rejoignez-Nous</h3>
    <p>Pour en savoir plus sur nos services ou rejoindre notre communauté, <a routerLink="/contact" routerLinkActive="active">Contactez-nous</a> !</p>
  </section>
</div>
  </div>

  `,
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent { 
  teamMembers = [
    {
      name: 'Frank M',
      position: 'CEO',
      image: 'assets/profile-pic.png',
      bio: 'Frank est passionné par le nettoyage et s engage à offrir un service exceptionnel. Il dirige notre équipe avec énergie et dévouement.'
    },
    // {
    //   name: 'Jane Smith',
    //   position: 'Project Manager',
    //   image: 'assets/images/jane.jpg',
    //   bio: 'Jane ensures that every project runs smoothly and meets our high standards of quality.'
    // },
    // {
    //   name: 'Emily Johnson',
    //   position: 'Lead Developer',
    //   image: 'assets/images/emily.jpg',
    //   bio: 'Emily specializes in innovative solutions and is passionate about technology and design.'
    // },
    // {
    //   name: 'Michael Brown',
    //   position: 'Designer',
    //   image: 'assets/images/michael.jpg',
    //   bio: 'Michael brings creativity and a keen eye for detail to every project, ensuring our services shine.'
    // }
  ];
}
