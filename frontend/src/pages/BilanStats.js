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
            backgroundColor: ['#dc3545', '#ffc107', '#198754'],
        }]
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h2>Bilan Statistique</h2>
                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card p-3 bg-info text-white shadow"><h5>Salaire Total</h5><h3>{stats.total} Ar</h3></div>
                    </div>
                    <div className="col-md-4">
                        <div className="card p-3 bg-success text-white shadow"><h5>Salaire Maximal</h5><h3>{stats.maximal}Ar </h3></div>
                    </div>
                    <div className="col-md-4">
                        <div className="card p-3 bg-warning text-dark shadow"><h5>Salaire Minimal</h5><h3>{stats.minimal} Ar</h3></div>
                    </div>
                </div>
                <div className="row mt-5 justify-content-center">
                    <div className="col-md-4 text-center">
                        <h5 className="mb-3">Répartition des profils (Camembert)</h5>
                        {stats.chartData && stats.chartData.length > 0 ? <Pie data={dataPie} /> : <p>Aucun employé enregistré</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
