import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import { dateFormatter, timeFormatter } from '../helpers/formatters';
import abstractStatus from '../constants/abstractStatus';
import { Alert, Icon, message } from 'antd';
import { LoadingIcon } from './commons/Icons';
import abstractService from '../services/abstract';

class FullpaperUploader extends Component {
    state = {
        fileList: [],
        fileURL: '',
        fileReadError: '',
        fileUploadError: false,
        isUploading: false,
    };

    handleFileRead = e => {
        this.setState({
            fileURL: '',
            fileReadError: '',
            fileUploadError: false,
            isUploading: false,
        });

        const fileInputElem = e.currentTarget;
        const fileList = fileInputElem.files;

        const supportedFileTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        ];

        const reader = new FileReader();
        reader.readAsDataURL(fileList[0]);

        if (fileList[0].size / 1000000 >= 1.5) {
            this.setState({ fileReadError: 'File size is more than 1.5MB.' });
            reader.abort();
        }

        if (!supportedFileTypes.includes(fileList[0].type)) {
            this.setState({ fileReadError: 'File type is not supported.' });
            reader.abort();
        }

        reader.onload = () => {
            this.setState({ fileList });

            window.URL = window.URL || window.webkitURL;
            const fileURL = window.URL.createObjectURL(fileList[0]);
            this.setState({ fileURL });

            this.handleFileUpload(reader.result, fileInputElem);
        };

        reader.onerror = this.handleFileReadError;
    };

    handleFileReadError = e => {
        switch (e.target.error.code) {
            case e.target.error.NOT_FOUND_ERR:
                this.setState({ fileReadError: 'File Not Found.' });
                break;
            case e.target.error.NOT_READABLE_ERR:
                this.setState({ fileReadError: 'File is not readable.' });
                break;
            case e.target.error.ABORT_ERR:
                this.setState({ fileReadError: 'File size is more than 2MB.' });
                break;
            case e.target.error.DOM_FILE_ABORT_ERR:
                this.setState({ fileReadError: 'File size is more than 2MB.' });
                break;
            default:
                this.setState({
                    fileReadError: 'An error occurred reading this file.',
                });
        }
    };

    handleFileUpload = async (base64String, fileInputElem) => {
        this.setState({ isUploading: true });

        try {
            const { data } = await abstractService.uploadFullPaper({
                abstractId: this.props.abstract.id,
                fullPaperBase64: base64String,
                userId: this.props.subscriber.userId,
            });

            if (data.code === '00') {
                this.setState({ isUploading: false, fileUploadError: false });
                this.props.setRefreshCount(value => value + 1);
                return message.success('Full paper successfully uploaded');
            }

            this.handleFileUploadError(fileInputElem);
        } catch (error) {
            console.log('Fullpaper Upload: ', error, error.message);
            this.handleFileUploadError(fileInputElem);
        }

        this.setState({ isUploading: false });
    };

    handleFileUploadError = fileInputElem => {
        fileInputElem.value = '';

        if (!/safari/i.test(navigator.userAgent)) {
            fileInputElem.type = '';
            fileInputElem.type = 'file';
        }

        this.setState({ fileUploadError: true });
        message.error('Full paper upload failed. Please try again.');
    };

    render() {
        return (
            <>
                <input
                    type="file"
                    id="fileElem"
                    accept=".pdf, .pptx, .ppt, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="visually-hidden"
                    onChange={this.handleFileRead}
                />
                <label
                    htmlFor="fileElem"
                    className="btn btn--dark-green btn--upload-full-paper"
                >
                    Upload full paper
                </label>

                {this.state.fileReadError && (
                    <div className="FileReadError">
                        <Alert
                            message={this.state.fileReadError}
                            type="error"
                        />
                    </div>
                )}

                {this.state.fileList.length !== 0 && (
                    <div className="FileName">
                        {this.state.isUploading ? (
                            <Icon type="loading" spin />
                        ) : (
                            <Icon type="paper-clip" />
                        )}

                        <a href={this.state.fileURL} target="_blank">
                            {this.state.fileList[0].name}
                        </a>
                    </div>
                )}

                <style jsx>{`
                    .btn--upload-full-paper {
                        padding: 0.5rem 2.2rem;
                        font-family: 'ibm_plex_sansmedium', sans-serif;
                        font-size: 1.54rem;
                    }

                    .visually-hidden {
                        position: absolute !important;
                        height: 1px;
                        width: 1px;
                        overflow: hidden;
                        clip: rect(1px, 1px, 1px, 1px);
                    }

                    input.visually-hidden:focus + label {
                        outline: thin dotted;
                    }

                    input.visually-hidden:focus-within + label {
                        outline: thin dotted;
                    }

                    .FileReadError,
                    .FileName {
                        margin-top: 2rem;
                        font-size: 1.55rem;
                        font-family: 'ibm_plex_sansregular', sans-serif;
                    }

                    .FileName a {
                        margin-left: 0.5rem;
                        color: ${this.state.fileUploadError
                            ? '#f5222d'
                            : '#1890ff'};
                    }
                `}</style>
            </>
        );
    }
}

