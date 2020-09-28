import { Formik } from 'formik';
import { Input, Icon as AntIcon, Form } from 'antd';

const SearchIcon = () => (
  <AntIcon
    type="search"
    style={{
      color: '#5e6c84',
      fontSize: '2em',
      padding: '1rem 0.6rem 1rem 1.2rem'
    }}
  />
);

const SearchForm = () => {
  const handleSearch = () => {};

  return (
    <>
      <Formik initialValues={{ searchTerm: '' }} onSubmit={handleSearch}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <SearchIcon />
            <input
              type="search"
              id="searchTerm"
              name="searchTerm"
              placeholder="Search for abstracts, users"
              value={props.values.searchTerm}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          </form>
        )}
      </Formik>

      <style jsx>{`
        form {
          position: relative;
          font-size: 1rem;
          width: 25rem;
          color: #4a4a4a;
          box-shadow: inset 0 1px 1.5px 0 rgba(0, 0, 0, 0.04);
          border: solid 1px #e9edf0;
          border-radius: 6px;
          display: flex;
          align-items: center;
        }

        input {
          flex-grow: 1;
          border: none;
          background-color: #fbfdff;
          padding: 1rem;
          padding-left: 0.6rem;
          font-family: 'Product Sans Regular', sans-serif;
          font-size: 1.5em;
        }

        input::placeholder {
          opacity: 0.77;
          font-family: 'Product Sans Regular', sans-serif;
          font-size: 1.4rem;
          color: #171725;
        }
      `}</style>
    </>
  );
};

export default SearchForm;
