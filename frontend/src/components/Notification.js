import React from 'react';

export default function Notification({ message, success }) {
    if (!message) return null; 

    return (
        <div 
            className={`alert ${success ? 'alert-success' : 'alert-danger'} text-center shadow-lg fixed-bottom mx-auto mb-4`} 
            style={{ width: '50%', zIndex: 1050, borderRadius: '10px' }}
        >
            <strong className="me-2">{success ? '✅ Success:' : '❌ Erreur:'}</strong> 
            {message}
        </div>
    );
}