const ShowMoreButton = ({ truncated, handleTruncation }) => {
    return (
        <>
            <button className="btn--show-more" onClick={handleTruncation}>
                {truncated ? 'Show More' : 'Show Less'}
            </button>

            <style jsx>{`
                .btn--show-more {
                    display: inline-block;
                    padding: 0;
                    margin: 0;
                    font-family: 'ibm_plex_sansregular', sans-serif;
                    font-size: 1.7rem;
                    color: #36a3f9;
                    background: transparent;
                    line-height: 1.67;
                }

                .btn--show-more:hover {
                    cursor: pointer;
                    color: #0f92fa;
                }
            `}</style>
        </>
    );
};

const AbstractCard = ({ subscriber, abstract, onDelete }) => {
    const [truncated, setTruncated] = useState(true);
    const [fullPaperString, setFullPaperString] = useState('');
    const [isGettingFullPaper, setIsGettingFullPaper] = useState(false);
    const [refereshCount, setRefreshCount] = useState(0);

    const handleTruncation = () => {
        setTruncated(state => !state);
    };

    const fetchFullPaperBase64String = async () => {
        setIsGettingFullPaper(true);

        const { data } = await abstractService.getFullPaperBase64String(
            abstract.id
        );
        setFullPaperString(data.fullPaper);
        setIsGettingFullPaper(false);
    };

    useEffect(() => {
        fetchFullPaperBase64String();
    }, [refereshCount]);

    return (
        <>
            <div className="AbstractCard">
                <section className="AbstractDetails">
                    <section className="AbstractDateTime">
                        <p>Submitted: {dateFormatter(abstract.entryDate)}</p>
                        <p>{timeFormatter(abstract.entryDate)}</p>
                    </section>

                    <h2 className="title">{abstract.abstractTitle}</h2>

                    <h3 className="subtitle">{abstract.abstractSubTitle}</h3>

                    <div
                        className={
                            truncated && abstract.abstractDesc.length >= 600
                                ? 'body truncated'
                                : 'body'
                        }
                    >
                        {ReactHtmlParser(abstract.abstractDesc)}
                    </div>

                    {abstract.abstractDesc.length >= 600 && (
                        <ShowMoreButton
                            truncated={truncated}
                            handleTruncation={handleTruncation}
                        />
                    )}

                    <div className="CategoryPlusAuthors">
                        <section>
                            <h3>Presentation Category</h3>
                            <p>{abstract.presentationCat}</p>
                        </section>
                        <section>
                            <h3>Authors</h3>
                            <p>{abstract.authors}</p>
                        </section>
                    </div>

                    <div className="Presenters">
                        <section>
                            <h3>Presenters</h3>
                            <p>{abstract.presenters}</p>
                        </section>
                    </div>

                    <div className="OrgNamePlusAddress">
                        <section>
                            <h3>Name of Organisation</h3>
                            <p>{abstract.organization}</p>
                        </section>
                        <section>
                            <h3>Address of Organisation</h3>
                            <p>{abstract.organizationAddr}</p>
                        </section>
                    </div>
                </section>

                <div className="AbstractStatusPlusRemark">
                    <section className="AbstractStatus">
                        <div>
                            <h3>Abstract Status</h3>
                            <p>{abstractStatus[abstract.status].value}</p>
                        </div>

                        <div className="AbstractStatus__Btns">
                            {abstract.status == 3 && (
                                <FullpaperUploader
                                    subscriber={subscriber}
                                    abstract={abstract}
                                    setRefreshCount={setRefreshCount}
                                />
                            )}

                            {abstract.status == 0 && (
                                <Link
                                    href={`/submit-abstract?id=${abstract.id}`}
                                >
                                    <a className="btn btn--update-abstract">
                                        Update abstract
                                    </a>
                                </Link>
                            )}

                            {abstract.status == 99 && (
                                <button
                                    className="btn btn--remove-abstract"
                                    onClick={() => onDelete(abstract.id)}
                                >
                                    Remove abstract
                                </button>
                            )}
                        </div>
                    </section>

                    {abstract.fullPaperStatus === 1 && (
                        <section className="PastFullPaper">
                            <p>
                                You have already submitted the full paper for
                                this abstract.{' '}
                                {fullPaperString && (
                                    <a
                                        href={fullPaperString}
                                        download={`${subscriber.firstName}-Fullpaper-abstract`}
                                    >
                                        Download submitted full paper
                                    </a>
                                )}
                                {isGettingFullPaper && (
                                    <Icon type="loading" spin />
                                )}
                            </p>
                        </section>
                    )}

                    <section className="Remark">
                        <h3>Remark</h3>
                        <div>
                            {abstract.remark ? (
                                ReactHtmlParser(abstract.remark)
                            ) : (
                                <span
                                    style={{
                                        fontStyle: 'italic',
                                        opacity: 0.4,
                                    }}
                                >
                                    Remark not available yet
                                </span>
                            )}
                        </div>
                    </section>
                </div>
            </div>

            <style jsx>{`
                .AbstractCard {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 5rem;
                    font-size: 1rem;
                    position: relative;
                }

                .AbstractDetails {
                    width: 100%;
                    padding: 1.7rem;
                    background-color: #f6f9fc;
                    position: relative;
                }

                .title {
                    font-family: 'ibm_plex_sansbold', sans-serif;
                    font-size: 2.1em;
                    color: #212242;
                    margin-bottom: 1rem;
                    margin-top: 2rem;
                }

                .subtitle {
                    font-family: 'ibm_plex_sansmedium', sans-serif;
                    font-size: 1.9rem;
                    color: #5e6c84;
                    margin-bottom: 3.2rem;
                }

                .body {
                    font-family: 'ibm_plex_sansregular', sans-serif;
                    font-size: 1.7em;
                    line-height: 1.67;
                    letter-spacing: 0.4px;
                    color: #212242;
                }

                .body p,
                .body.truncated p {
                    margin-bottom: 0;
                }

                .body.truncated {
                    --lh: 1.67em;
                    --max-lines: 1;
                    line-height: var(--lh);
                    position: relative;
                    max-height: calc(var(--lh) * var(--max-lines));
                    overflow: hidden;
                }

                .body.truncated::after {
                    content: '';
                    position: absolute;
                    right: 0;
                    width: 1rem;
                    height: 1rem;
                    background: transparent;
                }

                .CategoryPlusAuthors,
                .Presenters,
                .OrgNamePlusAddress {
                    padding-top: 2rem;
                    padding-bottom: 2rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-column-gap: 1rem;
                    border-bottom: 1px solid rgba(23, 23, 37, 0.2);
                }

                .OrgNamePlusAddress {
                    border-bottom: none;
                }

                .CategoryPlusAuthors h3,
                .Presenters h3,
                .OrgNamePlusAddress h3 {
                    font-family: 'ibm_plex_sansmedium', sans-serif;
                    font-size: 1.6em;
                    color: #4a4a4a;
                }

                .CategoryPlusAuthors p,
                .Presenters p,
                .OrgNamePlusAddress p {
                    font-family: 'ibm_plex_sansregular', sans-serif;
                    font-size: 1.7em;
                    color: #171725;
                    margin-bottom: 0;
                }

                .AbstractDateTime p {
                    font-family: 'ibm_plex_sansmedium', sans-serif;
                    font-size: 1.5rem;
                    text-align: right;
                    color: #212242;
                    margin-bottom: 0;
                }

                .AbstractDateTime p:nth-child(2) {
                    font-family: 'ibm_plex_sansregular', sans-serif;
                }

                .AbstractStatusPlusRemark {
                    width: 100%;
                    padding-left: 1.7rem;
                    padding-right: 1.7rem;
                    margin-top: 2rem;
                }

                .AbstractStatus {
                    display: flex;
                    align-items: center;
                }

                .AbstractStatus h3 {
                    font-family: 'ibm_plex_sansmedium', sans-serif;
                    font-size: 1.7em;
                    color: #212242;
                    margin-bottom: 0.5rem;
                }

                .AbstractStatus p,
                .Remark h3 {
                    margin-bottom: 1rem;
                    font-family: 'ibm_plex_sansbold', sans-serif;
                    font-size: 2rem;
                    color: ${abstractStatus[abstract.status].color};
                }

                .AbstractStatus__Btns {
                    margin-left: 2rem;
                }

                .btn--update-abstract,
                .btn--remove-abstract {
                    color: #fff;
                    padding: 0.5rem 2.2rem;
                    font-family: 'ibm_plex_sansbold', sans-serif;
                    font-size: 1.4em;
                    min-width: 15.5rem;
                }

                .btn--update-abstract {
                    background-color: #1d1f6e;
                }

                .btn--remove-abstract {
                    background-color: #dd573b;
                }

                .btn--update-abstract:hover {
                    cursor: pointer;
                    background-color: #4346bf;
                }

                .PastFullPaper,
                .Remark {
                    margin-top: 1.5rem;
                }

                .Remark h3 {
                    margin-bottom: 0;
                    font-size: 1.8rem;
                    color: #212242;
                }

                .PastFullPaper,
                .Remark div {
                    font-size: 1.6em;
                    color: #212242;
                    font-family: 'ibm_plex_sansregular', sans-serif;
                }

                @media (min-width: 769px) {
                    .AbstractCard {
                        flex-direction: column;
                    }

                    .AbstractDetails {
                        width: 100%;
                        padding: 2.7rem;
                    }

                    .AbstractStatusPlusRemark {
                        width: 100%;
                        padding-left: 2.7rem;
                        padding-right: 2.7rem;
                        display: flex;
                    }

                    .AbstractStatus {
                        display: unset;
                        align-items: unset;
                        width: 50%;
                    }

                    .AbstractStatus__Btns {
                        margin-left: 0;
                    }

                    .Remark {
                        margin-top: 0;
                    }
                }

                @media (min-width: 1025px) {
                    .AbstractCard {
                        flex-direction: row;
                    }

                    .AbstractDetails {
                        width: 75%;
                        padding: 3.7rem;
                    }

                    .body.truncated {
                        --max-lines: 3;
                    }

                    .AbstractStatusPlusRemark {
                        width: 25%;
                        padding-left: 3rem;
                        padding-right: 2rem;
                        margin-top: 0;
                        display: initial;
                    }

                    .AbstractStatus {
                        display: initial;
                        align-items: unset;
                    }

                    .AbstractStatus__Btns {
                        margin-left: 0;
                    }

                    .Remark {
                        margin-top: 4rem;
                    }
                }
            `}</style>
        </>
    );
};

