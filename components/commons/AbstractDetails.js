import React, { useState } from 'react';
import RichEditor from '../RichEditor/RichEditor';
import ErrorText from './ErrorText';

const AbstractDetails = props => {
  const [wordCount, setWordCount] = useState(1);

  const getWordCount = plainText => {
    if (plainText.length === 0) return setWordCount(0);
    const wordCount = plainText.split(/\s/).filter(item => item.length !== 0)
      .length;
    setWordCount(wordCount);
  };

  return (
    <div className="Form__inner">
      <div className="form-field">
        <label htmlFor="abstractTitle">Abstract Title</label>
        <input
          placeholder="Enter abstract title here"
          id="abstractTitle"
          name="abstractTitle"
          value={props.values.abstractTitle}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
        {props.errors.abstractTitle && props.touched.abstractTitle && (
          <ErrorText content={props.errors.abstractTitle} />
        )}
      </div>

      <div className="form-field">
        <label htmlFor="abstractSubtitle">Abstract Subtitle</label>
        <input
          placeholder="Enter abstract subtitle here"
          id="abstractSubtitle"
          name="abstractSubtitle"
          value={props.values.abstractSubtitle}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
        {props.errors.abstractSubtitle && props.touched.abstractSubtitle && (
          <ErrorText content={props.errors.abstractSubtitle} />
        )}
      </div>

      <div className="form-field">
        <label htmlFor="abstractBody">Abstract (not more than 250 words)</label>
        <RichEditor
          id="abstractBody"
          name="abstractBody"
          placeholder="Enter abstract body..."
          richEditorState={props.richEditorState}
          setRichEditorState={props.setRichEditorState}
          getWordCount={getWordCount}
          abstractMarkup={props.abstractMarkup}
          getAbstractMarkup={props.getAbstractMarkup}
          setFieldValue={props.setFieldValue}
        />
        {props.errors.abstractBody && props.touched.abstractBody && (
          <ErrorText content={props.errors.abstractBody} />
        )}
      </div>

      <div
        className={
          wordCount <= 250
            ? 'form-field word-count'
            : 'form-field word-count exceed-limit'
        }
      >
        {wordCount}/250 words
      </div>

      <style jsx>{`
        .Form__inner {
          padding: 0 1.5rem;
        }

        .form-field {
          margin-bottom: 2rem;
          width: 100%;
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

        .word-count {
          margin-top: -1.5rem;
          font-size: 1.6em;
          color: #4a4a4a;
          font-family: 'ibm_plex_sansregular', sans-serif;
        }

        .word-count.exceed-limit {
          color: #ec4c47;
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

export default AbstractDetails;
