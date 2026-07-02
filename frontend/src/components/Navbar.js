import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [menuOuvert, setMenuOuvert] = useState(false);
    

    const [modeSombre, setModeSombre] = useState(false);

    useEffect(() => {
        const utilisateur = localStorage.getItem('nom') || localStorage.getItem('email');
        if (utilisateur) {
            setNomUtilisateur(utilisateur);
        }

        // Vérification du thème enregistré lors de la session précédente
        const themeEnregistre = localStorage.getItem('theme');
        if (themeEnregistre === 'dark') {
            setModeSombre(true);
            document.body.setAttribute('data-bs-theme', '.dark');
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

    // Fonction de déconnexion
    const gérerDéconnexion = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/liste">🚀 GESTION</Link>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/ajout">Ajouter un employé</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/liste">Liste des employés</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/bilan">Bilan</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        {/* Bouton d'activation du Mode Sombre / Clair */}
                        <button 
                            className={`btn btn-sm fw-semibold d-flex align-items-center gap-2 ${modeSombre ? 'btn-outline-warning' : 'btn-outline-light'}`}
                            onClick={basculerTheme}
                            style={{ borderRadius: '20px', transition: 'all 0.3s ease' }}
                        >
                            {modeSombre ? '☀️' : '🌙'}
                        </button>

                        {/* Menu déroulant du profil de l'utilisateur */}
                        <div className="navbar-nav">
                            {nomUtilisateur && (
                                <div className={`nav-item dropdown ${menuOuvert ? 'show' : ''}`}>
                                    <div className="nav-link dropdown-toggle d-flex align-items-center text-warning fw-semibold" 
                                       role="button"
                                       onClick={() => setMenuOuvert(!menuOuvert)}
                                       style={{ cursor: 'pointer', userSelect: 'none' }}>
                                        
                                        <div className="bg-secondary rounded-circle d-flex justify-content-center align-items-center text-white me-2" 
                                             style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                                            {nomUtilisateur.charAt(0).toUpperCase()}
                                        </div>
                                        {nomUtilisateur}
                                    </div>
                                    
                                    <ul className={`dropdown-menu dropdown-menu-end shadow ${menuOuvert ? 'show' : ''}`} 
                                        style={{ position: 'absolute', right: 0, zIndex: 1050 }}>
                                        <li>
                                            <Link className="dropdown-item" to="/profil" onClick={() => setMenuOuvert(false)}>
                                                👤 Mon Profil
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button className="dropdown-item text-danger" onClick={gérerDéconnexion}>
                                                🚪 Déconnexion
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
}