const UserAbstracts = ({ subscriber, abstracts, onDelete }) => {
    return (
        <>
            <section className="UserAbstracts">
                <div className="UserAbstracts__inner container-1220">
                    <div style={{ marginBottom: 28 }}>
                        <h1>Submitted Abstracts</h1>
                        <Link href="/submit-abstract">
                            <a>Submit a new abstract</a>
                        </Link>
                    </div>

                    {abstracts.map((abstract, idx) => (
                        <AbstractCard
                            key={idx}
                            subscriber={subscriber}
                            abstract={abstract}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            </section>

            <style jsx>{`
                h1 {
                    font-family: 'ibm_plex_sansbold', sans-serif;
                    font-size: 2.2em;
                    color: #212242;
                    display: inline-block;
                    margin-right: 2rem;
                }

                a {
                    padding: 0.8rem 2.9rem;
                    border-radius: 24px;
                    font-family: 'ibm_plex_sansmedium', sans-serif;
                    font-size: 1.4em;
                    color: #fff;
                    background-color: #36a3f9;
                    display: inline-block;
                }

                a:hover {
                    cursor: pointer;
                    background-color: #0f92fa;
                }
            `}</style>
        </>
    );
};

const mapStateToProps = state => {
    return { subscriber: state.subscriber };
};

export default connect(mapStateToProps, null)(UserAbstracts);
