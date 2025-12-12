import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { ErrorBoundary } from "./ErrorPage"; 
export const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Suspense fallback={null}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};