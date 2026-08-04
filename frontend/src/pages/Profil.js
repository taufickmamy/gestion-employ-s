import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';
import API from '../services/api';

export default function Profil() {
    const [user, setUser] = useState({ nom: '', prenom: '', email: '', telephone: '' });
    const [changementMdp, setChangementMdp] = useState({ ancienMdp: '', nouveauMdp: '', confirmerMdp: '' });
    const [notif, setNotif] = useState({ message: '', success: true });
    const [enEdition, setEnEdition] = useState(false);
    const [modifierMdp, setModifierMdp] = useState(false);

    const chargerDonneesUtilisateur = async () => {
        const emailConnecte = localStorage.getItem('email');
        if (emailConnecte) {
            try {
                const res = await API.get('auth/get_user.php?email=' + emailConnecte);
                if (res.data.success) {
                    setUser(res.data.data);
                } else {
                    declencherNotif(res.data.message, false);
                }
            } catch (err) {
                declencherNotif("Impossible de charger vos informations", false);
            }
        }
    };

    useEffect(() => {
        chargerDonneesUtilisateur();
    }, []);

    const declencherNotif = (msg, iconeSucces) => {
        setNotif({ message: msg, success: iconeSucces });
        setTimeout(() => setNotif({ message: '', success: true }), 4000);
    };

    const gererMiseAJourProfil = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('auth/update_profil.php', user);
            if (res.data.success) {
                declencherNotif("Profil mis a jour avec succes !", true);
                setEnEdition(false);
                localStorage.setItem('user_name', user.nom);
                localStorage.setItem('user_prenom', user.prenom);
            } else {
                declencherNotif(res.data.message, false);
            }
        } catch (err) {
            declencherNotif("Erreur lors de la mise a jour du profil", false);
        }
    };

    const gererChangementMdp = async (e) => {
        e.preventDefault();
        if (changementMdp.nouveauMdp !== changementMdp.confirmerMdp) {
            declencherNotif("Les nouveaux mots de passe ne correspondent pas !", false);
            return;
        }
        try {
            const res = await API.post('auth/update_password.php', {
                email: user.email,
                ancienMdp: changementMdp.ancienMdp,
                nouveauMdp: changementMdp.nouveauMdp
            });
            if (res.data.success) {
                declencherNotif("Mot de passe modifie avec succes !", true);
                setChangementMdp({ ancienMdp: '', nouveauMdp: '', confirmerMdp: '' });
                setModifierMdp(false);
            } else {
                declencherNotif(res.data.message, false);
            }
        } catch (err) {
            declencherNotif("Erreur lors de la modification du mot de passe", false);
        }
    };

    const cardStyle = {
        background: 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '1.75rem',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        height: '100%'
    };

    const inputStyle = (editable) => ({
        backgroundColor: editable ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.6)',
        color: '#f1f5f9',
        borderColor: editable ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255,255,255,0.1)',
        borderRadius: '10px',
        padding: '0.6rem 0.9rem',
        cursor: editable ? 'text' : 'not-allowed'
    });

    return (
        <div className="page-enter">
            <Navbar />
            <div className="container" style={{ maxWidth: '900px', marginTop: '2rem', marginBottom: '3rem' }}>
                <div className="mb-4 anim-fade-in-up">
                    <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#f1f5f9' }}>Mon Profil</h2>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>Gerez vos informations personnelles</p>
                </div>

                <div className="row g-4">

                    {/* INFORMATIONS PERSONNELLES */}
                    <div className="col-12 col-md-6">
                        <div className="anim-fade-in-up anim-delay-1" style={cardStyle}>
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <div style={{
                                    width: '36px', height: '36px',
                                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                    borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#f1f5f9' }}>Informations personnelles</h4>
                            </div>

                            <form onSubmit={gererMiseAJourProfil}>
                                <div className="mb-3">
                                    <label className="form-label">Nom</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.nom || ''}
                                        readOnly={!enEdition}
                                        onChange={e => setUser({...user, nom: e.target.value})}
                                        required
                                        style={inputStyle(enEdition)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Prenom(s)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.prenom || ''}
                                        readOnly={!enEdition}
                                        onChange={e => setUser({...user, prenom: e.target.value})}
                                        style={inputStyle(enEdition)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Adresse Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={user.email || ''}
                                        readOnly
                                        style={inputStyle(false)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Telephone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.telephone || ''}
                                        readOnly={!enEdition}
                                        onChange={e => setUser({...user, telephone: e.target.value})}
                                        style={inputStyle(enEdition)}
                                    />
                                </div>

                                <div className="d-flex gap-2 mt-4">
                                    {!enEdition ? (
                                        <button
                                            type="button"
                                            className="btn w-100"
                                            style={{
                                                background: 'rgba(245, 158, 11, 0.15)',
                                                color: '#f59e0b',
                                                border: '1px solid rgba(245, 158, 11, 0.25)',
                                                borderRadius: '10px',
                                                fontWeight: 600
                                            }}
                                            onClick={(e) => { e.preventDefault(); setEnEdition(true); }}
                                        >
                                            Modifier le profil
                                        </button>
                                    ) : (
                                        <>
                                            <button type="submit" className="btn btn-success w-50">Enregistrer</button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary w-50"
                                                onClick={(e) => { e.preventDefault(); setEnEdition(false); chargerDonneesUtilisateur(); }}
                                            >
                                                Annuler
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* SECURITE / MOT DE PASSE */}
                    <div className="col-12 col-md-6">
                        <div className="anim-fade-in-up anim-delay-2" style={cardStyle}>
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <div style={{
                                    width: '36px', height: '36px',
                                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                    borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </div>
                                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#f1f5f9' }}>Securite</h4>
                            </div>

                            {!modifierMdp ? (
                                <div className="text-center" style={{ padding: '2.5rem 1rem' }}>
                                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                        Vous souhaitez securiser votre compte ?
                                    </p>
                                    <button
                                        type="button"
                                        className="btn"
                                        style={{
                                            background: 'rgba(239, 68, 68, 0.15)',
                                            color: '#ef4444',
                                            border: '1px solid rgba(239, 68, 68, 0.25)',
                                            borderRadius: '10px',
                                            fontWeight: 600,
                                            padding: '0.6rem 1.5rem'
                                        }}
                                        onClick={() => setModifierMdp(true)}
                                    >
                                        Changer le mot de passe
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={gererChangementMdp}>
                                    <div className="mb-3">
                                        <label className="form-label">Ancien mot de passe</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={changementMdp.ancienMdp}
                                            onChange={e => setChangementMdp({...changementMdp, ancienMdp: e.target.value})}
                                            required
                                            style={inputStyle(true)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nouveau mot de passe</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={changementMdp.nouveauMdp}
                                            onChange={e => setChangementMdp({...changementMdp, nouveauMdp: e.target.value})}
                                            required
                                            style={inputStyle(true)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Confirmer</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={changementMdp.confirmerMdp}
                                            onChange={e => setChangementMdp({...changementMdp, confirmerMdp: e.target.value})}
                                            required
                                            style={inputStyle(true)}
                                        />
                                    </div>

                                    <div className="d-flex gap-2 mt-4">
                                        <button type="submit" className="btn btn-danger w-50">Mettre a jour</button>
                                        <button type="button" className="btn btn-secondary w-50"
                                            onClick={() => {
                                                setModifierMdp(false);
                                                setChangementMdp({ ancienMdp: '', nouveauMdp: '', confirmerMdp: '' });
                                            }}>
                                            Annuler
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Notification message={notif.message} success={notif.success} />
        </div>
    );
}
