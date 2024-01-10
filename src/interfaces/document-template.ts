import { Rectangle } from "@/types/boundingBox";
import { DocumentTemplateType } from "./enums/document-template-type";

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: DocumentTemplateType;
  isSampleUploaded: boolean;
}

export interface DocumentTemplateDetail {
  _id: string;
  dataTemplate: Rectangle[];
}