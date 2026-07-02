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
                const res = await API.get(`auth/get_user.php?email=${emailConnecte}`);
                if (res.data.success) {
    
                    setUser(res.data.data);
                } else {
                    declencherNotif(res.data.message, false);
                }
            } catch (err) {
                console.error("Erreur lors du chargement des données", err);
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

    const gérerMiseAJourProfil = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('auth/update_profil.php', user);
            if (res.data.success) {
                declencherNotif("Profil mis à jour avec succès !", true);
                setEnEdition(false);
                localStorage.setItem('user_name', user.nom);
                localStorage.setItem('user_prenom', user.prenom);
                localStorage.setItem('telephone', user.telephone);
            } else {
                declencherNotif(res.data.message, false);
            }
        } catch (err) {
            declencherNotif("Erreur lors de la mise à jour du profil", false);
        }
    };

    const gérerChangementMdp = async (e) => {
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
                declencherNotif("Mot de passe modifié avec succès !", true);
                setChangementMdp({ ancienMdp: '', nouveauMdp: '', confirmerMdp: '' });
                setModifierMdp(false);
            } else {
                declencherNotif(res.data.message, false);
            }
        } catch (err) {
            declencherNotif("Erreur lors de la modification du mot de passe", false);
        }
    };
    return (
    <div>
        <Navbar />
        <div className="container mt-4 mb-5" style={{ maxWidth: '800px' }}>
            <div className="row g-4">
                
                {/* INFORMATIONS PERSONNELLES */}
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm border-0">
                        <h4 className="mb-4 text-primary">👤 Informations personnelles</h4>
                        <form onSubmit={gérerMiseAJourProfil}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Nom</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={user.nom || ''} 
                                    readOnly={!enEdition} // Lasa false rehefa tsindrina ilay bokotra
                                    onChange={e => setUser({...user, nom: e.target.value})}
                                    required 
                                    style={{
                                        backgroundColor: !enEdition ? '#1a1d20' : '#ffffff', // Maizina raha tsy azo ovaina, fotsy raha azo ovaina
                                        color: !enEdition ? '#f8f9fa' : '#212529',
                                        borderColor: !enEdition ? '#495057' : '#ced4da',
                                        cursor: !enEdition ? 'not-allowed' : 'text' // Mampiseho hoe tsy azo kitihina raha tsy mbola enEdition
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Prénom(s)</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={user.prenom || ''} 
                                    readOnly={!enEdition}
                                    onChange={e => setUser({...user, prenom: e.target.value})}
                                    style={{
                                        backgroundColor: !enEdition ? '#1a1d20' : '#ffffff',
                                        color: !enEdition ? '#f8f9fa' : '#212529',
                                        borderColor: !enEdition ? '#495057' : '#ced4da',
                                        cursor: !enEdition ? 'not-allowed' : 'text'
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Adresse Email</label>
                                <input 
                                    type="email" 
                                    className="form-control"
                                    value={user.email || ''} 
                                    readOnly // Ny email dia tsy azo ovaina mihitsy (Zavatra tsara amin'ny fiarovana)
                                    style={{
                                        backgroundColor: '#1a1d20',
                                        color: '#f8f9fa',
                                        borderColor: '#495057',
                                        cursor: 'not-allowed'
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Numéro de téléphone</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={user.telephone || ''} 
                                    readOnly={!enEdition}
                                    onChange={e => setUser({...user, telephone: e.target.value})}
                                    style={{
                                        backgroundColor: !enEdition ? '#1a1d20' : '#ffffff',
                                        color: !enEdition ? '#f8f9fa' : '#212529',
                                        borderColor: !enEdition ? '#495057' : '#ced4da',
                                        cursor: !enEdition ? 'not-allowed' : 'text'
                                    }}
                                />
                            </div>

                            <div className="d-flex gap-2 mt-4">
                                {!enEdition ? (
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-warning w-100 fw-semibold" 
                                                        onClick={(e) => { 
                                                            e.preventDefault(); 
                                                            e.stopPropagation(); 
                                                            setEnEdition(true); 
                                                        }}
                                                    >
                                                        Modifier le profil
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button type="submit" className="btn btn-success w-50">Enregistrer</button>
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-secondary w-50" 
                                                            onClick={(e) => { 
                                                                e.preventDefault(); 
                                                                setEnEdition(false); 
                                                                chargerDonneesUtilisateur(); 
                                                            }}
                                                        >
                                                            Annuler
                                                        </button>
                                                    </>
                                                )}
                                
                            </div>
                        </form>
                    </div>
                </div>

                {/* SÉCURITÉ / MOT DE PASSE */}
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm border-0 h-100">
                        <h4 className="mb-4 text-danger">🔒 Sécurité</h4>
                        
                        {!modifierMdp ? (
                            <div className="text-center my-auto py-4">
                                <p className="text-muted small">Vous souhaitez sécuriser votre compte ?</p>
                                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => setModifierMdp(true)}>
                                    Changer le mot de passe
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={gérerChangementMdp}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Ancien mot de passe</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={changementMdp.ancienMdp}
                                        onChange={e => setChangementMdp({...changementMdp, ancienMdp: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Nouveau mot de passe</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={changementMdp.nouveauMdp}
                                        onChange={e => setChangementMdp({...changementMdp, nouveauMdp: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Confirmer le nouveau mot de passe</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={changementMdp.confirmerMdp}
                                        onChange={e => setChangementMdp({...changementMdp, confirmerMdp: e.target.value})}
                                        required 
                                    />
                                </div>

                                <div className="d-flex gap-2 mt-4">
                                    <button type="submit" className="btn btn-danger w-50" >Mettre à jour</button>
                                    <button type="button" className="btn btn-secondary w-50" 
                                    onClick={() => { setModifierMdp(false); 
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