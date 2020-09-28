import styled from 'styled-components';
import { Modal } from 'antd';

const StyledCallToPaperModal = styled(Modal)`
    color: #4a4a4a;
    font: normal 1rem/1.6 'ibm_plex_sansregular', sans-serif;

    .ant-modal-title {
        font-size: 21px;
        text-transform: uppercase;
        text-align: center;
        font-family: 'ibm_plex_sansmedium', sans-serif;

        @media (max-width: 576px) {
            font-size: 16px;
        }
    }

    .ant-modal-body {
        font-size: 16px;

        h2,
        .bold-text {
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
    }
`;

export default StyledCallToPaperModal;
