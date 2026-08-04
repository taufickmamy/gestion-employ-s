import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/LandingPage.css';

export default function LandingPage() {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
    }, []);

    return (
        <div className={`landing-page ${loaded ? 'loaded' : ''}`}>
            {/* Background */}
            <div className="landing-bg">
                <img src="/img/font.png" alt="" className="landing-bg-img" />
                <div className="landing-overlay"></div>
            </div>

            {/* Navbar */}
            <nav className="landing-nav">
                <div className="landing-nav-container">
                    <div className="landing-brand">
                        <div className="brand-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <span className="brand-text">GestEmploi</span>
                    </div>
                    <div className="landing-nav-actions">
                        <button className="btn-landing-ghost" onClick={() => navigate('/login')}>
                            Connexion
                        </button>
                        <button className="btn-landing-primary" onClick={() => navigate('/login')}>
                            S'inscrire
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="landing-hero">
                <div className="hero-content">
                    <div className="hero-badge">Solution de Gestion Moderne</div>
                    <h1 className="hero-title">
                        Gerez vos <span className="text-gradient">Employes</span> en toute simplicite
                    </h1>
                    <p className="hero-subtitle">
                        Une plateforme professionnelle pour gerer, suivre et optimiser 
                        la gestion de vos employes. Simple, rapide et efficace.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-hero-primary" onClick={() => navigate('/login')}>
                            Commencer maintenant
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                        <button className="btn-hero-secondary" onClick={() => {
                            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            En savoir plus
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="landing-features" id="features">
                <div className="features-container">
                    <div className="features-header">
                        <h2 className="features-title">Pourquoi nous choisir ?</h2>
                        <p className="features-subtitle">Des outils puissants pour une gestion efficace</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon feature-icon-blue">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="8.5" cy="7" r="4"></circle>
                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                </svg>
                            </div>
                            <h3 className="feature-title">Gestion des Employes</h3>
                            <p className="feature-desc">
                                Ajoutez, modifiez et supprimez les informations de vos employes en quelques clics.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon feature-icon-green">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </div>
                            <h3 className="feature-title">Suivi des Salaires</h3>
                            <p className="feature-desc">
                                Visualisez et analysez la repartition des salaires avec des statistiques detaillees.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon feature-icon-purple">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                                </svg>
                            </div>
                            <h3 className="feature-title">Bilan & Statistiques</h3>
                            <p className="feature-desc">
                                Des graphiques et tableaux de bord pour prendre des decisions eclairees.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-container">
                    <div className="footer-brand">
                        <div className="brand-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <span>GestEmploi</span>
                    </div>
                    <p className="footer-copy">&copy; 2026 GestEmploi. Tous droits reserves.</p>
                </div>
            </footer>
        </div>
    );
}
