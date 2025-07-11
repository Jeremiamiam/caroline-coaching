import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Badge, Divider } from '../components';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* HERO PRESENTATION */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-bold text-secondary mb-4">
                Qui suis-je ?
              </h1>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Caroline Bonnin
              </h2>
              <div className="space-y-3 mb-6">
                <Badge variant="secondary" className="mr-2">
                  Coach en Intelligence Amoureuse
                </Badge>
                <Badge variant="accent" className="mr-2">
                  Fondatrice de PlanCœur
                </Badge>
                <Badge variant="primary">
                  Formée par Florence Escaravage
                </Badge>
              </div>
              <p className="text-xl text-base-content/80 leading-relaxed">
                Maman, entrepreneuse, passionnée par la connexion humaine et l'amour vrai. 
                Mon approche : <strong>sensible, concrète, et profondément humaine</strong>.
              </p>
            </div>
            
            <div className="text-center">
              <div className="avatar">
                <div className="w-80 rounded-xl ring ring-secondary ring-offset-base-100 ring-offset-4">
                  <img src="/images/caroline-bonnin.jpg" alt="Caroline Bonnin - Coach en Intelligence Amoureuse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MON PARCOURS */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Mon parcours
          </h2>

          <div className="space-y-8">
            <Card className="bg-base-200 shadow-lg">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary mb-2">
                      Fondatrice de l'agence PlanCœur
                    </h3>
                    <p className="text-base-content/80 leading-relaxed">
                      J'ai créé PlanCœur, une agence de rencontres à Rennes, avec une vision : 
                      accompagner les célibataires vers des rencontres authentiques et des relations durables. 
                      Cette expérience m'a permis de comprendre les vraies difficultés rencontrées par les célibataires d'aujourd'hui.
                    </p>
                    <Link to="https://plancoeur.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-3">
                      <Button variant="secondary" size="sm">
                        Découvrir PlanCœur →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-base-200 shadow-lg">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎓</div>
                  <div>
                    <h3 className="text-2xl font-bold text-secondary mb-2">
                      Formation Love Intelligence
                    </h3>
                    <p className="text-base-content/80 leading-relaxed mb-3">
                      Formée pendant <strong>7 mois</strong> à la méthode Love Intelligence de Florence Escaravage, 
                      une approche révolutionnaire du coaching amoureux basée sur la compréhension des mécanismes 
                      inconscients qui régissent nos relations.
                    </p>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="text-sm text-base-content/70 italic">
                        "Florence Escaravage cherche depuis 18 ans un autre terme que 'coach' pour décrire 
                        ce métier unique qui allie psychologie, coaching et intelligence émotionnelle."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-base-200 shadow-lg">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary mb-2">
                      Créatrice du podcast "Rouge Cœur, Caro"
                    </h3>
                    <p className="text-base-content/80 leading-relaxed">
                      Un podcast qui parle d'amour avec <strong>lucidité, tendresse et audace</strong>. 
                      Des réflexions, des histoires vraies, des voix qui nous ressemblent. 
                      Un espace de parole libre sur les questions amoureuses.
                    </p>
                    <Link to="/podcast" className="inline-block mt-3">
                      <Button variant="accent" size="sm">
                        Écouter le podcast →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* MA VISION */}
      <section className="py-20 bg-secondary text-secondary-content">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ma vision du coaching amoureux
          </h2>
          
          <div className="prose prose-lg mx-auto">
            <blockquote className="text-2xl font-medium leading-relaxed opacity-90 not-italic border-none">
              "Nous avons tous besoin d'être aidés dans notre vie amoureuse. 
              On n'a pas eu d'éducation affective, et c'est normal de ne pas savoir comment faire."
            </blockquote>
          </div>

          <Divider className="my-12 opacity-30" />

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <Card className="bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-xl mb-3 text-primary">
                  Une aide concrète
                </h3>
                <p className="text-base-content/80">
                  Le coaching permet de changer complètement sa vie amoureuse 
                  grâce à des <strong>actions très concrètes</strong> et mesurables.
                </p>
              </div>
            </Card>

            <Card className="bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-xl mb-3 text-primary">
                  Un accompagnement bienveillant
                </h3>
                <p className="text-base-content/80">
                  Une aide <strong>exceptionnelle, soutenante et aidante</strong> 
                  d'une coach à toutes les étapes de votre parcours.
                </p>
              </div>
            </Card>

            <Card className="bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-xl mb-3 text-primary">
                  Une transformation durable
                </h3>
                <p className="text-base-content/80">
                  Pas de recettes magiques, mais un <strong>travail en profondeur</strong> 
                  pour des changements qui durent.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* POURQUOI CHOISIR CAROLINE */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Pourquoi travailler avec moi ?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2">À l'écoute</h3>
                  <p className="text-base-content/80">
                    Chaque personne est unique. J'adapte mon accompagnement à votre personnalité, 
                    votre histoire et vos objectifs spécifiques.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Lucide</h3>
                  <p className="text-base-content/80">
                    Sans jugement mais avec franchise. Je vous aide à voir clair dans vos schémas 
                    et à identifier ce qui vous empêche d'être heureux en amour.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Engagée</h3>
                  <p className="text-base-content/80">
                    Je ne lâche pas. Votre réussite amoureuse me tient à cœur et je vous accompagne 
                    jusqu'à ce que vous atteigniez vos objectifs.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Douce</h3>
                  <p className="text-base-content/80">
                    L'amour est un sujet sensible. J'aborde vos blessures et vos peurs avec 
                    toute la bienveillance qu'elles méritent.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Concrète</h3>
                  <p className="text-base-content/80">
                    Mes conseils sont actionables immédiatement. Vous repartez de chaque séance 
                    avec des outils pratiques à mettre en œuvre.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Humaine</h3>
                  <p className="text-base-content/80">
                    Maman et femme avant tout, je comprends les défis de la vie amoureuse moderne 
                    et les concilie avec les réalités du quotidien.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">
            Prêt(e) à faire connaissance ?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Commençons par un premier entretien gratuit pour voir si nous sommes faits pour travailler ensemble.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="min-w-[200px]">
                Premier entretien gratuit
              </Button>
            </Link>
            <Link to="/accompagnements">
              <Button variant="accent" size="lg" className="min-w-[200px]">
                Voir mes accompagnements
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 