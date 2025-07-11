import React, { useState } from 'react';
import { Button, Card, Input, Textarea, Alert, Badge, Divider } from '../components';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'entretien' // entretien, coaching, accompagnement
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici on intégrerait l'envoi du formulaire
    console.log('Formulaire soumis:', formData);
    setIsSubmitted(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-success/10 border border-success">
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-success text-2xl mb-4">
              Message envoyé !
            </h2>
            <p className="text-base-content/80 mb-4">
              Merci pour votre message. Je vous recontacterai dans les plus brefs délais 
              pour organiser notre premier entretien.
            </p>
            <Button 
              variant="success" 
              onClick={() => setIsSubmitted(false)}
              className="w-full"
            >
              Envoyer un autre message
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* HERO */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Contact & Réservation
          </h1>
          <p className="text-xl text-base-content/80 leading-relaxed">
            Prêt(e) à commencer votre transformation amoureuse ? 
            Réservons votre premier entretien gratuit !
          </p>
        </div>
      </section>

      {/* PREMIER ENTRETIEN GRATUIT */}
      <section className="py-8 bg-base-200">
        <div className="container mx-auto px-4 max-w-4xl flex justify-center">
          <Card className="w-full max-w-2xl bg-success/10 border border-success/20 shadow-lg">
            <div className="card-body p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary mb-4">Premier entretien gratuit</h2>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="font-medium">20-30 minutes</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <span className="font-medium">Visio ou présentiel</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <span className="font-medium">Totalement gratuit</span>
                  </div>
                </div>
                <p className="text-base-content/80">
                  Pour faire connaissance, évaluer votre situation et décider ensemble 
                  si nous travaillons ensemble.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* FORMULAIRE DE CONTACT */}
          <div>
            <Card className="bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    Réservons votre entretien
                  </h2>
                  <p className="text-base-content/70">
                    Quelques informations pour mieux vous accompagner
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* ÉTAPE 1: TYPE DE DEMANDE */}
                  <div className="bg-base-200/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-secondary mb-4">
                      1. Que souhaitez-vous ?
                    </h3>
                    <select 
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="select select-bordered select-lg w-full bg-base-100"
                      required
                    >
                      <option value="entretien">Premier entretien gratuit (20-30 min)</option>
                      <option value="coaching">Coaching à la carte - 130€ (1h30)</option>
                      <option value="accompagnement-6mois">Accompagnement 6 mois - 2400€</option>
                      <option value="accompagnement-couple">Accompagnement couple - Sur mesure</option>
                      <option value="question">Simple question</option>
                    </select>
                  </div>

                  {/* ÉTAPE 2: VOS INFORMATIONS */}
                  <div className="bg-base-200/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-secondary mb-4">
                      2. Vos coordonnées
                    </h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="label">
                            <span className="label-text font-medium">Prénom *</span>
                          </label>
                          <Input
                            name="name"
                            placeholder="Votre prénom"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="input-bordered input-lg w-full"
                          />
                        </div>
                        <div>
                          <label className="label">
                            <span className="label-text font-medium">Email *</span>
                          </label>
                          <Input
                            name="email"
                            type="email"
                            placeholder="votre.email@exemple.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="input-bordered input-lg w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="label">
                            <span className="label-text font-medium">Téléphone</span>
                            <span className="label-text-alt">Optionnel</span>
                          </label>
                          <Input
                            name="phone"
                            type="tel"
                            placeholder="06 12 34 56 78"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="input-bordered input-lg w-full"
                          />
                        </div>
                        <div>
                          <label className="label">
                            <span className="label-text font-medium">Sujet</span>
                            <span className="label-text-alt">Optionnel</span>
                          </label>
                          <Input
                            name="subject"
                            placeholder="Résumé en quelques mots"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="input-bordered input-lg w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ÉTAPE 3: VOTRE MESSAGE */}
                  <div className="bg-base-200/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-secondary mb-4">
                      3. Parlez-moi de vous
                    </h3>
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Votre message *</span>
                        <span className="label-text-alt">Soyez authentique</span>
                      </label>
                      <Textarea
                        name="message"
                        placeholder="Décrivez-moi votre situation amoureuse, vos défis, vos objectifs... Plus vous me donnez d'informations, mieux je pourrai vous accompagner lors de notre premier échange."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="textarea-bordered textarea-lg w-full"
                        required
                      />
                      <div className="text-right mt-2">
                        <span className="text-xs text-base-content/50">
                          {formData.message.length} caractères
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BOUTON SUBMIT */}
                  <div className="text-center pt-4">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="w-full md:w-auto md:px-12"
                    >
                      Envoyer ma demande
                    </Button>
                    <p className="text-xs text-base-content/60 mt-3">
                      Réponse garantie sous 24h maximum
                    </p>
                  </div>
                </form>
              </div>
            </Card>
          </div>

          {/* INFORMATIONS PRATIQUES */}
          <div className="space-y-6">
            {/* TARIFS */}
            <Card className="bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-xl text-secondary mb-4">
                  Tarifs
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Premier entretien</span>
                    <Badge variant="success">GRATUIT</Badge>
                  </div>
                  <Divider />
                  <div className="flex justify-between items-center">
                    <span>Coaching à la carte (1h30)</span>
                    <Badge variant="primary">130€</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Accompagnement 6 mois</span>
                    <Badge variant="secondary">2400€ ou 425€/mois</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Accompagnement couple</span>
                    <Badge variant="accent">Sur mesure</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* MODALITES */}
            <Card className="bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-xl text-secondary mb-4">
                  Modalités
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div>
                      <div className="font-medium">Présentiel</div>
                      <div className="text-base-content/70">Rennes et région</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div>
                      <div className="font-medium">Visio</div>
                      <div className="text-base-content/70">Zoom, Teams, ou autre</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div>
                      <div className="font-medium">Téléphone</div>
                      <div className="text-base-content/70">Pour les séances courtes</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* PAIEMENT */}
            <Card className="bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-xl text-secondary mb-4">
                  Paiement
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Paiement en ligne sécurisé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Virement bancaire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Facilités de paiement (accompagnements)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span>
                    <span>Facture fournie</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* CONTACT DIRECT */}
            <Card className="bg-primary text-primary-content shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">
                  Contact direct
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="opacity-90">contact@caroline-coaching.fr</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="opacity-90">06 XX XX XX XX</div>
                    </div>
                  </div>
                  <Divider className="opacity-30" />
                  <div className="text-center">
                    <p className="opacity-90 mb-3">
                      Vous préférez m'appeler directement ?
                    </p>
                    <Button variant="secondary" size="sm">
                      Prendre rendez-vous par téléphone
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* FOOTER RAPPEL */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h3 className="text-2xl font-bold text-secondary mb-4">
            Délai de réponse
          </h3>
          <p className="text-base-content/80">
            Je réponds à tous les messages dans un délai de <strong>24h maximum</strong>. 
            Pour les demandes urgentes, n'hésitez pas à me contacter directement par téléphone.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 