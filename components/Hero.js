import Link from 'next/link';
import { connect } from 'react-redux';
import { GET_HOMEPAGE_CONTENT } from '../constants/labels';
import { SpeakerIcon } from '../components/Svgs/Speaker';

const HeroLoader = () => {
    return (
        <>
            <div className="Hero__inner--loading">
                <h1 className="Hero__title animated pulse">
                    International HSE Biennial Conference
                </h1>
            </div>

            <style jsx>{`
                .Hero__inner--loading {
                    max-width: 1360px;
                    min-height: 60rem;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    font-size: 1rem;
                }

                .Hero__title {
                    margin: 0 auto;
                    font-size: 8em;
                    font-family: 'Product Sans Bold', sans-serif;
                    text-align: center;
                    line-height: 1.2;
                    color: transparent;
                    background-color: #000;
                    background-image: url('/img/hero-title-bg.jpg');
                    background-position: center;
                    background-size: contain;
                    background-clip: text;
                    -webkit-background-clip: text;
                }
            `}</style>
        </>
    );
};

const Hero = (props) => {
    return (
        <section className="Hero container-full">
            {props.isContentLoading ? (
                <HeroLoader />
            ) : (
                <div className="Hero__inner">
                    <h1 className="Hero__title">
                        {props.homepageContent.confName}
                    </h1>
                    <p className="Hero__teaser">
                        {props.homepageContent.confTheme}
                        <br />
                        {props.homepageContent.confVenue}
                        <br />
                        Date: {props.homepageContent.confDate}
                    </p>
                    <section className="Hero__cta">
                        {Object.keys(props.subscriber).length !== 0 ? (
                            <>
                                <Link href="/conference-registration">
                                    <a className="btn btn--green">
                                        Register to attend
                                    </a>
                                </Link>
                                <Link href="/abstracts">
                                    <a className="btn btn--blue">
                                        My abstracts
                                    </a>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/conference-registration">
                                    <a className="btn btn--green">
                                        Register to attend event
                                    </a>
                                </Link>
                                <Link href="/submit-abstract">
                                    <a className="btn btn--blue">
                                        Submit your abstract
                                    </a>
                                </Link>
                            </>
                        )}
                    </section>
                    <div className="call-for-paper">
                        <SpeakerIcon />
                        <span><Link href="/call-for-paper"><a style={{fontSize: '1.6em'}}>CALL FOR PAPER</a></Link></span>
                    </div>
                </div>
            )}

            <style jsx>{`
                .Hero {
                    font-family: 'ibm_plex_sansregular', sans-serif;
                    text-align: center;
                    background: url('/img/hero-bg-right.svg') 105% 32% / 20% 18%
                            no-repeat,
                        url('/img/hero-bg-left.svg') -1rem 103% / 17% 20% no-repeat;
                }

                .Hero__inner > * {
                    margin-bottom: 5rem;
                }

                .Hero__inner {
                    max-width: 1440px;
                    margin: 0 auto;
                    padding-top: 7rem;
                    padding-bottom: 10rem;
                }

                .Hero__title {
                    font-size: 5em;
                    font-family: 'Product Sans Bold', sans-serif;
                    text-align: center;
                    line-height: 1.2;
                    color: transparent;
                    background-color: #000;
                    background: url('/img/hero-title-bg.jpg') center / contain;
                    background-clip: text;
                    -webkit-background-clip: text;
                }

                .Hero__teaser {
                    max-width: 768px;
                    margin: 0 auto;
                    font-size: 2.6em;
                    background: url('/img/yellow-color-brush.svg') center 135% /
                        100% 50% no-repeat;
                    padding-bottom: 2.3rem;
                }

                .Hero__cta {
                    text-align: center;
                    font-size: 1.8em;
                    font-family: 'ibm_plex_sansmedium', sans-serif;
                    letter-spacing: -0.19px;
                }

                .Hero__cta .btn {
                    min-width: 100%;
                    padding: 1rem 1.5rem;
                    margin-bottom: 2rem;
                    color: #fff;
                }

                .Hero__cta .btn:last-of-type {
                    margin-right: 0;
                }

                .call-for-paper {
                    text-align: center;
                    font-size: 2.0em;
                    font-family: 'ibm_plex_sansregular', sans-serif;
                    letter-spacing: -0.19px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 40px;
                }

                @media (max-width: 576px) {
                    .Hero__title {
                        font-size: 30px;
                    }

                    .Hero__teaser {
                        font-size: 18px;
                    }
                }

                @media (min-width: 425px) {
                    .Hero {
                        background-position: 105% 12rem, -2rem 110%;
                        background-size: 14% 40%, 15% 30%;
                    }

                    .Hero__cta .btn {
                        min-width: calc(100% / 2 - 1.6rem);
                    }
                }

                @media (min-width: 481px) {
                    .Hero {
                        background-position: right 7rem, -1rem bottom;
                        background-size: 12% 40%, 15% 40%;
                    }

                    .Hero__title {
                        font-size: 5.5em;
                    }

                    .Hero__cta .btn {
                        min-width: 250px;
                    }
                }

                @media (min-width: 1024px) {
                    .Hero__title {
                        font-size: 6.5em;
                    }
                }

                @media (min-width: 1225px) {
                    .Hero {
                        background-position: right 7rem, -1rem bottom;
                        background-size: auto, auto;
                    }

                    .Hero__title {
                        font-size: 8.5em;
                    }

                    .Hero__cta .btn {
                        min-width: 260px;
                    }
                }
            `}</style>
        </section>
    );
};

const mapStateToProps = (state) => {
    return {
        subscriber: state.subscriber,
        homepageContent: state.homepageContent,
        isContentLoading: state.isLoading[GET_HOMEPAGE_CONTENT],
    };
};

export default connect(mapStateToProps, {})(Hero);
