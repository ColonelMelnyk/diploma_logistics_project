import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
export const Layout = () => {
  return (
    <div>
      <Header />
      <main >
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer/>
    </div>
  );
};