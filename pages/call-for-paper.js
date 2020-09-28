import React from 'react';
import { Card } from 'antd';
import UserRoute from '../components/layout/UserRoute';
import MainLayout from '../components/layout/MainLayout';
import CallToPaperContent from '../components/CallToPaper/CallToPaperContent';


const CallForPaper = () => {
  return (
    <UserRoute>
      <MainLayout>
        <>
          <main className="callForPaper">
            <div className="callForPaper__Inner container-1220">
              <h1>About the Conference</h1>
              <Card bordered={false}>
                <CallToPaperContent />
              </Card>
            </div>
          </main>

          <style jsx>{`
            .callForPaper {
              padding-left: 1rem;
              padding-right: 1rem;
              min-height: calc(100vh - 8.5rem);
              background-color: #f6f9fc;
              font-size: 1rem;
              font-family: 'ibm_plex_sansregular', sans-serif;
            }

            .callForPaper__Inner {
              padding-top: 7rem;
              padding-bottom: 10rem;
            }

            h1 {
              margin-bottom: 6rem;
              font-size: 4rem;
              line-height: 1.2;
              color: #000;
              font-family: 'ibm_plex_sansbold', sans-serif;
            }

            @media (max-width: 800px) {
              .callForPaper .callForPaper__Inner > h1 {
                text-align: center;
              }
            }
          `}</style>
        </>
      </MainLayout>
    </UserRoute>
  );
};

export default CallForPaper;
