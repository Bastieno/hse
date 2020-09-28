import { Badge, Icon } from 'antd';

const NotificationBadge = () => {
  return (
    <div className="NotificationBadge">
      <span className="Badge">
        <Badge
          count={6}
          showZero
          style={{
            backgroundColor: '#6554c0',
            fontFamily: "'Product Sans Regular', sans-serif",
            fontSize: '1rem',
            top: 4,
            right: 1,
            padding: '0',
            minWidth: 18,
            height: 18
          }}
        >
          <span className="NotificationBadge__inner">
            <Icon
              type="bell"
              theme="filled"
              style={{
                color: '#5e6c84'
              }}
              rotate={-15}
            />
          </span>
        </Badge>
      </span>

      <style jsx>{`
        .NotificationBadge__inner {
          height: 20px;
          width: 20px;
          font-size: 2.2rem;
          position: relative;
        }

        .Badge {
          border: solid 1px #ffffff;
          font-size: 1.2rem;
          text-align: center;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default NotificationBadge;
