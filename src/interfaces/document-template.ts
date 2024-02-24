import { DataTemplate, Rectangle } from "@/types/boundingBox";
import { DocumentTemplateType } from "./enums/document-template-type";

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: DocumentTemplateType;
}

export interface DocumentTemplateDetail {
  _id: string;
  dataTemplate: DataTemplate;
}

export interface SampleDocumentUrl {
  url: string;
}