import './globals.css';

export const metadata = {
  title: 'ALTRISIA',
  description: 'Mini plateforme de bénévolat',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">ALTRISIA</h1>
            <nav>
              <a href="/" className="mr-4 hover:underline">Accueil</a>
              <a href="/login" className="hover:underline">Connexion</a>
              <a href="/registration" className="hover:underline">S'inscrire</a>
            </nav>
          </div>
        </header>

        <main className="container mx-auto p-4">
          {children}
        </main>

        <footer className="bg-gray-800 text-white p-4 mt-8 text-center">
          &copy; 2025 ALTRISIA. Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
