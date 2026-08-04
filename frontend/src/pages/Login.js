
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Login() {
    const navigate = useNavigate();
    const [estEnInscription, setEstEnInscription] = useState(false);

    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');

    const [message, setMessage] = useState({ texte: '', estSucces: false });

    const gererSoumission = async (e) => {
        e.preventDefault();
        setMessage({ texte: '', estSucces: false });

        if (estEnInscription) {
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
                    setEstEnInscription(false);
                    setMotDePasse('');
                } else {
                    setMessage({ texte: res.data.message, estSucces: false });
                }
            } catch (err) {
                setMessage({ texte: "Erreur lors de l'inscription", estSucces: false });
            }
        } else {
            try {
                const res = await API.post('auth/login.php', { email, password: motDePasse });

                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('user_name', res.data.user_name || 'Utilisateur');

                    navigate('/ajout');
                } else {
                    setMessage({ texte: res.data.message, estSucces: false });
                }
            } catch (err) {
                setMessage({ texte: 'Email ou mot de passe incorrect !', estSucces: false });
            }
        }
    };

    const inputStyle = {
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        border: '1.5px solid rgba(255,255,255,0.12)',
        borderRadius: '10px',
        padding: '0.65rem 0.9rem',
        color: '#f1f5f9',
        fontSize: '0.92rem'
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>

            {/* Animated gradient overlay */}
            <div className="anim-float" style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle at 30% 50%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(139,92,246,0.06) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            {/* Top bar */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
                <Link to="/" className="text-decoration-none d-flex align-items-center gap-2" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Accueil
                </Link>
            </div>

            {/* Login Card */}
            <div className="anim-scale-in" style={{
                width: '100%',
                maxWidth: '420px',
                background: 'rgba(30, 41, 59, 0.85)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '2.5rem',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                margin: '0 1rem',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Logo */}
                <div className="text-center mb-4">
                    <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" style={{
                        width: '56px', height: '56px',
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                        borderRadius: '14px',
                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.35)'
                    }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.35rem', marginBottom: '0.3rem' }}>
                        {estEnInscription ? 'Creer un compte' : 'Bienvenue'}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', margin: 0 }}>
                        {estEnInscription ? 'Remplissez les informations ci-dessous' : 'Connectez-vous pour continuer'}
                    </p>
                </div>

                {/* Messages */}
                {message.texte && (
                    <div style={{
                        padding: '0.6rem 1rem',
                        borderRadius: '10px',
                        textAlign: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        marginBottom: '1rem',
                        ...(message.estSucces ? {
                            background: 'rgba(34, 197, 94, 0.15)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            color: '#22c55e'
                        } : {
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#ef4444'
                        })
                    }}>
                        {message.texte}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={gererSoumission}>
                    {estEnInscription && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Nom</label>
                                <input type="text" className="form-control" style={inputStyle} value={nom} onChange={e => setNom(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Prenom</label>
                                <input type="text" className="form-control" style={inputStyle} value={prenom} onChange={e => setPrenom(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Telephone</label>
                                <input type="text" className="form-control" style={inputStyle} value={telephone} onChange={e => setTelephone(e.target.value)} required />
                            </div>
                        </>
                    )}

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="exemple@gmail.com" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" placeholder="********" style={inputStyle} value={motDePasse} onChange={e => setMotDePasse(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2" style={{ fontSize: '0.95rem' }}>
                        {estEnInscription ? "S'inscrire" : "Se connecter"}
                    </button>
                </form>

                {/* Toggle */}
                <div className="text-center mt-3">
                    <button
                        type="button"
                        onClick={() => {
                            setEstEnInscription(!estEnInscription);
                            setMessage({ texte: '', estSucces: false });
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#3b82f6',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '6px',
                            transition: 'all 0.2s'
                        }}
                    >
                        {estEnInscription ? "Deja inscrit ? Se connecter" : "Pas de compte ? Creer un compte"}
                    </button>
                </div>
            </div>
        </div>
    );
}
