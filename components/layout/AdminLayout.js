import Header from './Header';
import AdminNav from './AdminNav';
import { useRouter } from 'next/router';

const AdminLayout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <div className="AdminLayout">
        <Header />
        <main className="Main">
          <AdminNav pathname={router.pathname} />
          <div className="Main__Inner"> {children}</div>
        </main>
      </div>

      <style jsx>{`
        .AdminLayout {
          background-color: #f6f9fc;
          height: 100vh;
          padding-bottom: 2rem;
        }

        .Main {
          display: flex;
        }

        .Main__Inner {
          flex: 1 1 0;
          padding: 0 3rem 0 0;
        }
      `}</style>
    </>
  );
};

export default AdminLayout;
