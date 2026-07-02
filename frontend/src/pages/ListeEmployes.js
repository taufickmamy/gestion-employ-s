import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import API from '../services/api';

export default function ListeEmploye() {
    const [employes, setEmployes] = useState([]);
    const [notif, setNotif] = useState({ message: '', success: true });
    
    
    const [recherche, setRecherche] = useState('');


    const [showModalModif, setShowModalModif] = useState(false);
    const [showModalSuppr, setShowModalSuppr] = useState(false);
    
    const [employeEnCours, setEmployeEnCours] = useState({ numemp: '', nom: '', salaire: '' });
    const [idASupprimer, setIdASupprimer] = useState(null);

    const chargerEmployes = async () => {
        try {
            const res = await API.get('employes/read.php');
            if (Array.isArray(res.data)) {
                setEmployes(res.data);
            } else if (res.data.success && res.data.employes) {
                setEmployes(res.data.employes);
            }
        } catch (err) {
            declencherNotif("Impossible de charger la liste", false);
        }
    };

    useEffect(() => {
        chargerEmployes();
    }, []);

    const declencherNotif = (msg, iconeSucces) => {
        setNotif({ message: msg, success: iconeSucces });
        setTimeout(() => setNotif({ message: '', success: true }), 4000);
    };

    const confirmerSuppression = async () => {
        try {
            const res = await API.post('employes/delete.php', { numemp: idASupprimer });
            setShowModalSuppr(false);
            if (res.data.success) {
                declencherNotif(res.data.message, true);
                chargerEmployes();
            } else {
                declencherNotif(res.data.message, false);
            }
        } catch (err) {
            setShowModalSuppr(false);
            declencherNotif("La suppression a échoué", false);
        }
    };

    const gererModification = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('employes/update.php', employeEnCours);
            setShowModalModif(false);
            if (res.data.success) {
                declencherNotif(res.data.message, true);
                chargerEmployes();
            } else {
                declencherNotif(res.data.message, false);
            }
        } catch (err) {
            setShowModalModif(false);
            declencherNotif("La modification a échoué", false);
        }
    };

    const employesFilthres = employes.filter(emp => {
        const teny = recherche.toLowerCase();
        return (
            emp.nom.toLowerCase().includes(teny) || 
            emp.numemp.toString().toLowerCase().includes(teny)
        );
    });

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Liste des employés</h2>
                    <div style={{ width: '300px' }}>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Rechercher par nom ou numéro..." 
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)}
                        />
                    </div>
                </div>
                

                {notif.message && (
                    <div className={`alert ${notif.success ? 'alert-success' : 'alert-danger'} text-center shadow-sm mb-3`} role="alert">
                        {notif.message}
                    </div>
                )}

                <div className="card shadow p-3">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>N° Employé</th>
                                <th>Nom & Prénom(s)</th>
                                <th>Salaire</th>
                                <th>Observation</th> 
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employesFilthres.map((emp) => (
                                <tr key={emp.numemp}>
                                    <td>{emp.numemp}</td>
                                    <td>{emp.nom}</td>
                                    <td>{emp.salaire} Ar</td>
                                    
                                    
                                    <td>
                                        
                                        <span className={`badge ${
                                            emp.obs === 'grand' ? 'bg-success' : 
                                            emp.obs === 'moyen' ? 'bg-warning text-dark' : 
                                            emp.obs === 'médiocre' ? 'bg-danger' : 'bg-secondary'
                                        }`}>
                                            {emp.obs}
                                        </span>

                                    </td>

                                    <td>
                                        <button 
                                            className="btn btn-warning btn-sm me-2 text-white"
                                            onClick={() => {
                                                setEmployeEnCours(emp);
                                                setShowModalModif(true);
                                            }}
                                        >
                                            Modifier
                                        </button>
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setIdASupprimer(emp.numemp);
                                                setShowModalSuppr(true);
                                            }}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModalSuppr && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">Confirmation de suppression</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalSuppr(false)}></button>
                            </div>
                            <div className="modal-body text-center p-4">
                                <p className="mb-0 fs-5">Voulez-vous vraiment supprimer l'employé <strong>n° {idASupprimer}</strong> ?</p>
                                <p className="text-muted small mt-2">Cette action est irréversible.</p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-secondary px-4" onClick={() => setShowModalSuppr(false)}>Annuler</button>
                                <button type="button" className="btn btn-danger px-4" onClick={confirmerSuppression}>Oui, Supprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalModif && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-warning text-white">
                                <h5 className="modal-title">Modifier l'employé n° {employeEnCours.numemp}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModalModif(false)}></button>
                            </div>
                            <form onSubmit={gererModification}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Nom complet</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={employeEnCours.nom} 
                                            onChange={e => setEmployeEnCours({...employeEnCours, nom: e.target.value})} 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Salaire (Ar)</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            value={employeEnCours.salaire} 
                                            onChange={e => setEmployeEnCours({...employeEnCours, salaire: e.target.value})} 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModalModif(false)}>Annuler</button>
                                    <button type="submit" className="btn btn-success">Enregistrer les modifications</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}