import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

export default function BilanStats() {
    const [stats, setStats] = useState({ total: 0, minimal: 0, maximal: 0, chartData: [], labels: [] });

    useEffect(() => {
        const loadStats = async () => {
            const res = await API.get('employes/stats.php');
            setStats(res.data);
        };
        loadStats();
    }, []);

    const dataPie = {
        labels: stats.labels,
        datasets: [{
            data: stats.chartData,
            backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444'],
            borderColor: 'rgba(30, 41, 59, 0.8)',
            borderWidth: 2,
        }]
    };

    const statCardStyle = (gradient, shadowColor) => ({
        background: 'linear-gradient(135deg, ' + gradient + ')',
        border: 'none',
        borderRadius: '16px',
        padding: '1.5rem',
        color: 'white',
        boxShadow: '0 4px 20px ' + shadowColor,
        transition: 'transform 0.2s ease',
        cursor: 'default'
    });

    return (
        <div className="page-enter">
            <Navbar />
            <div className="container" style={{ maxWidth: '1100px', marginTop: '2rem' }}>
                <div className="mb-4 anim-fade-in-up">
                    <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#f1f5f9' }}>Bilan Statistique</h2>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>Vue d'ensemble des salaires</p>
                </div>

                <div className="row g-4 mt-2">
                    <div className="col-12 col-md-4">
                        <div className="anim-fade-in-up anim-delay-1" style={statCardStyle('#3b82f6, #2563eb', 'rgba(59,130,246,0.3)')}>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <span style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: 500 }}>Salaire Total</span>
                                <div style={{
                                    width: '36px', height: '36px',
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="1" x2="12" y2="23"></line>
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                </div>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{parseInt(stats.total).toLocaleString()} Ar</h3>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="anim-fade-in-up anim-delay-2" style={statCardStyle('#22c55e, #16a34a', 'rgba(34,197,94,0.3)')}>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <span style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: 500 }}>Salaire Maximal</span>
                                <div style={{
                                    width: '36px', height: '36px',
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                        <polyline points="17 6 23 6 23 12"></polyline>
                                    </svg>
                                </div>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{parseInt(stats.maximal).toLocaleString()} Ar</h3>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="anim-fade-in-up anim-delay-3" style={statCardStyle('#f59e0b, #d97706', 'rgba(245,158,11,0.3)')}>
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <span style={{ fontSize: '0.85rem', opacity: 0.8, fontWeight: 500 }}>Salaire Minimal</span>
                                <div style={{
                                    width: '36px', height: '36px',
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                                        <polyline points="17 18 23 18 23 12"></polyline>
                                    </svg>
                                </div>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{parseInt(stats.minimal).toLocaleString()} Ar</h3>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="anim-fade-in-up anim-delay-4" style={{
                    background: 'rgba(30, 41, 59, 0.8)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginTop: '2rem',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)'
                }}>
                    <h5 style={{ marginBottom: '1.5rem', color: '#f1f5f9', fontWeight: 700 }}>Repartition des profils</h5>
                    <div className="text-center">
                        {stats.chartData && stats.chartData.length > 0 ? (
                            <div style={{ maxWidth: '350px', margin: '0 auto' }}>
                                <Pie data={dataPie} />
                            </div>
                        ) : (
                            <div style={{ padding: '3rem', color: 'rgba(255,255,255,0.35)' }}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                                </svg>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>Aucun employe enregistre</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
