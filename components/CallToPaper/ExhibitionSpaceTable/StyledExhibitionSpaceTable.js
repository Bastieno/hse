import styled from 'styled-components';
import { Table } from 'antd';

const StyledExhibitionSpaceTable = styled(Table)`
    .ant-table {
        margin-bottom: 30px;
        font-family: 'ibm_plex_sansregular', sans-serif;
        font-size: 16px;
        color: #4a4a4a;
    }

    .ant-table-thead {
        background-color: transparent;
    }

    .ant-table-tbody {
        margin: 0 !important;
    }

    .ant-table-tbody > .ant-table-row:hover > td {
        background-color: inherit !important;
    }

    th,
    td {
        border-bottom: 1px solid #e9edf0 !important;
    }

    th {
        font-family: 'ibm_plex_sansmedium', sans-serif;
        background: transparent !important;
    }
`;

export default StyledExhibitionSpaceTable;
