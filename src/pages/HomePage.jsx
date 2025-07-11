import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Hero, Badge } from '../components';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* HERO SECTION */}
      <Hero className="min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <div className="avatar mb-6">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="/images/caroline-bonnin.jpg" alt="Caroline Bonnin - Coach en Intelligence Amoureuse" />
              </div>
            </div>
            <h1 className="text-6xl font-bold text-primary mb-4">
              Caroline Bonnin
            </h1>
            <p className="text-xl text-base-content/80 mb-2">
              Coach en Intelligence Amoureuse
            </p>
            <Badge variant="secondary" className="mb-6">
              Formée par Florence Escaravage - Méthode Love Intelligence
            </Badge>
            
            <p className="text-lg text-base-content leading-relaxed mb-8 max-w-2xl mx-auto">
              J'accompagne les <strong>célibataires</strong> et les <strong>couples</strong> à chaque étape de leur vie affective pour construire des relations saines, vraies et alignées.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="primary" size="lg" className="min-w-[200px]">
                  Premier entretien gratuit
                </Button>
              </Link>
              <Link to="/accompagnements">
                <Button variant="secondary" size="lg" className="min-w-[200px]">
                  Découvrir mes accompagnements
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/podcast">
                <Button variant="accent" size="sm">
                  Podcast "Rouge Cœur, Caro"
                </Button>
              </Link>
              <a href="https://plancoeur.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm">
                  Agence PlanCœur
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Hero>

      {/* SECTION POURQUOI LE COACHING */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
            Pourquoi le coaching amoureux ?
          </h2>
          
          <div className="prose prose-lg mx-auto text-center mb-12">
            <p className="text-xl leading-relaxed text-base-content">
              <strong>On ne nous a jamais appris à aimer.</strong> On n'a pas reçu d'éducation affective. 
              Et pourtant, tout ce qui compte dans nos vies, c'est ça : <em>aimer et être aimé</em>.
            </p>
            <p className="text-lg leading-relaxed text-base-content/80">
              Le coaching amoureux, ce n'est pas une recette magique. C'est une aide profonde, 
              soutenante, à toutes les étapes : pour rencontrer autrement, pour construire à deux, 
              ou pour réinventer son couple.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-primary text-2xl mb-4">
                  Pour les célibataires
                </h3>
                <p className="text-base-content/80">
                  De la rencontre à la relation construite. Apprendre à se connaître, 
                  à attirer et reconnaître la bonne personne, et construire une relation épanouissante.
                </p>
              </div>
            </Card>

            <Card className="bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-primary text-2xl mb-4">
                  Pour les couples
                </h3>
                <p className="text-base-content/80">
                  Pour sortir d'une impasse ou pour se réinventer. Retrouver la connexion, 
                  désamorcer les tensions et redessiner vos projets ensemble.
                </p>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/pourquoi">
              <Button variant="primary" size="lg">
                En savoir plus sur ma méthode
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION APERCU ACCOMPAGNEMENTS */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
            Mes accompagnements
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-primary text-primary-content shadow-xl">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-2xl mb-4">
                  Coaching à la carte
                </h3>
                <div className="text-3xl font-bold mb-2">130€</div>
                <p className="opacity-90 mb-4">Séance de 1h30</p>
                <p className="opacity-80">
                  Pour une problématique ponctuelle, une décision à prendre, une prise de recul.
                </p>
                <div className="card-actions justify-center mt-4">
                  <Link to="/accompagnements">
                    <Button variant="secondary">
                      Réserver
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="bg-secondary text-secondary-content shadow-xl">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-2xl mb-4">
                  Accompagnement 6 mois
                </h3>
                <div className="text-3xl font-bold mb-2">2400€</div>
                <p className="opacity-90 mb-4">ou 425€/mois</p>
                <p className="opacity-80">
                  Suivi régulier et structuré pour transformer durablement votre vie amoureuse.
                </p>
                <div className="card-actions justify-center mt-4">
                  <Link to="/accompagnements">
                    <Button variant="primary">
                      Découvrir
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="bg-accent text-accent-content shadow-xl">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-2xl mb-4">
                  Accompagnement couple
                </h3>
                <div className="text-3xl font-bold mb-2">Sur mesure</div>
                <p className="opacity-90 mb-4">7 mois</p>
                <p className="opacity-80">
                  Pour rétablir la connexion, désamorcer les tensions et retrouver l'élan à deux.
                </p>
                <div className="card-actions justify-center mt-4">
                  <Link to="/accompagnements">
                    <Button variant="primary">
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Card className="bg-warning/20 border border-warning inline-block">
              <div className="card-body">
                <h4 className="card-title justify-center text-warning">
                  Premier entretien offert
                </h4>
                <p className="text-base-content/80">
                  20-30 minutes pour faire connaissance et décider si nous travaillons ensemble
                </p>
                <Link to="/contact">
                  <Button variant="warning" className="mt-2">
                    Réserver maintenant
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 