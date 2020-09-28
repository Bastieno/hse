import { Icon, Spin } from 'antd';

const FullpageSpinner = ({ tip, height }) => {
  return (
    <div
      style={{
        width: '100%',
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin
        indicator={
          <Icon
            type="loading"
            style={{ fontSize: '5rem', marginBottom: 10 }}
            spin
          />
        }
        tip={tip}
        style={{
          fontFamily: "'Product Sans Regular', sans-serif",
          color: 'inherit',
          fontSize: '1.7rem',
        }}
      />
    </div>
  );
};

export default FullpageSpinner;
