// src/app/[lang]/not-found.tsx

export default function NotFound() {
    return (
        // On ne retourne que le contenu, pas <html> ou <body>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
}