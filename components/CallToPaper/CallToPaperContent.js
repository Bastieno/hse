import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ExhibitionSpaceTable from './ExhibitionSpaceTable/ExhibitionSpaceTable';

const ContentWrapper = styled.div`
    line-height: 1.67;
    font-size: 16px;
    text-align: justify;
    width: 90%;
    margin: 0 auto;
    padding: 20px 20px 40px;

    h2, .bold-text {
      font-family: 'ibm_plex_sansmedium', sans-serif;
    }

    .green-text {
      color: #5AB255;
    }

    .red-text {
      color: red;
    }

    .black-text {
      color: #4a4a4a;
      font-family: 'ibm_plex_sansregular', sans-serif;
      transition: all 0.3s ease;

      &:hover {
          color: #5AB255;
      }
    }

    .blue-text {
      color: #47B1F0;
    }

    .purple-text {
      color: #7034A0;
    }

    .italic-text {
      font-style: italic;
    }

    @media (max-width: 600px) {
      text-align: left;
      width: 100%;
      padding: 10px;
      font-size: 14px;
    }

    p, li {
      line-height: 1.75;
    }

    i {
      font-style: italic;
    }
`;

const CallToPaperContent = () => {
  return (
    <ContentWrapper>
      <div>
        <p>
          The first in the series of the above International HSE Conference on the petroleum industry and
          the Nigerian environment was organized in 1979. The Conference which is hosted in different cities of the country
          has been attracting an ever-increasing and diverse audience due to the interdisciplinary nature of HSE.
        </p>
        <p>
          The 19th edition of the conference is scheduled to hold in
          <span className="blue-text bold-text">November 2021</span>
          at the <span className="red-text bold-text">International Conference Centre (ICC) Abuja</span>
          and the theme of the Conference is
          <span className="italic-text bold-text red-text">
            {' '}“Promoting Occupational Health Best Practices towards Enhanced Productivity in the Oil & Gas Industry”
          </span>
        </p>
      </div>
      <div>
        <h1 className="bold-text">CALL FOR PAPERS</h1>
        <p>
          Authors are invited to submit abstracts and full papers under the theme and subthemes/subject areas as indicated below:
        </p>
        <h2 className="green-text">Subthemes</h2>
        <ul>
          <li>
            Implementation Strategies of Occupational Health Standards in the Oil and Gas Industry
          </li>
          <li>
            The Total Workers’ Health in the Workplace (Mental, Fatigue, Repetitive Stress, Resilience, Lifestyle Management, etc.)
          </li>
          <li>Fitness to Work</li>
          <li>
            Managing Security Challenges in the Nigerian Oil and Gas Industry
          </li>
          <li>
            Leveraging Technology for Improved Security Management in
            the Oil and Gas Industry
          </li>
          <li>
            Asset Integrity Management for Ageing facilities (Operations, abandonment, decommissioning, Risk-based inspections, etc).
          </li>
          <li>
            Accident/Incident Management in the oil & gas industry:
            prevention, reporting, investigation, learning lessons.
          </li>
          <li>
            Safety in Oil & Gas Haulage Activities in the
            Downstream/Midstream Operations of the Petroleum Industry.
          </li>
          <li>
            Deepening LPG Penetration: Safe Handling and Best Practices
          </li>
          <li>
            Review of Environmental Management Tools (EIA, EER, ECM, ESI Mapping, etc.)
          </li>
          <li>
            Corporate Citizenship (Beyond CSR, Host communities and Oil and Gas operations)
          </li>
        </ul>
        <h2 className="purple-text">Subject Areas</h2>
        <p>
          Occupational Health Management System, Infectious Diseases Management in the Industry,
          Occupational Health Legislation and Regulatory Compliance, Public health and the Oil and Gas Industry Activities,
          Prevention and management of work-related injuries/illness, Health Hazard of Work in the Oil and Gas Industry,
          Promoting Health and Wellness, Clinical Waste Management, Public Perception toward Safety,
          Computational Analysis in Risk and Safety Assessments, Sustainable Environmental Practices,
          Waste Management, Oil Spill Control and Management, Emerging Environmental Technologies, Environmental Studies,
          Biodiversity Conservation, Climate Change, Environmental Legislation and Regulatory Compliance, Community Relations,
          Security Challenges in the Oil and Gas Industry, Security Awareness, Process Safety Management, Emergency Response and Disaster Management,
          IT Security and Information Protection, HSE in the Downstream Sector of the Oil and Gas Industry, Hyperbaric Medicine,
          Transportation and Traffic/Aviation Safety, Fire Prevention/Protection and Enforcement Codes and Standards, Contractor Safety,
          Behavioural Based Safety, HSE in Deepwater, Exploration & Production.
        </p>
        <p>
          Submissions must be original and should not have been published previously. The abstract must not be more than two hundred and fifty (250) words
          and should summarize the paper by stating the following:
        </p>
        <ul>
          <li>Problem/challenge</li>
          <li>Approach to the solution (methodology)</li>
          <li>Findings</li>
          <li>Solutions/recommendation </li>
        </ul>
        <p>
          The abstracts must be submitted electronically via{' '}
          <Link href="/submit-abstract">
            <a>www.oghseconf.com.ng</a>
          </Link>
        </p>
        <p className="bold-text">
          <i>
            Authors whose abstracts are accepted will be contacted with
            information in preparing the final papers.
          </i>
        </p>

        <h2>Registration Fees: </h2>
        <ul>
          <li>
            ₦150,000 (One Hundred and Fifty Thousand Naira) per
            participant
          </li>
          <li>₦75,000 (Seventy-five Thousand Naira) for CPC members</li>
          <li>
            ₦75,000 (Seventy-five Thousand Naira) for presenting
            authors
          </li>
          <li>
            ₦20,000 (Twenty Thousand Naira) per student for students
            with valid ID cards
          </li>
        </ul>
        <p>
          Interested participants should kindly register electronically via{' '}
          <Link href="/conference-registration">
            <a>www.oghseconf.com.ng</a>
          </Link>
        </p>

        <h2>Exhibition</h2>

        <p>
          Manufacturers & Technology Vendors, Analytical Laboratories, Oil
          Companies, Service Companies, Process Engineering Contractors
          and Allied Industries are invited to participate in a concurrent
          exhibition at the following rates:
        </p>

        <ExhibitionSpaceTable />

        <p>
          The Conference will be responsible for the construction and
          erection of booths/stands. Limited spaces are available and
          would be on a “first come first served basis”. Interested
          exhibitors should, therefore, indicate their willingness to
          exhibit, and forward their space requirement electronically via
          www.oghseconf.com.ng
        </p>

        <div className="bold-text">
          <p>For further enquiries, please contact the underlisted:</p>
          Website: <Link href="/"><a className="black-text">www.oghseconf.com.ng</a></Link>
          <br />
          Email: <a className="black-text" href="mailto:enquiries@oghseconf.com.ng" target="_top"> {' '} enquiries@oghseconf.com.ng {' '}</a>
          <br />
          Tel: <a className="black-text" href="tel:+234-817-365-4981"> +234(0)8173654981</a>, <a className="black-text" href="tel:+234-802-140-3475"> +234(0)8021403475</a>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default CallToPaperContent;
