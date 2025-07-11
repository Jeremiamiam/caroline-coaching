import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Alert, Badge, Divider } from '../components';

const AccompagnementsPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* HERO */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Mes accompagnements
          </h1>
          <p className="text-xl text-base-content/80 leading-relaxed">
            Différentes formules pour vous accompagner selon vos besoins et votre situation. 
            Toutes basées sur la <strong>méthode Love Intelligence</strong> de Florence Escaravage.
          </p>
        </div>
      </section>

      {/* PREMIER ENTRETIEN OFFERT */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Card className="bg-success/10 border border-success shadow-lg">
            <div className="card-body">
              <h3 className="text-2xl font-bold mb-2 text-success">Premier entretien offert</h3>
              <p className="text-lg text-base-content/80">
                <strong>20-30 minutes</strong> pour faire connaissance, poser le cadre et décider ensemble 
                si nous travaillons ensemble. En visio ou en présentiel à Rennes.
              </p>
              <Link to="/contact" className="inline-block mt-4">
                <Button variant="success" size="lg">
                  Réserver mon entretien gratuit
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* COACHING INDIVIDUEL */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-secondary">
            Coaching individuel - Célibataires
          </h2>
          <p className="text-center text-base-content/80 mb-12 max-w-2xl mx-auto">
            Pour vous accompagner de la rencontre à la relation construite
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* COACHING A LA CARTE */}
            <Card className="bg-base-100 shadow-xl border-2 border-primary/20 hover:border-primary/50 transition-colors">
              <div className="card-body">
                <div className="text-center mb-6">
                  <h3 className="card-title justify-center text-2xl text-primary mb-2">
                    Coaching à la carte
                  </h3>
                  <div className="text-4xl font-bold text-primary">130€</div>
                  <p className="text-base-content/60">la séance de 1h30</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Séance de 1h30 en profondeur</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>En visio, téléphone ou présentiel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Problématique ponctuelle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Prise de recul et conseil expert</span>
                  </div>
                </div>

                <div className="card-actions justify-center mt-6">
                  <Link to="/contact">
                    <Button variant="primary" size="lg" className="w-full">
                      Réserver une séance
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* ACCOMPAGNEMENT 6 MOIS */}
            <Card className="bg-base-100 shadow-xl border-2 border-secondary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  ⭐ RECOMMANDÉ
                </Badge>
              </div>
              
              <div className="card-body pt-8">
                <div className="text-center mb-6">
                  <h3 className="card-title justify-center text-2xl text-secondary mb-2">
                    Accompagnement 6 mois
                  </h3>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-secondary">2400€</div>
                    <p className="text-base-content/60">en une fois</p>
                    <Divider className="my-2">ou</Divider>
                    <div className="text-2xl font-bold text-secondary">425€/mois</div>
                    <p className="text-base-content/60">sur 6 mois (2550€ total)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span><strong>1 séance</strong> toutes les 3 semaines ½</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span><strong>Suivi WhatsApp</strong> 5j/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span><strong>Outils personnalisés</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Transformation durable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>En visio ou face à face</span>
                  </div>
                </div>

                <div className="card-actions justify-center mt-6">
                  <Link to="/contact">
                    <Button variant="secondary" size="lg" className="w-full">
                      Commencer mon accompagnement
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* COACHING COUPLE */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-secondary">
            Coaching de couple
          </h2>
          <p className="text-center text-base-content/80 mb-12 max-w-2xl mx-auto">
            Pour retrouver la connexion et réinventer votre relation
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* COACHING COUPLE A LA CARTE */}
            <Card className="bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="text-center mb-6">
                  <h3 className="card-title justify-center text-2xl text-accent mb-2">
                    Séances à la carte
                  </h3>
                  <div className="text-4xl font-bold text-accent">130€</div>
                  <p className="text-base-content/60">la séance de 1h30</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Séance de couple de 1h30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>En visio ou présentiel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Problématique ponctuelle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Médiation et conseil</span>
                  </div>
                </div>

                <div className="card-actions justify-center mt-6">
                  <Link to="/contact">
                    <Button variant="accent" size="lg" className="w-full">
                      Réserver
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* ACCOMPAGNEMENT COUPLE 7 MOIS */}
            <Card className="bg-base-100 shadow-xl border-2 border-accent">
              <div className="card-body">
                <div className="text-center mb-6">
                  <h3 className="card-title justify-center text-2xl text-accent mb-2">
                    Accompagnement 7 mois
                  </h3>
                  <div className="text-2xl font-bold text-accent">Sur mesure</div>
                  <p className="text-base-content/60">selon vos besoins</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-lg text-center mb-3">7 étapes pour votre couple :</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-accent font-bold">1.</span>
                      <span>Retrouver votre connexion émotionnelle</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent font-bold">2.</span>
                      <span>Apprivoiser les situations délicates</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent font-bold">3.</span>
                      <span>Désamorcer les tensions récurrentes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent font-bold">4.</span>
                      <span>Remplacer vos mauvaises habitudes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent font-bold">5.</span>
                      <span>Progresser avec un suivi régulier</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent font-bold">6.</span>
                      <span>Redessiner vos projets ensemble</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent font-bold">7.</span>
                      <span>Retrouver la connexion sexuelle</span>
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-center mt-6">
                  <Link to="/contact">
                    <Button variant="accent" size="lg" className="w-full">
                      Découvrir cet accompagnement
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FINAL */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Prêt(e) à transformer votre vie amoureuse ?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Commençons par un premier entretien gratuit pour faire connaissance 
            et voir comment je peux vous accompagner.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="min-w-[250px]">
              Réserver mon entretien gratuit
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AccompagnementsPage; 