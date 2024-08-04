import Footer from '@/components/share/footer';
import Header from '@/components/share/header';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>{children}</div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
