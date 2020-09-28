import { Menu, Dropdown, Icon as AntIcon } from 'antd';
import Link from 'next/link';

const menu = (
  <Menu>
    <Menu.Item
      key="0"
      style={{
        fontFamily: "'ibm_plex_sansregular', sans-serif",
        fontSize: '1.7rem',
        color: '#4a4a4a',
      }}
    >
      <Link href="/logout">
        <a>Logout</a>
      </Link>
    </Menu.Item>
  </Menu>
);

// it should receive an admin username prop
const AdminNameTag = ({ subscriber }) => {
  return (
    <>
      <div>
        <Dropdown overlay={menu} trigger={['click']}>
          <span>
            {`${subscriber.firstName} ${subscriber.lastName}`}{' '}
            <AntIcon
              type="caret-down"
              style={{ color: '#344563', fontSize: '0.7em', marginLeft: 6 }}
            />
          </span>
        </Dropdown>
      </div>

      <style jsx>{`
        div {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.8rem;
          color: #171725;
          transition: all 500ms linear;
        }

        div:hover {
          cursor: pointer;
          color: #4a4a4a;
        }
      `}</style>
    </>
  );
};

export default AdminNameTag;
