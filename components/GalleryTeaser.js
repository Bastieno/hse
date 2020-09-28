import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import { useMediaQuery } from 'react-responsive';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import useInterval from '../helpers/useInterval';
import {
  CLOUD_NAME,
  IMAGE_UPLOAD_BASE_URL,
  IMAGE_FETCH_BASE_URL,
} from '../constants/cloudinary';

const StyledImage = styled(Image)`
  max-width: 100%;
  /* max-height: 100%; */
`;

const LargeScreenGallery = () => {
  const [pictures, setPictures] = useState([]);
  const [activePicture, setActivePicture] = useState({index: 0});

  const fetcher = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const transformed = data.resources.map((image, index) => ({
          index,
          image,
        }));

        setPictures(transformed);
        setActivePicture(transformed[1]);
      });
  };

  useSWR(`${IMAGE_FETCH_BASE_URL}/hse-dpro-gallery.json`, fetcher);

  const getNextPicture = () => {
    let newIdx = pictures.indexOf(activePicture) + 1;
    if (newIdx === pictures.length) newIdx = 1;
    setActivePicture(pictures[newIdx]);
  };

  const getPrevPicture = () => {
    let newIdx = pictures.indexOf(activePicture) - 1;
    if (newIdx === 0) newIdx = pictures.length - 1;
    setActivePicture(pictures[newIdx]);
  };

  useInterval(getNextPicture, 3000);

  const setPictureItemClass = idx => {
    let defaultClass = 'GalleryTeaser__tiles__item';
    return activePicture.index && idx !== activePicture.index
      ? defaultClass
      : (defaultClass += ' active-slide-item');
  };

  return (
    <>
      <div className="GalleryTeaser__inner container-1440">
        <section className="GalleryTeaser__tiles">
          <img
            src="/icons/angle-left-solid.svg"
            title="Previous Picture"
            onClick={getPrevPicture}
            // disabled={pictures.indexOf(activePicture) === 1}
          />

          <div className="gallery-pictures-slider">
            <ul
              className="GalleryTeaser__tiles__list"
              style={{
                transform: `translateX(-${(pictures.indexOf(activePicture) -
                  1) *
                  (100 / pictures.length)}%)`,
              }}
            >
              {pictures.map(elem => (
                <li
                  key={elem.index}
                  className={setPictureItemClass(elem.index)}
                >
                  <StyledImage
                    publicId={elem.image.public_id}
                    cloudName={CLOUD_NAME}
                    dpr="auto"
                    responsive
                    width="auto"
                    crop="scale"
                    background="black"
                  >
                    <Transformation
                      quality="auto"
                      fetchFormat="auto"
                      responsive_placeholder="blank"
                    />
                  </StyledImage>
                </li>
              ))}
            </ul>
          </div>

          <img
            src="/icons/angle-right-solid.svg"
            title="Next Picture"
            onClick={getNextPicture}
            // disabled={pictures.indexOf(activePicture) === pictures.length - 1}
          />
        </section>

        <section className="GalleryTeaser__text">
          <h2>Gallery</h2>
          <p>See photos from previous conferences</p>
          <p>
            <Link href="/gallery">
              <a>See all conference pictures</a>
            </Link>
          </p>
        </section>
      </div>

      <style jsx>{`
        .GalleryTeaser__inner {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-top: 10.5rem;
          padding-bottom: 7.5rem;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        .GalleryTeaser__tiles {
          display: flex;
          align-items: center;
        }

        .GalleryTeaser__tiles > img {
          width: 3.6rem;
          height: 3.6rem;
          cursor: pointer;
        }

        .GalleryTeaser__tiles > img:hover {
          cursor: pointer;
          background-color: rgba(74, 144, 226, 0.2);
        }

        .gallery-pictures-slider {
          position: relative;
          margin: 0 2.8rem;
          width: calc(32.5rem * 3);
          height: 217px;
          overflow: hidden;
        }

        .GalleryTeaser__tiles__list {
          display: flex;
          align-items: center;
          position: absolute;
          height: 100%;
          transition: transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .GalleryTeaser__tiles__item {
          width: 32.5rem;
          height: 100%;
          transform: scale(0.8);
          opacity: 0.8;
          transition: opacity 300ms linear,
            transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .GalleryTeaser__tiles__item.active-slide-item {
          transform: scale(1);
          opacity: 1;
        }

        .GalleryTeaser__tiles__item img {
          max-width: 100%;
          max-height: 100%;
        }

        .GalleryTeaser__text {
          margin-left: 3.26rem;
          flex-grow: 1;
          line-height: 1.38;
          font-family: 'ibm_plex_sansregular', sans-serif;
        }

        .GalleryTeaser__text h2 {
          margin-bottom: 1rem;
          color: #000;
          font-size: 5em;
          font-family: 'ibm_plex_sansbold', sans-serif;
        }

        .GalleryTeaser__text p {
          font-size: 2.5em;
        }

        .GalleryTeaser__text p:last-child {
          display: inline-block;
          color: #0c47f4;
          margin-top: 1rem;
          border-bottom: 2px solid transparent;
          transition: all 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .GalleryTeaser__text p:last-child:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        .GalleryTeaser__text p:last-child a {
          color: inherit;
        }
      `}</style>
    </>
  );
};

