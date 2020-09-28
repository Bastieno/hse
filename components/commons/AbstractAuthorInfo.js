import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import shortid from 'shortid';
import _ from 'lodash';
import { Select } from './FormInputs';
import ErrorText from './ErrorText';
import EvergreenIcon from './Icons';

const useForceUpdate = () => {
  const [value, setValue] = useState(true);
  return () => setValue(!value);
};

const AbstractAuthorInfo = props => {
  const [presenter, setPresenter] = useState('');
  const [author, setAuthor] = useState('');
  const [isAuthorValid, setIsAuthorValid] = useState(false);
  const [isPresenterValid, setIsPresenterValid] = useState(false);
  const forceUpdate = useForceUpdate();

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 768px)',
  });

  const handleChange = e => {
    if (e.target.name == 'presenters') {
      if (e.target.value.trim().length) setIsPresenterValid(true);
      else setIsPresenterValid(false);
      setPresenter(e.target.value.trimLeft());
    }

    if (e.target.name == 'authors') {
      if (e.target.value.trim().length) setIsAuthorValid(true);
      else setIsAuthorValid(false);
      setAuthor(e.target.value.trimLeft());
    }
  };

  const handleTagAdd = type => {
    if (type == 'author') {
      if (!author.length) return null;

      props.authors.push({ id: shortid.generate(), value: author });
      props.setAuthors(props.authors);
      setAuthor('');
      props.errors.authors = '';
      setIsAuthorValid(false);
    }

    if (type == 'presenter') {
      if (!presenter.length) return null;

      props.presenters.push({ id: shortid.generate(), value: presenter });
      props.setPresenters(props.presenters);
      setPresenter('');
      props.errors.presenters = '';
      setIsPresenterValid(false);
    }
  };

  const handleTagClose = (tag, type) => {
    if (type == 'presenter') {
      const tagIdx = props.presenters.findIndex(
        presenter => presenter.id === tag.id
      );

      if (tagIdx == -1) return null;
      props.presenters.splice(tagIdx, 1);
      props.setPresenters(props.presenters);
    }

    if (type == 'author') {
      const tagIdx = props.authors.findIndex(author => author.id === tag.id);

      if (tagIdx == -1) return null;
      props.authors.splice(tagIdx, 1);
      props.setAuthors(props.authors);
    }

    forceUpdate();
  };

  return (
    <div className="Form__inner">
      <div className="form-field">
        <label htmlFor="presentationCategory">Presentation Category</label>
        <Select
          width={isTabletOrMobileDevice ? '100%' : '50%'}
          height={'5.2rem'}
          id="presentationCategory"
          name="presentationCategory"
          value={props.values.presentationCategory}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        >
          <option value="Select Category" disabled>
            Select Category
          </option>
          {props.presentationCategories.map(elem => (
            <option key={elem.valueField} value={elem.displayField}>
              {elem.displayField}
            </option>
          ))}
        </Select>
        {props.errors.presentationCategory && props.touched.presentationCategory && (
          <ErrorText content={props.errors.presentationCategory} />
        )}
      </div>

      <div className="form-field">
        <label htmlFor="presenters">Presenters</label>
        <div className="form-field__inner">
          <input
            placeholder="Enter presenter name and press 'Add' button"
            id="presenters"
            name="presenters"
            value={presenter}
            onChange={handleChange}
          />
          <button
            className="btn--add-tag"
            disabled={!isPresenterValid}
            type="button"
            onClick={() => handleTagAdd('presenter')}
          >
            Add
          </button>
        </div>

        {props.errors.presenters && props.touched.presenters && (
          <ErrorText content={props.errors.presenters} />
        )}

        <div className="Input__Tags">
          {props.presenters.map(tag => (
            <span className="Input__Tag" key={tag.id}>
              {tag.value}
              <EvergreenIcon
                type="cross"
                marginLeft={10}
                size={14}
                hovercolor="red"
                verticalalign="text-bottom"
                onClick={() => handleTagClose(tag, 'presenter')}
              />
            </span>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="authors">Authors</label>
        <div className="form-field__inner">
          <input
            placeholder="Enter author name and press 'Add' button"
            id="authors"
            name="authors"
            value={author}
            onChange={handleChange}
          />
          <button
            className="btn--add-tag"
            disabled={!isAuthorValid}
            type="button"
            onClick={() => handleTagAdd('author')}
          >
            Add
          </button>
        </div>

        {props.errors.authors && props.touched.authors && (
          <ErrorText content={props.errors.authors} />
        )}

        <div className="Input__Tags">
          {props.authors.map(tag => (
            <span className="Input__Tag" key={tag.id}>
              {tag.value}
              <EvergreenIcon
                type="cross"
                marginLeft={10}
                size={14}
                hovercolor="red"
                verticalalign="text-bottom"
                onClick={() => handleTagClose(tag, 'author')}
              />
            </span>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="orgName">Name of Organisation</label>
        <input
          placeholder="Enter name here"
          id="orgName"
          name="orgName"
          value={props.values.orgName}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
        {props.errors.orgName && props.touched.orgName && (
          <ErrorText content={props.errors.orgName} />
        )}
      </div>

      <div className="form-field">
        <label htmlFor="orgAddress">Address of Organisation</label>
        <input
          placeholder="Enter address here"
          id="orgAddress"
          name="orgAddress"
          value={props.values.orgAddress}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
        {props.errors.orgAddress && props.touched.orgAddress && (
          <ErrorText content={props.errors.orgAddress} />
        )}
      </div>

      <style jsx>{`
        .Form__inner {
          padding: 0 1.5rem;
        }

        .form-field {
          margin-bottom: 2rem;
          width: 100%;
        }

        .form-field__inner {
          display: flex;
        }

        .form-field:last-of-type {
          margin-bottom: 5rem;
        }

        .form-field label {
          display: block;
          margin-bottom: 0.5rem;
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.8em;
          color: #000;
        }

        input {
          font-family: 'ibm_plex_sansregular', sans-serif;
          border-radius: 4px;
          border: solid 1px #979797;
          background-color: #fff;
          color: #4a4a4a;
          padding: 1rem;
          font-size: 1.6em;
          display: block;
          width: 100%;
          height: 5.2rem;
          flex-grow: 1;
        }

        .btn--add-tag {
          display: inline-block;
          border-radius: 4px;
          margin-left: 1rem;
          font-size: 1.7rem;
          padding: 1rem 2rem;
          color: #fff;
          background-color: #52b9b8;
          cursor: pointer;
          font-family: 'ibm_plex_sansmedium', sans-serif;
        }

        .btn--add-tag:disabled {
          background-color: rgba(128, 128, 128, 0.5);
          cursor: default;
          pointer-events: none;
        }

        .Tag-Input__Hint {
          font-size: 1.5em;
          color: #007ace;
        }

        .Input__Tag {
          margin-right: 1rem;
          margin-top: 1rem;
          padding: 0.7rem 1rem;
          display: inline-block;
          position: relative;
          color: #4a4a4a;
          font-size: 1.6em;
          font-family: 'ibm_plex_sansregular', sans-serif;
          background-color: rgba(71, 193, 191, 0.2);
        }

        @media (min-width: 769px) {
          .Form__inner {
            padding: 0 2rem;
          }
        }

        @media (min-width: 1025px) {
          .Form__inner {
            padding: 0 10rem;
          }
        }

        @media (min-width: 1225px) {
          .Form__inner {
            padding: 0 20rem;
          }
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    presentationCategories: _.values(state.presentationCategories),
  };
};

export default connect(mapStateToProps, null)(AbstractAuthorInfo);
