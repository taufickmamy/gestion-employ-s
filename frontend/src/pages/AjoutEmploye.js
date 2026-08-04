import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';
import API from '../services/api';

export default function AjoutEmploye() {
    const [formulaire, setFormulaire] = useState({ numemp: '', nom: '', salaire: '' });
    const [notif, setNotif] = useState({ message: '', success: true });
    const [numempError, setNumempError] = useState('');

    const declencherNotif = (msg, iconeSucces) => {
        setNotif({ message: msg, success: iconeSucces });
        setTimeout(() => setNotif({ message: '', success: true }), 4000);
    };

    const verifierNumemp = async (value) => {
        if (!value) {
            setNumempError('');
            return;
        }
        try {
            const res = await API.post('employes/check_numemp.php', { numemp: value });
            if (res.data.success && res.data.exists) {
                setNumempError('Ce numero employe existe deja');
            } else {
                setNumempError('');
            }
        } catch (err) {
            setNumempError('');
        }
    };

    const gererSoumission = async (e) => {
        e.preventDefault();
        const verif = await API.post('employes/check_numemp.php', { numemp: formulaire.numemp });
        if (verif.data.success && verif.data.exists) {
            declencherNotif('Ce numero employe existe deja', false);
            return;
        }
        try {
            const res = await API.post('employes/create.php', formulaire);
            if (res.data.success) {
                declencherNotif(res.data.message, true);
                setFormulaire({ numemp: '', nom: '', salaire: '' });
                setNumempError('');
            } else {
                declencherNotif(res.data.message, false);
            }
        } catch (err) {
            declencherNotif("L'insertion a echoue", false);
        }
    };

    return (
        <div className="page-enter">
            <Navbar />
            <div className="container" style={{ maxWidth: '600px', marginTop: '2rem', margin: '2rem auto', padding: '0 1rem' }}>
                <div className="anim-fade-in-up" style={{
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '2rem',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
                }}>
                    <div className="d-flex align-items-center gap-3 mb-4">
                        <div style={{
                            width: '42px', height: '42px',
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            borderRadius: '12px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 2px 10px rgba(34,197,94,0.3)'
                        }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#f1f5f9' }}>Ajouter un employe</h2>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Remplissez les informations ci-dessous</p>
                        </div>
                    </div>

                    <form onSubmit={gererSoumission}>
                        <div className="mb-3 anim-fade-in-up anim-delay-1">
                            <label className="form-label">Numero Employe</label>
                            <input
                                type="number"
                                className={`form-control ${numempError ? 'is-invalid' : ''}`}
                                value={formulaire.numemp}
                                onChange={e => {
                                    setFormulaire({...formulaire, numemp: e.target.value});
                                    setNumempError('');
                                }}
                                onBlur={e => verifierNumemp(e.target.value)}
                                required
                            />
                            {numempError && (
                                <div className="invalid-feedback">{numempError}</div>
                            )}
                        </div>

                        <div className="mb-3 anim-fade-in-up anim-delay-2">
                            <label className="form-label">Nom et Prenom(s)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formulaire.nom}
                                onChange={e => setFormulaire({...formulaire, nom: e.target.value})}
                                required
                            />
                        </div>

                        <div className="mb-4 anim-fade-in-up anim-delay-3">
                            <label className="form-label">Salaire (Ar)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={formulaire.salaire}
                                onChange={e => setFormulaire({...formulaire, salaire: e.target.value})}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-success w-100 py-2 anim-fade-in-up anim-delay-4" style={{ fontSize: '0.95rem' }}>
                            Enregistrer
                        </button>
                    </form>
                </div>
            </div>
            <Notification message={notif.message} success={notif.success} />
        </div>
    );
}
