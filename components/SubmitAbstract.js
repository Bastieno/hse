import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Recaptcha from 'react-recaptcha';
import { toaster } from 'evergreen-ui';
import shortid from 'shortid';
import { LoadingIcon } from './commons/Icons';
import AbstractPageHeading from './commons/AbstractPageHeading';
import AbstractPageSubHeading from './commons/AbstractPageSubHeading';
import AbstractAuthorInfo from './commons/AbstractAuthorInfo';
import AbstractDetails from './commons/AbstractDetails';
import AbstractPreview from './commons/AbstractPreview';
import AbstractSubmitConfirmation from './commons/AbstractSubmitConfirmation';
import abstract from '../services/abstract';

const pages = [AbstractAuthorInfo, AbstractDetails, AbstractPreview];

const SubmitAbstract = props => {
  const [page, setPage] = useState(0);
  const [richEditorState, setRichEditorState] = useState('');
  const [abstractMarkup, setAbstractMarkup] = useState('');
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [abstractToModify, setAbstractToModify] = useState(null);
  const [presenters, setPresenters] = useState([]);
  const [authors, setAuthors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      fetchAbstractToModify(id);
    }
  }, [router]);

  const PageComponent = pages[page];

  const schema0 = Yup.object().shape({
    presentationCategory: Yup.string()
      .test(
        'test-category',
        'Please select a category',
        value => {
          if (value === 'Select Category') return false;
          return true;
        }
      ),
    presenters: Yup.string()
      .test(
        'test-name',
        'Please enter at least one presenter name',
        value => {
          if (presenters.length === 0) return false;
          return true;
        }),
    authors: Yup.string()
      .test(
        'test-name',
        'Please enter at least one author name',
        value => {
          if (authors.length === 0) return false;
          return true;
        }),
    orgName: Yup.string()
      .min(2, 'Too short! The minimum number of characters is 2')
      .max(1000, 'Too long! The maximum number of characters is 1000')
      .required(
        'Please enter the name of your organisation'
      ),
    orgAddress: Yup.string()
      .min(2, 'Too short! The minimum number of characters is 2')
      .max(1000, 'Too long! The maximum number of characters is 1000')
      .required(
        'Please enter the address of your organisation'
      ),
  });

  const schema1 = Yup.object().shape({
    abstractTitle: Yup.string()
      .min(2, 'Too short! The minimum number of characters is 2')
      .max(256, 'Too long! The maximum number of characters is 256')
      .required('Please enter title of the abstract'),
    abstractSubtitle: Yup.string()
      .min(2, 'Too short! The minimum number of characters is 2')
      .max(256, 'Too long! The maximum number of characters is 256'),
    abstractBody: Yup.string()
      .required('Please enter the body of the abstract')
      .test('test-name', 'Abstract body should not exceed 250 words', value => {
        if (!value) return false;
        const wordCount = value.split(/\s/).filter(item => item.length !== 0)
          .length;
        if (wordCount > 250) return false;
        return true;
      }),
  });

  const newAbstractValues = {
    presentationCategory: 'Select Category',
    presenters: '',
    authors: '',
    orgName: '',
    orgAddress: '',
    abstractTitle: '',
    abstractSubtitle: '',
    abstractBody: '',
  };

  const initialValues =
    abstractToModify === null
      ? newAbstractValues
      : {
          presentationCategory: abstractToModify.presentationCat,
          presenters: '',
          authors: '',
          orgName: abstractToModify.organization,
          orgAddress: abstractToModify.organizationAddr,
          abstractTitle: abstractToModify.abstractTitle,
          abstractSubtitle: abstractToModify.abstractSubTitle,
          abstractBody: '',
        };

  const fetchAbstractToModify = async abstractId => {
    let data;

    try {
      if (props.myAbstracts.abstracts.length) {
        const response = props.myAbstracts.abstracts.filter(
          elem => elem.id === abstractId
        );
        data = response[0];
      } else {
        const response = await abstract.getOneAbstract(abstractId);
        data = response.data.abstracts;
      }

      setPresenters(
        data.presenters
          .split(', ')
          .map(value => ({ id: shortid.generate(), value }))
      );
      setAuthors(
        data.authors
          .split(', ')
          .map(value => ({ id: shortid.generate(), value }))
      );

      setAbstractToModify(data);
      setAbstractMarkup(data.abstractDesc);
    } catch (error) {
      console.log('Error from updating Abstract', error.response.data);
    }
  };

  const setValidationSchema = () => {
    if (page === 0) return schema0;
    if (page === 1) return schema1;
  };

  const recaptchaLoaded = () => console.log('ReCaptcha has loaded');

  const verifyCallback = () => setIsVerified(true);

  const goToNextPage = () => setPage(page + 1);

  const goToPreviousPage = () => {
    if (page === 0) return router.push('/');
    if (page === 1) return setPage(page - 1);
    setIsFormEditable(true);
    setPage(0);
  };

  const goToConfirmationPage = () => setPage(3);

  const handleSubmit = async values => {
    if (page === 0 || page === 1) return goToNextPage();

    const abstractDetails = {
      ...values,
      abstractBody: abstractMarkup,
      userId: props.subscriber.userId,
      authors: authors.map(elem => elem.value),
      presenters: presenters.map(elem => elem.value),
    };

    if (isVerified) {
      setIsLoading(true);

      try {
        let response;

        if (abstractToModify) {
          response = await abstract.updateAbstract(
            abstractToModify.id,
            abstractDetails
          );
        } else {
          response = await abstract.create(abstractDetails);
        }

        if (response.data.desc === 'Success') {
          goToConfirmationPage();
          // setIsLoading(false);
        }

        if (response.data.code === '01') {
          setIsLoading(false);
          toaster.danger(
            'The operation failed. Please try again later',
            {
              id: 'forbidden-action',
              duration: 5,
            }
          );
        }

        if (response.data.code === '03') {
          setIsLoading(false);
          toaster.danger(
            'The record does not exists',
            {
              id: 'forbidden-action',
              duration: 5,
            }
          );
        }

        if (response.data.code === '06') {
          setIsLoading(false);
          toaster.danger(
            'The operation is not allowed',
            {
              description: 'Abstract update has been closed',
              id: 'forbidden-action',
              duration: 5,
            }
          );
        }

        if (response.data.desc === 'Record exists') {
          setIsLoading(false);
          toaster.danger(
            'The abstract you tried to submit already exists in our record',
            {
              id: 'forbidden-action',
              duration: 5,
            }
          );
        }

        if (response.data.code === '99' && response.data.desc === '22001: value too long for type character varying(1000)') {
          setIsLoading(false);
          toaster.danger(
            'Server Error',
            {
              description: 'The input text in one of the field is too long. Contact an admin if you cannot resolve this',
              id: 'forbidden-action',
              duration: 10,
            }
          );
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toaster.danger(
            'Error submitting the Abstract. Please try again later',
            {
              duration: 5,
            }
          );
          console.log('Error submitting the Abstract', error.response.data);
          setIsLoading(false);
        } else {
          toaster.danger(
            'The request timed out',
            {
              description: 'The server is taking too long to process the request. Please try again later',
              id: 'forbidden-action',
              duration: 7,
            }
          );
          setIsLoading(false);
        }
      }
    } else {
      toaster.danger('Please kindly verify that you are a human', {
        description:
          'Check the "I\'m not a robot" box above the "Submit Abstract" button.',
        id: 'forbidden-action',
        duration: 5,
      });
    }
  };

  return (
    <main className="Main">
      {page === 3 ? (
        <>
          <div style={{ color: 'transparent' }}>invisible</div>
          <AbstractSubmitConfirmation abstractToModify={abstractToModify} />
        </>
      ) : (
          <section className="SubmitAbstract">
            <div className="SubmitAbstract__inner container-1360">
              {page !== 2 && <AbstractPageHeading />}

              <section>
                <AbstractPageSubHeading
                  page={page}
                  setPage={setPage}
                  isFormEditable={isFormEditable}
                />

                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={setValidationSchema()}
                  onSubmit={handleSubmit}
                >
                  {props => (
                    <form onSubmit={props.handleSubmit}>
                      <PageComponent
                        {...props}
                        presenters={presenters}
                        setPresenters={setPresenters}
                        authors={authors}
                        setAuthors={setAuthors}
                        initialValues={initialValues}
                        abstractToModify={abstractToModify}
                        richEditorState={richEditorState}
                        setRichEditorState={setRichEditorState}
                        abstractMarkup={abstractMarkup}
                        getAbstractMarkup={setAbstractMarkup}
                      />

                      <div
                        className={
                          page === 2 ? 'btn-group positioned-top' : 'btn-group'
                        }
                      >
                        {page === 2 && (
                          <div className="RecaptchaContainer">
                            <Recaptcha
                              sitekey="6LcuWsIUAAAAAGofc6QE-ERiMnlObYP5ahsP4JhF"
                              render="explicit"
                              onloadCallback={recaptchaLoaded}
                              verifyCallback={verifyCallback}
                            />
                          </div>
                        )}
                        <div className="btn-group__inner">
                          {page !== 0 && (
                            <button
                              type="button"
                              className="btn btn--ash btn--abstract"
                              onClick={goToPreviousPage}
                            >
                              {page === 0
                                ? 'Cancel'
                                : page === 1
                                  ? 'Go Back'
                                  : 'Edit Abstract'}
                            </button>
                          )}
                          <button
                            type="submit"
                            className={
                              page === 2 && !isVerified
                                ? 'btn btn--disabled btn--abstract'
                                : 'btn btn--dark-green btn--abstract'
                            }
                          >
                            {page === 0 ? (
                              'Next'
                            ) : page === 1 ? (
                              'Preview Abstract'
                            ) : isLoading ? (
                              <LoadingIcon />
                            ) : abstractToModify ? (
                              'Update Abstract'
                            ) : (
                              'Submit Abstract'
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </section>
            </div>
          </section>
        )}
      <style jsx>{`
        .Main {
          min-height: calc(100vh - 8.5rem);
          background-color: #f9f9f9;
        }

        .SubmitAbstract {
          background-color: #f9f9f9;
        }

        .SubmitAbstract__inner {
          padding-top: 6rem;
          padding-bottom: 12rem;
        }

        form {
          width: 100%;
          padding: 3rem 0;
          border-radius: 6px;
          box-shadow: 0 0 2px 0 rgba(67, 90, 111, 0.47);
          background-color: #fff;
          position: relative;
        }

        .btn-group {
          padding: 0 1.5rem;
        }

        .btn-group__inner {
          margin-bottom: 2rem !important;
        }

        .btn-group.positioned-top {
          position: static;
          top: 5.5rem;
          right: 4rem;
          padding: 0 1.5rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(151, 151, 151, 0.3);
        }

        .btn--abstract {
          font-family: 'ibm_plex_sansmedium', sans-serif;
          font-size: 1.7em;
          min-width: 18rem;
          padding: 0.6rem 2.5rem;
        }

        .btn-group.positioned-top .btn--abstract:first-child {
          color: #1e8493 !important;
          background-color: #fff !important;
          border: 2px solid #1e8493 !important;
        }

        .btn-group.positioned-top .btn--abstract:first-child:hover {
          box-shadow: 0 0 20px #1e8493;
        }

        .RecaptchaContainer {
          display: flex;
          transform: scale(0.7) translateX(-4rem);
          margin-bottom: 50px;
        }

        @media (min-width: 321px) {
          .RecaptchaContainer {
            transform: scale(0.85) translateX(-4rem);
          }
        }

        @media (min-width: 568px) {
          .RecaptchaContainer {
            transform: scale(0.95);
          }
        }

        @media (min-width: 769px) {
          .btn-group,
          .btn-group.positioned-top {
            padding-left: 2rem;
            padding-right: 2rem;
          }

          .RecaptchaContainer {
            transform: scale(1);
          }
        }

        @media (min-width: 1025px) {
          .btn-group,
          .btn-group.positioned-top {
            padding-left: 10rem;
            padding-right: 10rem;
          }
        }

        @media (min-width: 1225px) {
          .btn-group {
            padding: 0 20rem;
          }

          .btn-group.positioned-top {
            position: absolute;
            top: 6.6rem;
            right: 4rem;
            padding: 0;
            border-top: 0;
          }
        }
      `}</style>
    </main>
  );
};

const mapStateToProps = state => {
  return {
    subscriber: state.subscriber,
  };
};

export default connect(mapStateToProps, null)(SubmitAbstract);