const MediumScreenGallery = () => {
  const [pictures, setPictures] = useState([]);
  const [activePicture, setActivePicture] = useState({index: 0});

  const fetcher = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const transformed = data.resources.map((image, index) => ({
          index,
          image,
        }));

        setPictures(transformed);
        setActivePicture(transformed[1]);
      });
  };

  useSWR(`${IMAGE_FETCH_BASE_URL}/hse-dpro-gallery.json`, fetcher);

  const getNextPicture = () => {
    let newIdx = pictures.indexOf(activePicture) + 1;
    if (newIdx === pictures.length) newIdx = 1;
    setActivePicture(pictures[newIdx]);
  };

  const getPrevPicture = () => {
    let newIdx = pictures.indexOf(activePicture) - 1;
    if (newIdx === 0) newIdx = pictures.length - 1;
    setActivePicture(pictures[newIdx]);
  };

  useInterval(getNextPicture, 3000);

  const setPictureItemClass = idx => {
    let defaultClass = 'GalleryTeaser__tiles__item';
    return activePicture.index && idx !== activePicture.index
      ? defaultClass
      : (defaultClass += ' active-slide-item');
  };

  return (
    <>
      <div className="GalleryTeaser__inner container-1440">
        <h2 className="GalleryTeaser__Title--lg">Gallery</h2>
        <p className="GalleryTeaser__Intro--lg">
          See photos from previous conferences
        </p>

        <section className="GalleryTeaser__tiles">
          <img
            src="/icons/angle-left-solid.svg"
            title="Previous Picture"
            onClick={getPrevPicture}
          />

          <div className="gallery-pictures-slider">
            <ul
              className="GalleryTeaser__tiles__list"
              style={{
                transform: `translateX(-${(pictures.indexOf(activePicture) -
                  1) *
                  (100 / pictures.length)}%)`,
              }}
            >
              {pictures.map(elem => (
                <li
                  key={elem.index}
                  className={setPictureItemClass(elem.index)}
                >
                  <StyledImage
                    publicId={elem.image.public_id}
                    cloudName={CLOUD_NAME}
                    dpr="auto"
                    responsive
                    width="auto"
                    crop="scale"
                    background="black"
                  >
                    <Transformation
                      quality="auto"
                      fetchFormat="auto"
                      responsive_placeholder="blank"
                    />
                  </StyledImage>
                </li>
              ))}
            </ul>
          </div>

          <img
            src="/icons/angle-right-solid.svg"
            title="Next Picture"
            onClick={getNextPicture}
          />
        </section>

        <p className="SeeAll__Link--lg">
          <Link href="gallery">
            <a>See all conference pictures</a>
          </Link>
        </p>
      </div>

      <style jsx>{`
        .GalleryTeaser__inner {
          display: flex;
          flex-direction: column;
          padding-top: 7.5rem;
          padding-bottom: 7.5rem;
        }

        .GalleryTeaser__Title--lg {
          margin-bottom: 1rem;
          color: #000;
          font-size: 3.5em;
          font-family: 'ibm_plex_sansbold', sans-serif;
        }

        .GalleryTeaser__Intro--lg {
          font-size: 2.5em;
          margin-bottom: 6rem;
        }

        .SeeAll__Link--lg {
          text-align: right;
          font-size: 2.5em;
          color: #0c47f4;
          margin-top: 3rem;
          border-bottom: 2px solid transparent;
          transition: all 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .SeeAll__Link--lg:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        .SeeAll__Link--lg a {
          color: inherit;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        .GalleryTeaser__tiles {
          display: flex;
          align-items: center;
          width: 100%;
        }

        .GalleryTeaser__tiles > img {
          width: 3.6rem;
          height: 3.6rem;
          cursor: pointer;
        }

        .GalleryTeaser__tiles > img:hover {
          cursor: pointer;
          background-color: rgba(74, 144, 226, 0.2);
        }

        .gallery-pictures-slider {
          position: relative;
          margin: 0 2.8rem;
          flex-grow: 1;
          height: 186px;
          overflow: hidden;
        }

        .GalleryTeaser__tiles__list {
          display: flex;
          align-items: center;
          position: absolute;
          height: 100%;
          transition: transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .GalleryTeaser__tiles__item {
          width: calc(100vw / 3.6);
          height: 100%;
          transform: scale(0.8);
          opacity: 0.8;
          transition: opacity 300ms linear,
            transform 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        @media (min-width: 1100px) {
          .GalleryTeaser__tiles__item {
            width: calc(100vw / 3.4);
          }
        }

        .GalleryTeaser__tiles__item.active-slide-item {
          transform: scale(1);
          opacity: 1;
        }

        .GalleryTeaser__tiles__item img {
          max-width: 100%;
          max-height: 100%;
        }
      `}</style>
    </>
  );
};

const SmallScreenGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  const fetcher = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const transformed = data.resources.map((image, index) => ({
          index,
          original: `${IMAGE_UPLOAD_BASE_URL}/f_auto,q_auto/w_auto,h_662,c_scale,dpr_1.0/v1/${image.public_id}`,
          thumbnail: `${IMAGE_UPLOAD_BASE_URL}/w_150,h_100,c_scale/v1/${image.public_id}`,
        }));

        setGalleryItems(transformed);
      });
  };

  useSWR(`${IMAGE_FETCH_BASE_URL}/hse-dpro-gallery.json`, fetcher);

  return (
    <section className="GalleryTeaser">
      <div
        className="container-1440"
        style={{ paddingTop: '6.47rem', paddingBottom: '5.5rem' }}
      >
        <h2 className="GalleryTeaser__Title">Gallery</h2>
        <p className="GalleryTeaser__Intro">
          See photos from previous conferences
        </p>
        <ImageGallery items={galleryItems} autoPlay={true} />
        <p className="SeeAll__Link">See all pictures</p>
      </div>

      <style jsx>{`
        .GalleryTeaser {
          background-color: #f9f9f9;
          font-family: 'Product Sans Regular', sans-serif;
        }

        .GalleryTeaser__Title {
          margin-bottom: 1rem;
          color: #000;
          font-size: 3.5em;
          font-family: 'Product Sans Bold', sans-serif;
        }

        .GalleryTeaser__Intro {
          font-size: 2.5em;
          margin-bottom: 6rem;
        }

        .SeeAll__Link {
          text-align: right;
          font-size: 2.5em;
          color: #0c47f4;
          margin-top: 3rem;
          border-bottom: 2px solid transparent;
          transition: all 300ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        }

        .SeeAll__Link:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};

const GalleryTeaser = () => {
  const isMediumScreen = useMediaQuery({
    query: '(min-width: 960px)',
  });

  const isLargeScreen = useMediaQuery({
    query: '(min-width: 1440px)',
  });

  return isLargeScreen ? (
    <LargeScreenGallery />
  ) : isMediumScreen ? (
    <MediumScreenGallery />
  ) : (
    <SmallScreenGallery />
  );
};

export default GalleryTeaser;
