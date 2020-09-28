import React from 'react';
import {
  Select as EvergreenSelect,
  TagInput as EvergreenTagInput,
  Textarea as EvergreenTextArea,
} from 'evergreen-ui';
import styled from 'styled-components';

const Select = styled(EvergreenSelect)`
  & > select {
    font-family: 'ibm_plex_sansregular', sans-serif !important;
    box-shadow: none !important;
    background-image: none !important;
    color: #4a4a4a !important;
    font-size: 1.6em !important;
    border-radius: 4px !important;
    border: 1px solid #979797 !important;
    padding: 1rem !important;

    & > option {
      padding: 1rem !important;
    }
  }

  & > svg {
    fill: #4a4a4a !important;
  }
`;

const TagInput = styled(EvergreenTagInput)`
  font-family: 'ibm_plex_sansregular', sans-serif !important;
  border-radius: 4px !important;
  border: 1px solid #979797 !important;
  box-shadow: none !important;

  & > strong {
    font-family: 'ibm_plex_sansregular', sans-serif !important;
    height: 2em !important;
    font-size: 1.6em !important;
    color: #4a4a4a !important;
    background-color: rgba(71, 193, 191, 0.2) !important;
  }

  & > input {
    font-family: 'ibm_plex_sansregular', sans-serif !important;
    font-size: 1.6em !important;
    color: #4a4a4a !important;
    padding: 1rem 0 !important;
    line-height: 5 !important;
  }
`;

const TextArea = styled(EvergreenTextArea)`
  font-family: 'ibm_plex_sansregular', sans-serif !important;
  border-radius: 2px !important;
  border: 1px solid #979797 !important;
  box-shadow: none !important;
  background-color: #fff !important;
  color: #4a4a4a !important;
  padding: 1rem !important;
  font-size: 1.6rem !important;
  resize: none !important;
  height: 150px !important;
`;

export { Select, TagInput, TextArea };
