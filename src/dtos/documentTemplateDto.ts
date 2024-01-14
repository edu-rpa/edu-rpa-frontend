import { DocumentTemplateType } from "@/interfaces/enums/document-template-type";
import { Rectangle } from "@/types/boundingBox";

export interface CreateDocumentTemplateDto {
  name: string;
  description: string;
  type: DocumentTemplateType;
}

export interface SaveDocumentTemplateDto {
  dataTemplate: Rectangle[];
}

export interface EditDocumentTemplateDto {
  name: string;
  description: string;
}