import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [menuOuvert, setMenuOuvert] = useState(false);
    const [mobileMenuOuvert, setMobileMenuOuvert] = useState(false);

    useEffect(() => {
        const utilisateur = localStorage.getItem('user_name') || localStorage.getItem('email');
        if (utilisateur) {
            setNomUtilisateur(utilisateur);
        }
    }, []);

    const gererDeconnexion = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="anim-fade-in-down" style={{
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '0.75rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div className="container-fluid d-flex align-items-center justify-content-between" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* Brand */}
                <Link to="/liste" className="text-decoration-none d-flex align-items-center gap-2">
                    <div style={{
                        width: '36px', height: '36px',
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                        borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 10px rgba(59,130,246,0.3)'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>GestEmploi</span>
                </Link>

                {/* Nav Links - desktop */}
                <div className="d-none d-md-flex align-items-center gap-1">
                    <Link to="/ajout" className="nav-link-custom">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Ajouter
                    </Link>
                    <Link to="/liste" className="nav-link-custom">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                        Liste
                    </Link>
                    <Link to="/bilan" className="nav-link-custom">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                            <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                        </svg>
                        Bilan
                    </Link>
                </div>

                {/* Hamburger button - mobile only */}
                <button
                    className="d-md-none"
                    onClick={() => setMobileMenuOuvert(!mobileMenuOuvert)}
                    style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '0.4rem',
                        color: '#f1f5f9',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '36px',
                        height: '36px'
                    }}
                >
                    {mobileMenuOuvert ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>

                {/* Right side */}
                <div className="d-flex align-items-center gap-3">
                    {/* User dropdown */}
                    {nomUtilisateur && (
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setMenuOuvert(!menuOuvert)}
                                className="d-flex align-items-center gap-2"
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '10px',
                                    padding: '0.4rem 0.8rem',
                                    color: '#f1f5f9',
                                    cursor: 'pointer',
                                    fontSize: '0.88rem',
                                    fontWeight: 500,
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{
                                    width: '28px', height: '28px',
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                    borderRadius: '8px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', fontSize: '0.75rem', fontWeight: 700
                                }}>
                                    {nomUtilisateur.charAt(0).toUpperCase()}
                                </div>
                                <span className="d-none d-sm-inline">{nomUtilisateur}</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>

                            {menuOuvert && (
                                <>
                                    <div
                                        onClick={() => setMenuOuvert(false)}
                                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1040 }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 'calc(100% + 8px)',
                                        background: '#1e293b',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        padding: '0.5rem',
                                        minWidth: '180px',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                        zIndex: 1050
                                    }}>
                                        <Link
                                            to="/profil"
                                            onClick={() => setMenuOuvert(false)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                                padding: '0.55rem 0.75rem',
                                                color: '#f1f5f9',
                                                textDecoration: 'none',
                                                borderRadius: '8px',
                                                fontSize: '0.88rem',
                                                fontWeight: 500,
                                                transition: 'background 0.15s'
                                            }}
                                            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.06)'}
                                            onMouseLeave={e => e.target.style.background = 'transparent'}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                            Mon Profil
                                        </Link>
                                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0.35rem 0' }} />
                                        <button
                                            onClick={gererDeconnexion}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                                padding: '0.55rem 0.75rem',
                                                color: '#ef4444',
                                                background: 'none',
                                                border: 'none',
                                                borderRadius: '8px',
                                                fontSize: '0.88rem',
                                                fontWeight: 500,
                                                width: '100%',
                                                cursor: 'pointer',
                                                transition: 'background 0.15s'
                                            }}
                                            onMouseEnter={e => e.target.style.background = 'rgba(239,68,68,0.1)'}
                                            onMouseLeave={e => e.target.style.background = 'none'}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                <polyline points="16 17 21 12 16 7"></polyline>
                                                <line x1="21" y1="12" x2="9" y2="12"></line>
                                            </svg>
                                            Deconnexion
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile menu dropdown */}
            <div className="mobile-nav-menu" style={{
                maxHeight: mobileMenuOuvert ? '300px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease, opacity 0.3s ease',
                opacity: mobileMenuOuvert ? 1 : 0,
                borderTop: mobileMenuOuvert ? '1px solid rgba(255,255,255,0.06)' : 'none'
            }}>
                <div className="d-flex d-md-none flex-column gap-1" style={{ padding: '0.5rem 1.5rem' }}>
                    <Link to="/ajout" className="nav-link-custom" onClick={() => setMobileMenuOuvert(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Ajouter
                    </Link>
                    <Link to="/liste" className="nav-link-custom" onClick={() => setMobileMenuOuvert(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                        Liste
                    </Link>
                    <Link to="/bilan" className="nav-link-custom" onClick={() => setMobileMenuOuvert(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                            <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                        </svg>
                        Bilan
                    </Link>
                </div>
            </div>

            <style>{`
                .nav-link-custom {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.45rem 0.85rem;
                    color: rgba(255,255,255,0.6);
                    text-decoration: none;
                    border-radius: 8px;
                    font-size: 0.88rem;
                    font-weight: 500;
                    transition: all 0.2s ease;
                }
                .nav-link-custom:hover {
                    color: #f1f5f9;
                    background: rgba(255,255,255,0.06);
                }
            `}</style>
        </nav>
    );
}
