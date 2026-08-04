import React from 'react';

export default function Notification({ message, success }) {
    if (!message) return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1060,
                width: 'fit-content',
                minWidth: '300px',
                maxWidth: 'min(500px, 90vw)',
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
                ...(success ? {
                    background: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: '#22c55e'
                } : {
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444'
                })
            }}
        >
            {success ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            )}
            {message}

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `}</style>
        </div>
    );
}
