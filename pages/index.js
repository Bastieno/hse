import { useEffect } from 'react';
import { connect } from 'react-redux';
import { sample as getSample } from '../actions/sample';
import MainLayout from '../components/layout/MainLayout';
import CallToPaperModal from '../components/CallToPaper/CallToPaperModal';
import Banner from '../components/Banner';
import Hero from '../components/Hero';
import ConferenceResource from '../components/ConferenceResource';
import OurSponsors from '../components/OurSponsors';
import GalleryTeaser from '../components/GalleryTeaser';
import Speakers from '../components/Speakers';
import Schedule from '../components/Schedule';
import TwitterEngagement from '../components/TwitterEngagement';
import UserRoute from '../components/layout/UserRoute';

export const Homepage = ({ sample, getSample }) => {
    // useEffect(() => {
    //   getSample();
    // });

    // console.log('Sample', sample);

    return (
        <UserRoute>
            <MainLayout>
                <CallToPaperModal />
                <Banner />
                <Hero />
                <ConferenceResource />
                <OurSponsors />
                <GalleryTeaser />
                <Speakers />
                <Schedule />
                {/* <TwitterEngagement /> */}
            </MainLayout>
        </UserRoute>
    );
};

const mapStateToProps = ({ sample }) => ({ sample });

export default connect(mapStateToProps, { getSample })(Homepage);
