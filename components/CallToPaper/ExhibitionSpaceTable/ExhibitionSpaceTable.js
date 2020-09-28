import { useMediaQuery } from 'react-responsive';
import StyledExhibitionSpaceTable from './StyledExhibitionSpaceTable';

const LargeScreenExhibitionSpaceTable = () => {
    const headers = [
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Ground Space Measurement', dataIndex: 'size', key: 'size' },
        { title: 'Cost per Booth (₦)', dataIndex: 'cost', key: 'cost' },
    ];

    const dataSource = [
        {
            key: 'indoor',
            location: 'Indoor',
            size: '9ft x 9ft',
            cost: '270,000',
        },
    ];

    return (
        <StyledExhibitionSpaceTable
            columns={headers}
            dataSource={dataSource}
            pagination={false}
            size="small"
            bordered={false}
        />
    );
};

const SmallSreenExhibitionSpaceTable = () => {
    const headers = [
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Ground Space', dataIndex: 'size', key: 'size' },
        { title: 'Cost(₦)', dataIndex: 'cost', key: 'cost' },
    ];

    const dataSource = [
        {
            key: 'indoor',
            location: 'Indoor',
            size: '9ft x 9ft',
            cost: '270,000',
        },
    ];

    return (
        <StyledExhibitionSpaceTable
            columns={headers}
            dataSource={dataSource}
            pagination={false}
            size="small"
            bordered={false}
        />
    );
};

const ExhibitionSpaceTable = () => {
    const isSmallSreen = useMediaQuery({
        query: '(max-width: 576px)',
    });

    return isSmallSreen ? <SmallSreenExhibitionSpaceTable /> : <LargeScreenExhibitionSpaceTable />
}

export default ExhibitionSpaceTable;
