import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Badge } from '../components';

const PodcastPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* HERO */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-accent mb-6">
            Rouge Cœur, Caro
          </h1>
          <p className="text-2xl text-base-content/80 mb-4">
            Le podcast qui parle d'amour avec <strong>lucidité, tendresse et audace</strong>
          </p>
          <Badge variant="accent" className="text-lg px-4 py-2">
            Nouveau podcast par Caroline Bonnin
          </Badge>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-6">
              Un espace de parole libre sur l'amour
            </h2>
            <p className="text-xl text-base-content/80 leading-relaxed">
              Des réflexions, des histoires vraies, des voix qui nous ressemblent. 
              Un podcast authentique qui aborde les questions amoureuses sans tabou.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="w-full bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-xl mb-3">
                  Lucidité
                </h3>
                <p className="text-base-content/80">
                  Des analyses franches et honnêtes sur les relations amoureuses, 
                  sans langue de bois ni faux romantisme.
                </p>
              </div>
            </Card>

            <Card className="w-full bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-xl mb-3">
                  Tendresse
                </h3>
                <p className="text-base-content/80">
                  Une approche bienveillante qui respecte la sensibilité 
                  de chacun face aux questions amoureuses.
                </p>
              </div>
            </Card>

            <Card className="w-full bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-xl mb-3">
                  Audace
                </h3>
                <p className="text-base-content/80">
                  Oser parler des sujets qui fâchent, briser les tabous 
                  et aborder l'amour sous tous ses aspects.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ECOUTER LE PODCAST */}
      <section className="py-20 bg-accent text-accent-content">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-8">
            Écouter Rouge Cœur, Caro
          </h2>
          
          <div className="bg-accent-content/10 p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Podcast en cours de création
            </h3>
            <p className="text-xl opacity-90 mb-6">
              Le podcast "Rouge Cœur, Caro" sera bientôt disponible sur toutes les plateformes. 
              Restez connectés pour découvrir les premiers épisodes !
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="w-full bg-accent-content text-accent shadow-xl">
              <div className="card-body text-center">
                <h4 className="font-bold">Spotify</h4>
                <p className="text-sm opacity-80">Bientôt disponible</p>
              </div>
            </Card>

            <Card className="w-full bg-accent-content text-accent shadow-xl">
              <div className="card-body text-center">
                <h4 className="font-bold">Apple Podcasts</h4>
                <p className="text-sm opacity-80">Bientôt disponible</p>
              </div>
            </Card>

            <Card className="w-full bg-accent-content text-accent shadow-xl">
              <div className="card-body text-center">
                <h4 className="font-bold">Autres plateformes</h4>
                <p className="text-sm opacity-80">Google Podcasts, Deezer...</p>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <p className="text-lg opacity-90">
              En attendant, n'hésitez pas à me contacter pour échanger sur vos questions amoureuses !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Me contacter
                </Button>
              </Link>
              <Link to="/accompagnements">
                <Button variant="primary" size="lg">
                  Découvrir mes accompagnements
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THEMATIQUES */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary">
            Thématiques abordées
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-bold text-lg">Ruptures et séparations</h4>
                  <p className="text-base-content/70">Comment traverser et grandir après une rupture</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-bold text-lg">Rencontres et célibat</h4>
                  <p className="text-base-content/70">Apprivoiser sa solitude et rencontrer authentiquement</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-bold text-lg">Vie de couple</h4>
                  <p className="text-base-content/70">Construire et maintenir une relation épanouie</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-bold text-lg">Estime de soi</h4>
                  <p className="text-base-content/70">S'aimer pour mieux aimer les autres</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-bold text-lg">Schémas amoureux</h4>
                  <p className="text-base-content/70">Comprendre et transformer nos patterns relationnels</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <h4 className="font-bold text-lg">Évolution personnelle</h4>
                  <p className="text-base-content/70">Grandir et évoluer à travers nos expériences amoureuses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodcastPage; 