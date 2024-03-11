import { DocumentTemplateType } from "@/interfaces/enums/document-template-type";
import { DataTemplate, Rectangle } from "@/types/boundingBox";

export interface CreateDocumentTemplateDto {
  name: string;
  description: string;
  type: DocumentTemplateType;
}

export interface SaveDocumentTemplateDto {
  dataTemplate: DataTemplate;
}

export interface EditDocumentTemplateDto {
  name: string;
  description: string;
}