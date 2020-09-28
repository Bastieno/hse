import axios from 'axios';

const create = ({
  abstractTitle,
  abstractSubtitle,
  abstractBody,
  authors,
  presentationCategory,
  orgName,
  orgAddress,
  presenters,
  userId,
}) => {
  return axios.post('/Abstract/TechnicalPaper/Abstract/Create', {
    abstractTitle,
    abstractSubTitle: abstractSubtitle,
    abstractDesc: abstractBody,
    authors: authors.join(', '),
    userId,
    presentationCat: presentationCategory,
    organization: orgName,
    organizationAddr: orgAddress,
    presenters: presenters.join(', '),
  });
};

const getAllAbstracts = () => {
  return axios.get('/Abstract/Admin/TechnicalPaper/Abstract/List');
};

const getUserAbstracts = userId => {
  return axios.get(`/Abstract/TechnicalPaper/Abstract/List/${userId}`);
};

const getOneAbstract = abstractId => {
  return axios.get(`/Abstract/TechnicalPaper/Abstract/${abstractId}`);
};

const updateAbstract = (abstractId, request) => {
  return axios.put(`/Abstract/TechnicalPaper/Abstract/Update/${abstractId}`, {
    abstractTitle: request.abstractTitle,
    abstractSubTitle: request.abstractSubtitle,
    abstractDesc: request.abstractBody,
    authors: request.authors.join(', '),
    userId: request.userId,
    presentationCat: request.presentationCategory,
    organization: request.orgName,
    organizationAddr: request.orgAddress,
    presenters: request.presenters.join(', '),
  });
};

const changeOneAbstractStatus = ({ newStatus, remark, abstractId }) => {
  return axios.put('/Abstract/TechnicalPaper/Abstract/Status', {
    abstractStatus: newStatus,
    remark,
    abstractId,
  });
};

const changeManyAbstractsStatus = ({ status, remark, abstractIds }) => {
  return axios.put('/Abstract/TechnicalPaper/Abstract/Bulk/Status', {
    abstractStatus: status,
    remark,
    abstractId: abstractIds,
  });
};

const removeAbstractCompletely = abstractId => {
  return axios.delete(`/Abstract/Delete/${abstractId}`);
};

const uploadFullPaper = ({ abstractId, fullPaperBase64, userId }) => {
  return axios.put(
    `/Abstract/TechnicalPaper/Abstract/FullPaper/${abstractId}`,
    {
      fullPaperBase64,
      userId,
    }
  );
};

const getFullPaperBase64String = abstractId => {
  return axios.get(
    `/Abstract/Admin/TechnicalPaper/Abstract/FullPaper/${abstractId}`
  );
};

export default {
  create,
  getAllAbstracts,
  getUserAbstracts,
  getOneAbstract,
  updateAbstract,
  changeOneAbstractStatus,
  changeManyAbstractsStatus,
  removeAbstractCompletely,
  uploadFullPaper,
  getFullPaperBase64String,
};
