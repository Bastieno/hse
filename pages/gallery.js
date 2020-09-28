import React, { Component, useState } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import EvergreenIcon from '../components/commons/Icons';
import {
  CLOUD_NAME,
  IMAGE_UPLOAD_BASE_URL,
  IMAGE_FETCH_BASE_URL,
} from '../constants/cloudinary';
import UserRoute from '../components/layout/UserRoute';
import MainLayout from '../components/layout/MainLayout';

const StyledImage = styled(Image)`
  max-width: 100%;
  /* max-height: 100%; */
`;

const StyledImageGallery = styled(ImageGallery)`
  .image-gallery-image {
    height: 662px;
  }

  .image-gallery-slide .image-gallery-image img {
    width: 100%;
    max-height: 100% !important;
  }
`;

const Lightbox = ({ lightboxPhotos, startIndex, hideLightbox }) => {
  return (
    <>
      <div className="container" onClick={hideLightbox}>
        <div className="inner" onClick={e => e.stopPropagation()}>
          <span className="close-icon" title="Close" onClick={hideLightbox}>
            <EvergreenIcon
              type="cross"
              color="#fff"
              size={'2.5rem'}
              hovercolor="#3479B4"
            />
          </span>

          <StyledImageGallery
            items={lightboxPhotos}
            showFullscreenButton={false}
            showIndex={true}
            startIndex={Number(startIndex)}
          />
        </div>
      </div>

      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
        }

        .close-icon {
          display: inline-block;
          padding: 0.5px 4px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 5;
          background: rgba(0, 0, 0, 0.4);
        }

        .inner {
          width: 90%;
          max-width: 1000px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          z-index: 1;
        }
      `}</style>
    </>
  );
};

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [lightboxPhotos, setLightboxPhotos] = useState([]);
  const [isLightboxVisible, setLightboxVisibility] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const showLightbox = e => {
    e.stopPropagation();
    setStartIndex(e.currentTarget.dataset.index);
    setLightboxVisibility(true);
  };

  const hideLightbox = e => {
    e.stopPropagation();
    setLightboxVisibility(false);
  };

  const fetcher = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const transformed = data.resources.map((image, index) => ({
          index,
          image,
        }));

        const lightbox = data.resources.map((image, i) => {
          return {
            original: `${IMAGE_UPLOAD_BASE_URL}/f_auto,q_auto/w_auto,h_662,c_scale,dpr_1.0/v1/${image.public_id}`,
            thumbnail: `${IMAGE_UPLOAD_BASE_URL}/w_150,h_100,c_scale/v1/${image.public_id}`,
          };
        });

        setPhotos(transformed);
        setLightboxPhotos(lightbox);
      });
  };

  useSWR(`${IMAGE_FETCH_BASE_URL}/hse-dpro-gallery.json`, fetcher);

  return (
    <UserRoute>
      <MainLayout>
        <>
          <main className="Gallery">
            <div className="Gallery__Inner container">
              {isLightboxVisible && (
                <Lightbox
                  lightboxPhotos={lightboxPhotos}
                  startIndex={startIndex}
                  hideLightbox={hideLightbox}
                />
              )}

              <h1>Gallery</h1>

              <p>View pictures from past conferences</p>

              <div className="GalleryList">
                {photos.map((elem, i) => (
                  <div
                    className="GalleryItem"
                    key={i}
                    data-index={i}
                    onClick={showLightbox}
                  >
                    <StyledImage
                      publicId={elem.image.public_id}
                      cloudName={CLOUD_NAME}
                      dpr="auto"
                      responsive
                      width="auto"
                      crop="scale"
                    >
                      <Transformation
                        quality="auto"
                        fetchFormat="auto"
                        radius="75"
                        responsive_placeholder="blank"
                      />
                    </StyledImage>
                  </div>
                ))}
              </div>
            </div>
          </main>

          <style jsx>{`
            .container {
              width: 100%;
              max-width: 1220px;
              margin: 0 auto;
              padding-left: 1.5rem;
              padding-right: 1.5rem;
              font-size: 1rem;
            }

            .Gallery {
              padding-left: 1rem;
              padding-right: 1rem;
              min-height: calc(100vh - 8.5rem);
              background-color: #f6f9fc;
              font-size: 1rem;
              font-family: 'ibm_plex_sansregular', sans-serif;
            }

            .Gallery__Inner {
              padding-top: 7rem;
              padding-bottom: 10rem;
            }

            h1 {
              margin-bottom: 1.5rem;
              font-size: 4em;
              color: #212242;
              font-family: 'ibm_plex_sansbold', sans-serif;
            }

            p {
              font-family: 'ibm_plex_sansregular', sans-serif;
              font-size: 2.3em;
              line-height: 1.15;
              letter-spacing: normal;
              color: #4a4a4a;
              margin-bottom: 5rem;
            }

            .GalleryList {
              display: grid;
              grid-gap: 1.8rem;
              grid-template-columns: repeat(6, 1fr);
            }

            .GalleryItem {
              cursor: pointer;
            }

            @media (max-width: 800px) {
              .GalleryList {
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
              }

              .GalleryItem {
                width: 31%;
                margin: 1%;
                // background: #3c261b;
              }
            }

            .GalleryItem:first-of-type {
              grid-column: span 3;
              grid-row: span 3;
            }

            .GalleryItem:nth-of-type(11) {
              grid-column: 1/-1;
            }

            .GalleryItem:nth-of-type(16),
            .GalleryItem:nth-of-type(42) {
              grid-row: span 2;
            }
          `}</style>
        </>
      </MainLayout>
    </UserRoute>
  );
};

export default Gallery;
