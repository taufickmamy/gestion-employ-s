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
                setNumempError('Ce numéro employé existe déjà');
            } else {
                setNumempError('');
            }
        } catch (err) {
            setNumempError('');
        }
    };

    const gérerSoumission = async (e) => {
        e.preventDefault();
        const verif = await API.post('employes/check_numemp.php', { numemp: formulaire.numemp });
        if (verif.data.success && verif.data.exists) {
            declencherNotif('Ce numéro employé existe déjà', false);
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
            declencherNotif("L'insertion a échoué", false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container w-50 mt-4">
                <div className="card p-4 shadow">
                    <h2 className="mb-4">Ajouter un employé</h2>
                    <form onSubmit={gérerSoumission}>

                        <div className="mb-3">
                            <label className="form-label">Numéro Employé</label>
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

                        <div className="mb-3">
                            <label className="form-label">Nom et Prénom(s)</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={formulaire.nom} 
                                onChange={e => setFormulaire({...formulaire, nom: e.target.value})} 
                                required 
                            />
                        </div>

                        {/* Champ Salaire */}
                        <div className="mb-3">
                            <label className="form-label">Salaire (Ar)</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                value={formulaire.salaire} 
                                onChange={e => setFormulaire({...formulaire, salaire: e.target.value})} 
                                required 
                            />
                        </div>

                        <button type="submit" className="btn btn-success w-100">Enregistrer</button>
                    </form>
                </div>
            </div>
            <Notification message={notif.message} success={notif.success} />
        </div>
    );
}