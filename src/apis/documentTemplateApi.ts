import {
  DocumentTemplate,
  DocumentTemplateDetail,
  SampleDocumentUrl,
} from '@/interfaces/document-template';
import apiBase from './config';
import {
  CreateDocumentTemplateDto,
  EditDocumentTemplateDto,
  SaveDocumentTemplateDto,
} from '@/dtos/documentTemplateDto';
import axios from 'axios';
import { DocumentTemplateType } from '@/interfaces/enums/document-template-type';

const getDocumentTemplates = async (type?: DocumentTemplateType, limit: number=0 , page: number=5): Promise<DocumentTemplate[]> => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/document-template`, {
      params: {
        type,
        limit,
        page
      }
    })
    .then((res: any) => {
      return res.data;
    });
};

const createDocumentTemplate = async (
  payload: CreateDocumentTemplateDto
): Promise<DocumentTemplate> => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_DEV_API}/document-template`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const editDocumentTemplate = async (
  id: string,
  payload: EditDocumentTemplateDto
): Promise<DocumentTemplate> => {
  return await apiBase
    .put(`${process.env.NEXT_PUBLIC_DEV_API}/document-template/${id}`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const deleteDocumentTemplate = async (
  id: string
): Promise<DocumentTemplate> => {
  return await apiBase
    .delete(`${process.env.NEXT_PUBLIC_DEV_API}/document-template/${id}`)
    .then((res: any) => {
      return res.data;
    });
};

const getDocumentTemplateDetail = async (
  id: string
): Promise<DocumentTemplateDetail> => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/document-template/${id}`)
    .then((res: any) => {
      return res.data;
    });
};

const saveDocumentTemplate = async (
  id: string,
  payload: SaveDocumentTemplateDto
): Promise<DocumentTemplateDetail> => {
  return await apiBase
    .put(
      `${process.env.NEXT_PUBLIC_DEV_API}/document-template/${id}/save`,
      payload
    )
    .then((res: any) => {
      return res.data;
    });
};

const uploadSampleDocument = async (
  id: string,
  file: File
): Promise<SampleDocumentUrl> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      fetch(
        `${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL}/${id}/sample-document`,
        {
          method: 'POST',
          body: reader.result,
          headers: {
            'Content-Type': file.type,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    };
    reader.onerror = (error) => reject(error);
  });
};

const getPresignedUrl = async (id: string): Promise<SampleDocumentUrl> => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL}/${id}/sample-document`)
    .then((res: any) => {
      return res.data;
    });
};

const documentTemplateApi = {
  getDocumentTemplates,
  createDocumentTemplate,
  editDocumentTemplate,
  deleteDocumentTemplate,
  getDocumentTemplateDetail,
  saveDocumentTemplate,
  uploadSampleDocument,
  getPresignedUrl,
};

export default documentTemplateApi;
