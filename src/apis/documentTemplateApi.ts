import { DocumentTemplate, DocumentTemplateDetail } from '@/interfaces/document-template';
import apiBase from './config';
import { CreateDocumentTemplateDto, EditDocumentTemplateDto, SaveDocumentTemplateDto } from '@/dtos/documentTemplateDto';

const getDocumentTemplates = async (): Promise<DocumentTemplate[]> => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/document-template`)
    .then((res: any) => {
      return res.data;
    });
};

const createDocumentTemplate = async (payload: CreateDocumentTemplateDto): Promise<DocumentTemplate> => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_DEV_API}/document-template`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const editDocumentTemplate = async (id: string, payload: EditDocumentTemplateDto): Promise<DocumentTemplate> => {
  return await apiBase
    .put(`${process.env.NEXT_PUBLIC_DEV_API}/document-template/${id}`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const deleteDocumentTemplate = async (id: string): Promise<DocumentTemplate> => {
  return await apiBase
    .delete(`${process.env.NEXT_PUBLIC_DEV_API}/document-template/${id}`)
    .then((res: any) => {
      return res.data;
    });
};

const getDocumentTemplateDetail = async (id: string): Promise<DocumentTemplateDetail> => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/document-template/${id}`)
    .then((res: any) => {
      return res.data;
    });
};

const saveDocumentTemplate = async (id: string, payload: SaveDocumentTemplateDto): Promise<DocumentTemplateDetail> => {
  return await apiBase
    .put(`${process.env.NEXT_PUBLIC_DEV_API}/document-template/${id}/save`, payload)
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
};

export default documentTemplateApi;
