import AdminLayout from '../../components/layout/AdminLayout';
import AdminAbstracts from '../../components/AdminAbstracts';
import AdminProtectedRoute from '../../components/layout/AdminProtectedRoute';
import AdminRoute from '../../components/layout/AdminRoute';

export default () => {
  return (
    <>
      <AdminRoute>
        <AdminProtectedRoute>
          <AdminLayout>
            <section className="AdminAbstracts">
              <div className="AdminAbstracts__inner">
                <AdminAbstracts />
              </div>
            </section>
          </AdminLayout>
        </AdminProtectedRoute>
      </AdminRoute>

      <style jsx>{`
        .AdminAbstracts {
          height: calc(100vh - 90px - 2rem);
          overflow: auto;
          overflow-x: hidden;
          border-radius: 8px;
          box-shadow: 0 1px 3.5px 0 rgba(0, 0, 0, 0.15);
          background-color: #fff;
          font-size: 1rem;
        }

        .AdminAbstracts::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          background-color: #f5f5f5;
        }

        .AdminAbstracts::-webkit-scrollbar {
          width: 4px;
          background-color: #f5f5f5;
        }

        .AdminAbstracts::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          background-color: #555;
        }

        .AdminAbstracts__inner {
          min-height: calc(100vh - 8.5rem - 2rem);
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
      `}</style>
    </>
  );
};
