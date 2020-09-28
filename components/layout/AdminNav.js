import Link from 'next/link';
import { Icon as AntIcon } from 'antd';

const AdminNav = ({ pathname }) => {
  return (
    <>
      <nav className="AdminNav">
        <h2>Main Navigation</h2>

        <ul>
          <li className={pathname === '/admin' ? 'active' : ''}>
            <Link href="/admin">
              <a>
                <AntIcon
                  type="appstore"
                  theme="filled"
                  style={{
                    fontSize: '23px',
                    color: '#344563',
                    width: 25,
                    textAlign: 'left',
                  }}
                />
                <span>Dashboard</span>
              </a>
            </Link>
          </li>
          <li className={pathname === '/admin/abstracts' ? 'active' : ''}>
            <Link href="/admin/abstracts">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#344563"
                    fillRule="evenodd"
                    d="M15.132 2.5h1.184c.654 0 1.184.506 1.184 1.131v10.555a2.026 2.026 0 0 0-1.184-.376H5.658V2.5h4.737v6.409c0 .266.282.449.541.35l1.827-.698 1.827.698c.26.099.542-.084.542-.35V2.5zM12.85 7.787a.412.412 0 0 0-.051-.008l-1.615.617-.037-5.896h3.195l.037 5.896-1.529-.609zM2.5 14.602V3.63c0-.625.53-1.131 1.184-1.131h1.184v11.31h-.394a2.82 2.82 0 0 0-1.974.792zm1.974-.039h11.842c.654 0 1.184.507 1.184 1.131v1.508c0 .625-.53 1.131-1.184 1.131H4.474c-1.09 0-1.974-.844-1.974-1.885 0-1.04.884-1.885 1.974-1.885z"
                  />
                </svg>
                <span>Abstracts</span>
              </a>
            </Link>
          </li>
          <li className={pathname === '/admin/full-papers' ? 'active' : ''}>
            <Link href="/admin/full-papers">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#344563"
                    fillRule="evenodd"
                    d="M15.132 2.5h1.184c.654 0 1.184.506 1.184 1.131v10.555a2.026 2.026 0 0 0-1.184-.376H5.658V2.5h4.737v6.409c0 .266.282.449.541.35l1.827-.698 1.827.698c.26.099.542-.084.542-.35V2.5zM12.85 7.787a.412.412 0 0 0-.051-.008l-1.615.617-.037-5.896h3.195l.037 5.896-1.529-.609zM2.5 14.602V3.63c0-.625.53-1.131 1.184-1.131h1.184v11.31h-.394a2.82 2.82 0 0 0-1.974.792zm1.974-.039h11.842c.654 0 1.184.507 1.184 1.131v1.508c0 .625-.53 1.131-1.184 1.131H4.474c-1.09 0-1.974-.844-1.974-1.885 0-1.04.884-1.885 1.974-1.885z"
                  />
                </svg>
                <span>Full Technical Papers</span>
              </a>
            </Link>
          </li>
          <li className={pathname === '/admin/tickets' ? 'active' : ''}>
            <Link href="/admin/tickets">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#344563"
                    fillRule="evenodd"
                    d="M10.86 1.672l6.478.59c.213.018.382.187.4.4l.59 6.478c.036.393-.105.782-.384 1.06l-7.225 7.225a3.101 3.101 0 0 1-4.385 0l-3.76-3.759a3.101 3.101 0 0 1 0-4.385L9.8 2.056c.278-.279.667-.42 1.06-.384zm3.618 3.85a2.215 2.215 0 1 0-3.132 3.132 2.215 2.215 0 0 0 3.132-3.132zm-2.506.626a1.329 1.329 0 1 1 1.88 1.88 1.329 1.329 0 0 1-1.88-1.88z"
                  />
                </svg>
                <span>Tickets</span>
              </a>
            </Link>
          </li>
          <li
            className={
              pathname === '/admin/exhibition-requests' ? 'active' : ''
            }
          >
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#344563"
                  fillRule="evenodd"
                  d="M10 5.773c3.46 0 6.55 2.4 8.059 6.095a.49.49 0 0 1 0 .37c-1.51 3.696-4.6 6.095-8.059 6.095-3.46 0-6.55-2.399-8.059-6.095a.49.49 0 0 1 0-.37c1.51-3.696 4.6-6.095 8.059-6.095zm0 3.865c-1.315 0-2.381 1.081-2.381 2.415S8.685 14.47 10 14.47c1.315 0 2.381-1.082 2.381-2.416 0-1.334-1.066-2.415-2.381-2.415zm0 .966c.789 0 1.429.649 1.429 1.45 0 .8-.64 1.448-1.429 1.448a1.439 1.439 0 0 1-1.429-1.449c0-.8.64-1.45 1.429-1.45zm8.124-7.759a.732.732 0 0 1 0 1.025L16.22 5.802a.707.707 0 0 1-1.01 0 .732.732 0 0 1 0-1.025l1.905-1.932a.707.707 0 0 1 1.01 0zm-15.238 0l1.905 1.932a.732.732 0 0 1 0 1.025.707.707 0 0 1-1.01 0L1.876 3.87a.732.732 0 0 1 0-1.025.707.707 0 0 1 1.01 0zM10 1.667a.72.72 0 0 1 .714.724v1.933c0 .4-.32.724-.714.724a.72.72 0 0 1-.714-.724V2.39c0-.4.32-.724.714-.724z"
                />
              </svg>
              <span>Exhibition Requests</span>
            </a>
          </li>
          <li className={pathname === '/admin/event-schedule' ? 'active' : ''}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#344563"
                  fillRule="evenodd"
                  d="M17.922 7.792v6.624a3.506 3.506 0 0 1-3.506 3.506H5.065a3.506 3.506 0 0 1-3.507-3.506V7.792h16.364zm-5.837 1.801l-3.54 3.84L6.86 11.66a.417.417 0 1 0-.603.575l1.992 2.093a.417.417 0 0 0 .608-.004l3.841-4.167a.417.417 0 1 0-.613-.565zm-7.41-6.476v1.169a1.169 1.169 0 1 0 2.338 0v-1.17h5.455v1.17a1.169 1.169 0 1 0 2.337 0v-1.17h1.948c.646 0 1.17.524 1.17 1.17v2.727H1.557V4.286c0-.646.524-1.17 1.17-1.17h1.947zm8.961-.78a.39.39 0 0 1 .39.39v1.559a.39.39 0 1 1-.78 0V2.727a.39.39 0 0 1 .39-.39zm-7.792 0a.39.39 0 0 1 .39.39v1.559a.39.39 0 0 1-.78 0V2.727a.39.39 0 0 1 .39-.39z"
                />
              </svg>
              <span>Event Schedule</span>
            </a>
          </li>
          <li
            className={
              pathname === '/admin/sponsorship-requests' ? 'active' : ''
            }
          >
            <Link href="/admin/sponsorship-requests">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="#344563"
                    fillRule="evenodd"
                    d="M10 18.333a8.333 8.333 0 1 1 0-16.666 8.333 8.333 0 0 1 0 16.666zM6.519 11.84c1.888 2.304 5.12 2.318 6.964-.005a.397.397 0 0 0-.622-.493c-1.526 1.922-4.158 1.91-5.729-.005a.397.397 0 0 0-.613.503zm2.234-4.352C8.54 6.866 7.883 6.43 7.2 6.43c-.683 0-1.33.437-1.544 1.061a.397.397 0 0 0 .751.258c.102-.296.441-.526.793-.526.354 0 .702.232.803.524a.397.397 0 0 0 .75-.259zm5.556 0c-.215-.621-.87-1.058-1.554-1.058-.683 0-1.329.437-1.543 1.061a.397.397 0 1 0 .75.258c.102-.296.442-.526.793-.526.355 0 .703.232.804.524a.397.397 0 0 0 .75-.259z"
                  />
                </svg>
                <span>Sponsorship Requests</span>
              </a>
            </Link>
          </li>
          <li className={pathname === '/admin/settings' ? 'active' : ''}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#344563"
                  fillRule="evenodd"
                  d="M11.238 1.667a.49.49 0 0 1 .48.389l.333 1.583c.343.11.676.248.996.413l1.355-.884a.49.49 0 0 1 .615.064l1.751 1.751a.49.49 0 0 1 .064.615l-.884 1.355c.165.32.303.653.413.996l1.583.333a.49.49 0 0 1 .39.48v2.476a.49.49 0 0 1-.39.48l-1.583.333c-.11.343-.248.676-.413.996l.884 1.355a.49.49 0 0 1-.064.615l-1.751 1.751a.49.49 0 0 1-.615.064l-1.355-.884c-.32.165-.653.303-.996.413l-.333 1.583a.49.49 0 0 1-.48.39H8.762a.49.49 0 0 1-.48-.39l-.333-1.583a6.643 6.643 0 0 1-.996-.413l-1.355.884a.49.49 0 0 1-.615-.064l-1.751-1.751a.49.49 0 0 1-.064-.615l.884-1.355a6.643 6.643 0 0 1-.413-.996l-1.583-.333a.49.49 0 0 1-.39-.48V8.762a.49.49 0 0 1 .39-.48l1.583-.333c.11-.343.248-.676.413-.996l-.884-1.355a.49.49 0 0 1 .064-.615l1.751-1.751a.49.49 0 0 1 .615-.064l1.355.884c.32-.165.653-.303.996-.413l.333-1.583a.49.49 0 0 1 .48-.39h2.476zM10 6.569a3.431 3.431 0 1 0 0 6.862 3.431 3.431 0 0 0 0-6.862zm0 .98a2.451 2.451 0 1 1 0 4.902 2.451 2.451 0 0 1 0-4.902z"
                />
              </svg>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .AdminNav {
          width: 30rem;
          margin-right: 2rem;
          padding-top: 3rem;
          padding-bottom: 3rem;
          font-size: 1rem;
        }

        h2 {
          padding-left: 3rem;
          padding-right: 1.8rem;
          opacity: 0.5;
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.2em;
          letter-spacing: 1px;
          color: #171725;
          padding-bottom: 1.7rem;
          text-transform: uppercase;
        }

        ul {
          padding: 0;
          margin: 0;
          list-style-type: none;
        }

        li {
          font-size: 1.6em;
          color: #171725;
          font-family: 'ibm_plex_sansregular', sans-serif;
          transition: all 400ms linear;
        }

        li.active,
        li:hover {
          cursor: pointer;
          color: #000;
          font-family: 'ibm_plex_sansbold', sans-serif;
        }

        li.active a,
        li a {
          color: inherit;
          display: flex;
          align-items: center;
          width: 100%;
          padding: 1.5rem 0;
          padding-left: 3rem;
          padding-right: 1.5rem;
          font-family: inherit;
        }

        li a span {
          display: inline-block;
          margin-left: 1.4rem;
        }
      `}</style>
    </>
  );
};

export default AdminNav;
