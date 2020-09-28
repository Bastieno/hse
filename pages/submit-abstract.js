import ProtectedRoute from '../components/layout/ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';
import SubmitAbstract from '../components/SubmitAbstract';
import UserRoute from '../components/layout/UserRoute';

export default () => {
  return (
    <UserRoute>
      <ProtectedRoute>
        <MainLayout>
          <SubmitAbstract />
        </MainLayout>
      </ProtectedRoute>
    </UserRoute>
  );
};
