import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('500ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
  template: `
    <div class="home-container">
      <div class="hero">
        <h1>
          Bienvenue chez FM Mobile Car Wash
          <span style="color:var(--primary-color)">Detailing</span>
        </h1>
        <p>
          Nettoyage de voiture pratique à votre porte, ainsi que des services de
          nettoyage pour maisons, canapés et après construction.
        </p>
        <a routerLink="/booking" routerLinkActive="active" class="cta-button"
          >Réservez Maintenant</a
        >
      </div>

      <section class="services" @fadeIn>
        <h2>Nos Services</h2>
        <div class="service-list">
          <div class="service-item">
            <img src="assets/exteriourWash.jpg" alt="Lavage Extérieur" />
            <h3>Lavage Extérieur</h3>
            <p>Nettoyage approfondi de l'extérieur de votre voiture.</p>
          </div>
          <div class="service-item">
            <img src="assets/interiourWash.jpg" alt="Nettoyage Intérieur" />
            <h3>Nettoyage Intérieur</h3>
            <p>
              Nettoyage en profondeur des sièges, des tapis et des surfaces.
            </p>
          </div>
          <div class="service-item">
            <img src="assets/waxing.jpg" alt="Cirage" />
            <h3>Cirage</h3>
            <p>Protégez votre peinture avec une finition en cire premium.</p>
          </div>
          <div class="service-item">
            <img src="assets/sofacleaning.jpg" alt="Nettoyage de Canapé" />
            <h3>Nettoyage de Canapé</h3>
            <p>Redonnez vie à vos canapés avec un nettoyage professionnel.</p>
          </div>
          <div class="service-item">
            <img src="assets/houseCleaning.jpg" alt="Nettoyage de Maison" />
            <h3>Nettoyage de Maison</h3>
            <p>Service de nettoyage complet pour un foyer impeccable.</p>
          </div>
          <div class="service-item">
            <img
              src="assets/postConstruction.jpg"
              alt="Nettoyage Post-Construction"
            />
            <h3>Nettoyage Post-Construction</h3>
            <p>Éliminez les débris et la poussière après vos travaux.</p>
          </div>
        </div>
      </section>
      <div class="floating-buttons">
        <a
          href="https://www.instagram.com"
          target="_blank"
          class="social-button instagram"
        >
          <img src="assets/instagram.png" alt="Instagram" />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          class="social-button facebook"
        >
          <img src="assets/facebook.png" alt="Facebook" />
        </a>
        <a
          href="https://www.tiktok.com"
          target="_blank"
          class="social-button tiktok"
        >
          <img src="assets/tik.png" alt="TikTok" />
        </a>
      </div>
      <button *ngIf="showButton" class="floating-button" (click)="scrollToTop()">
       <i class="fas fa-chevron-up"></i>
      </button>
      <div class="section-divider"></div>

      <section class="features">
        <h2>Pourquoi Choisir Nos Services ?</h2>
        <div class="feature-list">
          <div class="feature-item">
            <h3>Commodité</h3>
            <p>
              Nous venons à vous, vous faisant gagner du temps et des efforts.
            </p>
          </div>
          <div class="feature-item">
            <h3>Qualité</h3>
            <p>
              Notre équipe utilise des produits de première qualité pour des
              résultats optimaux.
            </p>
          </div>
          <div class="feature-item">
            <h3>Écologique</h3>
            <p>
              Nous utilisons des produits respectueux de l'environnement pour
              protéger notre planète.
            </p>
          </div>
          <div class="feature-item">
            <h3>Tarifs Abordables</h3>
            <p>
              Des prix compétitifs sans compromettre la qualité de nos services.
            </p>
          </div>
        </div>
      </section>

      <!-- <div class="section-divider"></div>

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
</section> -->

      <div class="section-divider"></div>

      <section class="pricing">
        <h2>Plans de Tarification pour le Lavage de Voiture</h2>
        <div class="pricing-list">
          <div class="pricing-item">
            <div class="pricing-block">
              <h3>Lavage de Base Express Intérieur/Extérieur</h3>
              <p class="price"><strong>Prix:</strong> <span>$50</span></p>
              <p>
                Un lavage extérieur rapide et efficace combiné à un aspirateur
                intérieur complet.
              </p>
              <div class="features">
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Aspiration de l'habitacle et du
                  coffre
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Dépoussiérage des plastiques
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Prélavage (mousse active)
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Lavage à la main
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage jantes (face
                  extérieure)
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Rinçage et séchage du véhicule
                </div>
              </div>
            </div>
          </div>
          <div class="pricing-item">
            <div class="pricing-block">
              <h3>Lavage Standard Intérieur/Extérieur Complet</h3>
              <p class="price"><strong>Prix:</strong> <span>$120</span></p>
              <p>
                Inclus tous les services du forfait de base plus un nettoyage
                intérieur détaillé et un entretien extérieur.
              </p>
              <div class="features">
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Prélavage (mousse active)
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Lavage à la main
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage jantes (face
                  extérieure)
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Rinçage et séchage du véhicule
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Aspiration de l'habitacle et du
                  coffre
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Dépoussiérage des plastiques (au
                  pinceau)
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Shampoing sièges, tissus, tapis
                  et moquette
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Dépoussiérage et nettoyage grille
                  d'aération
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage surface vitre
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage du compartiment moteur
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Rinçage et séchage
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Traitement des parties en
                  plastiques (dressing)
                </div>
              </div>
            </div>
          </div>
          <div class="pricing-item">
            <div class="pricing-block">
              <h3>Lavage Premium Intérieur/Extérieur Complet</h3>
              <p class="price"><strong>Prix:</strong> <span>$200</span></p>
              <p>
                Nettoyage complet incluant tout du forfait standard, plus cirage
                et éclat des pneus.
              </p>
              <div class="features">
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Prélavage (mousse active)
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Lavage à la main
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage jantes (face
                  extérieure)
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Rinçage et séchage du véhicule
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Aspiration de l'habitacle et du
                  coffre
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Dépoussiérage des plastiques (au
                  pinceau)
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Shampoing sièges, tissus, tapis
                  et moquette
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage surface vitre
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage du compartiment moteur
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Traitement et décontamination de
                  la carrosserie
                </div>
                <div class="pricing-feature">
                  <i class="fas fa-check"></i> Polissage de la carrosserie
                </div>
              </div>
              <div class="attention-section">
                <strong>Option : </strong> Traitement céramique = supplément de
                $150
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="section-divider"></div>

      <section class="pricing">
        <h2>Forfaits de Nettoyage à Domicile</h2>
        <div class="pricing-list">
          <div class="pricing-item">
            <div class="pricing-block">
              <h3>Nettoyage Canapé / Fauteuil / Matelat</h3>
              <div class="package-prices">
                <p class="price">
                  <strong>Canapé 2 à 4 places:</strong> <span>$50</span>
                </p>
                <p class="price">
                  <strong>Canapé 5 à 7 places:</strong> <span>$65</span>
                </p>
                <p class="price">
                  <strong>Canapé 8 places et plus:</strong> <span>$80</span>
                </p>
                <p class="price"><strong>Fauteuil:</strong> <span>$20</span></p>
                <p class="price"><strong>Matelas:</strong> <span>$35</span></p>
              </div>
              <p>
                Nettoyage régulier pour garder votre maison fraîche et propre.
              </p>
              <ul class="features">
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Aspiration
                </li>
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Désinfection à la vapeur
                </li>
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage à la brosse
                </li>
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Shampouinage
                </li>
              </ul>
            </div>
          </div>

          <div class="pricing-item">
            <div class="pricing-block">
              <h3>Nettoyage de Maison</h3>
              <p class="price">
                <strong>Prix: </strong> <span>Sur Devis</span>
              </p>
              <p>
                Service de nettoyage complet adapté à vos besoins spécifiques :
              </p>
              <ul class="features">
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage de toutes les surfaces
                </li>
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage approfondi des salles
                  de bains (joints inclus)
                </li>
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage intérieur des appareils
                  (four, micro-ondes)
                </li>
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Entretien des tissus
                  d'ameublement
                </li>
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Options personnalisées selon vos
                  besoins
                </li>
              </ul>
            </div>
          </div>

          <div class="pricing-item">
            <div class="pricing-block">
              <h3>Forfait de Nettoyage Post-Construction</h3>
              <p class="price">
                <strong>Prix: </strong> <span>Sur Devis</span>
              </p>
              <p>
                Nettoyage spécialisé après rénovation ou construction, incluant
                :
              </p>
              <ul class="features">
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Enlèvement des débris et déchets
                </li>
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Dépoussiérage complet (murs,
                  plafonds, surfaces)
                </li>
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage des fenêtres (intérieur
                  et extérieur)
                </li>
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Nettoyage approfondi des sols
                  (aspiration et lavage)
                </li>
                <li class="pricing-feature">
                  <i class="fas fa-check"></i> Finitions pour un résultat
                  impeccable
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div class="section-divider"></div>

      <section class="testimonials">
        <h2>Avis de Nos Clients</h2>
        <div class="testimonial-list">
          <div class="testimonial-item">
            <p class="testimonial-text">
              "Service fantastique ! Ma voiture a l'air toute neuve !"
            </p>
            <p class="client-name">— Jane Mwamba</p>
          </div>

          <div class="testimonial-item">
            <p class="testimonial-text">
              "La commodité d'un lavage de voiture à domicile est imbattable."
            </p>
            <p class="client-name">— John Kanda</p>
          </div>

          <div class="testimonial-item">
            <p class="testimonial-text">
              "L'équipe a fait un excellent travail. Je suis très satisfait."
            </p>
            <p class="client-name">— Léonard Kasongo</p>
          </div>

          <div class="testimonial-item">
            <p class="testimonial-text">
              "Je ne peux pas croire à quel point ma voiture brille après le
              lavage !"
            </p>
            <p class="client-name">— Amina Tshiyombo</p>
          </div>

          <div class="testimonial-item">
            <p class="testimonial-text">
              "Service rapide, efficace et très professionnel. Je recommande !"
            </p>
            <p class="client-name">— Chantal Mbuyi</p>
          </div>
        </div>
      </section>

      <div class="section-divider"></div>

      <section class="faq">
        <h2>Questions Fréquemment Posées</h2>

        <div class="faq-item">
          <h3>Comment réserver un service ?</h3>
          <p>
            Vous pouvez réserver un service via notre système de réservation en
            ligne.
          </p>
        </div>

        <div class="faq-item">
          <h3>Quels sont les zones desservies ?</h3>
          <p>
            Nous desservons plusieurs zones. Vérifiez notre site web pour les
            détails.
          </p>
        </div>

        <div class="faq-item">
          <h3>Vos produits sont-ils sans danger pour ma voiture ?</h3>
          <p>Oui, nous n'utilisons que des produits sûrs et écologiques.</p>
        </div>

        <div class="faq-item">
          <h3>Quels types de services proposez-vous ?</h3>
          <p>
            Nous proposons des services de nettoyage intérieur et extérieur,
            ainsi que des traitements spéciaux.
          </p>
        </div>

        <div class="faq-item">
          <h3>Combien de temps dure un service de nettoyage ?</h3>
          <p>
            La durée dépend du type de service, mais la plupart prennent entre 1
            et 3 heures.
          </p>
        </div>

        <div class="faq-item">
          <h3>Puis-je annuler ou reprogrammer ma réservation ?</h3>
          <p>
            Oui, vous pouvez annuler ou reprogrammer votre réservation jusqu'à
            24 heures avant le service.
          </p>
        </div>

        <div class="faq-item">
          <h3>Proposez-vous des forfaits pour les services récurrents ?</h3>
          <p>
            Oui, nous avons des forfaits avantageux pour les services
            récurrents. Contactez-nous pour plus d'informations.
          </p>
        </div>

        <div class="faq-item">
          <h3>Comment puis-je payer ?</h3>
          <p>
            Nous acceptons plusieurs méthodes de paiement, y compris les cartes
            de crédit et les paiements en ligne.
          </p>
        </div>
      </section>
    </div>
  `,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  currentImageIndex = 0;
  showButton = false;
  images = [
    'assets/car.png',
    'assets/logo.png',
    'assets/car.png',
    'assets/car.png',
    'assets/car.png',
    'assets/car.png',
  ];

  showImage(index: number) {
    this.currentImageIndex = index;
  }
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 100; // Adjust the number as needed
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
