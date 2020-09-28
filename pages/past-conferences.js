import MainLayout from '../components/layout/MainLayout';
import PastConferences from '../components/PastConferences';
import UserRoute from '../components/layout/UserRoute';

export default () => {
  return (
    // <>
    <UserRoute>
      <MainLayout>
        <PastConferences />
      </MainLayout>
    </UserRoute>
    // </>
  );
};
