import React from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import { Collapse, Icon } from 'antd';
import UserRoute from '../components/layout/UserRoute';
import MainLayout from '../components/layout/MainLayout';
import faqs from '../data/faqs';

const { Panel } = Collapse;

const StyledCollapse = styled(Collapse)`
  background-color: transparent;
  font-family: 'ibm_plex_sansregular', sans-serif;
  font-size: 2rem;
  color: #4a4a4a;

  .ant-collapse-item > .ant-collapse-header {
    padding-left: 4rem;
    font-family: 'ibm_plex_sansmedium', sans-serif;

    .anticon {
      left: 0;
      font-size: 17px;
    }
  }

  .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
    padding-left: 4rem;
    padding-top: 2rem;
    line-height: 1.85;
    font-size: 0.95em;
    font-family: 'ibm_plex_sansregular', sans-serif;
  }
`;

const StyledPanel = styled(Panel)`
  padding: 2rem;
  border: 0;
  border-radius: 5px;
  margin-bottom: 2.4rem;
  box-shadow: 0 0 5px 0px rgba(67, 90, 111, 0.3);
  background-color: #fff;
`;

const FAQs = () => {
  return (
    <UserRoute>
      <MainLayout>
        <>
          <main className="FAQs">
            <div className="FAQs__Inner container-1220">
              <h1>Frequently Asked Questions</h1>

              <StyledCollapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
              >
                {faqs.map((faq, idx) => (
                  <StyledPanel header={faq.q} key={idx + 1}>
                    <div className="FAQs__Answer">
                      <p>{ReactHtmlParser(faq.a)}</p>
                    </div>
                  </StyledPanel>
                ))}
              </StyledCollapse>
            </div>
          </main>

          <style jsx>{`
            .FAQs {
              padding-left: 1rem;
              padding-right: 1rem;
              min-height: calc(100vh - 8.5rem);
              background-color: #f6f9fc;
              font-size: 1rem;
              font-family: 'ibm_plex_sansregular', sans-serif;
            }

            .FAQs__Inner {
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

            .FAQs__Answer {
              position: relative;
              padding-left: 2.5rem;
            }

            .FAQs__Answer::before {
              content: '';
              position: absolute;
              left: 0;
              bottom: 0;
              width: 3px;
              height: 100%;
              background-color: #4a4a4a;
            }
          `}</style>
        </>
      </MainLayout>
    </UserRoute>
  );
};

export default FAQs;
