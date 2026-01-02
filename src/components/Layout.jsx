import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { ErrorBoundary } from "./ErrorPage";
import LogisticsEngine from "./LogisticsEngine";

export const Layout = () => {
  return (
    <div>
      <LogisticsEngine />
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
