import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';
import { Card } from 'antd';
import UserRoute from '../components/layout/UserRoute';
import MainLayout from '../components/layout/MainLayout';
import { aboutUs } from '../data/aboutUs';

const CardContent = styled.div`
  line-height: 1.67;
  font-size: 16px;
  text-align: justify;
  width: 90%;
  margin: 0 auto;
  padding: 20px 20px 40px;

  @media (max-width: 600px) {
    text-align: left;
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }

  .timeline {
    margin-left: 30px;

    @media (max-width: 576px) {
      margin-left: 15px;
    }

    p > strong {
       font-family: 'ibm_plex_sansbold', sans-serif;
    }
  }

  .goals {
    li {
      margin-bottom: 15px;
    }

    li:first-child {
      margin-top: 20px;
    }
  }

  .members {
    h1 {
      font-size: 20px;
      font-family: 'ibm_plex_sansbold', sans-serif;
      margin: 40px 0 15px;

      @media (max-width: 600px) {
        font-size: 16px;
      }
    }

    .member {
      margin-bottom: 20px;
      h2, strong {
        font-family: 'ibm_plex_sansbold', sans-serif;
      }
    }
  }
`;

const AboutUs = () => {
  return (
    <UserRoute>
      <MainLayout>
        <>
          <main className="aboutUs">
            <div className="aboutUs__Inner container-1220">
              <h1>{aboutUs.title}</h1>
              <Card bordered={false}>
                <CardContent>
                  {ReactHtmlParser(aboutUs.content)}
                </CardContent>
              </Card>
            </div>
          </main>

          <style jsx>{`
            .aboutUs {
              padding-left: 1rem;
              padding-right: 1rem;
              min-height: calc(100vh - 8.5rem);
              background-color: #f6f9fc;
              font-size: 1rem;
              font-family: 'ibm_plex_sansregular', sans-serif;
            }

            .aboutUs__Inner {
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
              .aboutUs .aboutUs__Inner > h1 {
                text-align: center;
              }
            }
          `}</style>
        </>
      </MainLayout>
    </UserRoute>
  );
};

export default AboutUs;
