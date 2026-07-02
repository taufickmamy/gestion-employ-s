
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
    const navigate = useNavigate();
    const [estEnInscription, setEstEnInscription] = useState(false);

    // États pour stocker les informations des champs de formulaire
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    
    const [message, setMessage] = useState({ texte: '', estSucces: false });
    
    // État pour gérer le Mode Sombre / Mode Clair
    const [modeSombre, setModeSombre] = useState(false);

    // Vérification et application du thème enregistré au chargement de la page
    useEffect(() => {
        const themeEnregistre = localStorage.getItem('theme');
        if (themeEnregistre === 'dark') {
            setModeSombre(true);
            document.body.setAttribute('data-bs-theme', 'dark');
        } else {
            setModeSombre(false);
            document.body.setAttribute('data-bs-theme', 'light');
        }
    }, []);

    // Fonction pour basculer entre le Mode Sombre et le Mode Clair
    const basculerTheme = () => {
        if (modeSombre) {
            document.body.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
            setModeSombre(false);
        } else {
            document.body.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            setModeSombre(true);
        }
    };

    // Gestion de la soumission du formulaire
    const gérerSoumission = async (e) => {
        e.preventDefault();
        setMessage({ texte: '', estSucces: false });

        if (estEnInscription) {
            // Section INSCRIPTION
            try {
                const res = await API.post('auth/register.php', { 
                    nom, 
                    prenom, 
                    email, 
                    telephone, 
                    password: motDePasse 
                });
                
                if (res.data.success) {
                    setMessage({ texte: res.data.message, estSucces: true });
                    setEstEnInscription(false); // On bascule sur l'affichage Connexion après succès
                    setMotDePasse('');
                } else {
                    setMessage({ texte: res.data.message, estSucces: false });
                }
            } catch (err) {
                setMessage({ texte: "Erreur lors de l'inscription", estSucces: false });
            }
        } else {
            // Section CONNEXION
            try {
                const res = await API.post('auth/login.php', { email, password: motDePasse });
                
                if (res.data.success) {
                    // Sauvegarde du token et des données vitales pour la session et le Profil
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('user_name', res.data.user_name || 'Utilisateur');
                    
                    navigate('/ajout'); // Redirection après une connexion réussie
                } else {
                    setMessage({ texte: res.data.message, estSucces: false });
                }
            } catch (err) {
                setMessage({ texte: 'Email ou mot de passe incorrect !', estSucces: false });
            }
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center" style={{ position: 'relative' }}>
            
            {/* Bouton d'activation du Mode Sombre / Clair placé en haut à droite */}
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <button 
                    type="button"
                    className={`btn btn-sm fw-semibold d-flex align-items-center gap-2 ${modeSombre ? 'btn-outline-warning' : 'btn-outline-dark'}`}
                    onClick={basculerTheme}
                    style={{ borderRadius: '20px', transition: 'all 0.3s ease' }}
                >
                    {modeSombre ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
                </button>
            </div>

            {/* Boîte de formulaire (Card) */}
            <form className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '400px' }} onSubmit={gérerSoumission}>
                <h3 className="mb-4 text-center text-primary fw-bold">
                    {estEnInscription ? 'Créer un compte' : 'Authentification'}
                </h3>
                
                {/* Zone d'affichage des messages d'erreur ou de succès */}
                {message.texte && (
                    <div className={`alert ${message.estSucces ? 'alert-success' : 'alert-danger'} p-2 text-center small`}>
                        {message.texte}
                    </div>
                )}

                {/* Champs supplémentaires affichés uniquement pour l'Inscription */}
                {estEnInscription && (
                    <>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Nom</label>
                            <input type="text" className="form-control" value={nom} onChange={e => setNom(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Prénom</label>
                            <input type="text" className="form-control" value={prenom} onChange={e => setPrenom(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Numéro de Téléphone</label>
                            <input type="text" className="form-control" value={telephone} onChange={e => setTelephone(e.target.value)} required />
                        </div>
                    </>
                )}

                {/* Champs communs : Connexion & Inscription */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Adresse Email</label>
                    <input type="email" className="form-control" placeholder="exemple@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="form-label fw-semibold">Mot de passe</label>
                    <input type="password" className="form-control" placeholder="••••••••" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} required />
                </div>
                
                <button type="submit" className="btn btn-primary w-100 mb-3 fw-bold py-2 shadow-sm">
                    {estEnInscription ? "S'inscrire" : "Se connecter"}
                </button>

                {/* Bouton de basculement d'affichage en bas de la carte */}
                <div className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-link btn-sm text-decoration-none fw-semibold" 
                        onClick={() => {
                            setEstEnInscription(!estEnInscription);
                            setMessage({ texte: '', estSucces: false });
                        }}
                    >
                        {estEnInscription ? "Déjà inscrit ? Se connecter" : "Pas de compte ? Créer un compte"}
                    </button>
                </div>
            </form>
        </div>
    );
}