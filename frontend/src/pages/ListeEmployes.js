import React, { useEffect, useState } from 'react';
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
            declencherNotif("La suppression a echoue", false);
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
            declencherNotif("La modification a echoue", false);
        }
    };

    const employesFiltres = employes.filter(emp => {
        const teny = recherche.toLowerCase();
        return (
            emp.nom.toLowerCase().includes(teny) ||
            emp.numemp.toString().toLowerCase().includes(teny)
        );
    });

    const cardStyle = {
        background: 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '1.25rem',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
    };

    return (
        <div className="page-enter">
            <Navbar />
            <div className="container" style={{ maxWidth: '1100px', marginTop: '2rem' }}>

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4 anim-fade-in-up" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#f1f5f9' }}>Liste des employes</h2>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>{employesFiltres.length} employe(s) trouve(s)</p>
                    </div>
                    <div style={{ width: '300px', position: 'relative' }} className="search-bar-responsive">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Rechercher par nom ou numero..."
                            style={{ paddingLeft: '2.2rem' }}
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="anim-fade-in-up anim-delay-2" style={cardStyle}>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="table" style={{ marginBottom: 0 }}>
                            <thead>
                                <tr>
                                    <th>N Employe</th>
                                    <th>Nom &amp; Prenom(s)</th>
                                    <th>Salaire</th>
                                    <th>Observation</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employesFiltres.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'rgba(255,255,255,0.35)' }}>
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.75rem' }}>
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="9" cy="7" r="4"></circle>
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                            </svg>
                                            <p style={{ margin: 0, fontSize: '0.9rem' }}>Aucun employe trouve</p>
                                        </td>
                                    </tr>
                                ) : (
                                    employesFiltres.map((emp) => (
                                        <tr key={emp.numemp}>
                                            <td style={{ fontWeight: 600, color: '#f1f5f9' }}>#{emp.numemp}</td>
                                            <td>{emp.nom}</td>
                                            <td style={{ fontWeight: 600, color: '#22c55e' }}>{parseInt(emp.salaire).toLocaleString()} Ar</td>
                                            <td>
                                                <span className={`badge ${
                                                    emp.obs === 'grand' ? 'bg-success' :
                                                    emp.obs === 'moyen' ? 'bg-warning' :
                                                    emp.obs === 'mediocre' ? 'bg-danger' : 'bg-secondary'
                                                }`}>
                                                    {emp.obs}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'right' }}>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{
                                                        background: 'rgba(245, 158, 11, 0.15)',
                                                        color: '#f59e0b',
                                                        border: '1px solid rgba(245, 158, 11, 0.25)',
                                                        borderRadius: '8px',
                                                        marginRight: '0.5rem',
                                                        fontWeight: 500,
                                                        fontSize: '0.82rem'
                                                    }}
                                                    onClick={() => {
                                                        setEmployeEnCours(emp);
                                                        setShowModalModif(true);
                                                    }}
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{
                                                        background: 'rgba(239, 68, 68, 0.15)',
                                                        color: '#ef4444',
                                                        border: '1px solid rgba(239, 68, 68, 0.25)',
                                                        borderRadius: '8px',
                                                        fontWeight: 500,
                                                        fontSize: '0.82rem'
                                                    }}
                                                    onClick={() => {
                                                        setIdASupprimer(emp.numemp);
                                                        setShowModalSuppr(true);
                                                    }}
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Suppression */}
            {showModalSuppr && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content anim-scale-in">
                            <div className="modal-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <h5 className="modal-title d-flex align-items-center gap-2" style={{ color: '#ef4444', fontWeight: 700 }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                        <line x1="12" y1="9" x2="12" y2="13"></line>
                                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                    </svg>
                                    Confirmer la suppression
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModalSuppr(false)}></button>
                            </div>
                            <div className="modal-body text-center" style={{ padding: '2rem' }}>
                                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', marginBottom: '0.5rem' }}>
                                    Voulez-vous vraiment supprimer l'employe <strong style={{ color: '#f1f5f9' }}>n {idASupprimer}</strong> ?
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem' }}>Cette action est irreversible.</p>
                            </div>
                            <div className="modal-footer justify-content-center" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1rem' }}>
                                <button type="button" className="btn btn-secondary px-4" onClick={() => setShowModalSuppr(false)}>Annuler</button>
                                <button type="button" className="btn btn-danger px-4" onClick={confirmerSuppression}>Supprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Modification */}
            {showModalModif && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content anim-scale-in">
                            <div className="modal-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <h5 className="modal-title d-flex align-items-center gap-2" style={{ color: '#f59e0b', fontWeight: 700 }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                    </svg>
                                    Modifier l'employe n {employeEnCours.numemp}
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModalModif(false)}></button>
                            </div>
                            <form onSubmit={gererModification}>
                                <div className="modal-body" style={{ padding: '1.5rem' }}>
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
                                    <div className="mb-0">
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
                                <div className="modal-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1rem' }}>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModalModif(false)}>Annuler</button>
                                    <button type="submit" className="btn btn-success">Enregistrer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Inline notification for ListeEmployes */}
            {notif.message && (
                <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1060,
                    maxWidth: '90%',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(20px)',
                    animation: 'slideUp 0.3s ease',
                    ...(notif.success ? {
                        background: 'rgba(34, 197, 94, 0.15)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        color: '#22c55e'
                    } : {
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#ef4444'
                    })
                }}>
                    {notif.success ? '\u2713' : '\u2715'} {notif.message}
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    .search-bar-responsive {
                        width: 100% !important;
                    }
                }
            `}</style>
        </div>
    );
}
