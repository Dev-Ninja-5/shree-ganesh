import { Types } from "mongoose";
import { ClientIF } from "./AuthIF";

export interface DocumentIF {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRawFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: null;
  contentEncoding: null;
  storageClass: string;
  serverSideEncryption: null;
  metadata: {
    fieldName: string;
  };
  location: string;
  etag: string;
}

export interface SEOMetadataIF {
  seo_meta: {
    title: string;
    description: string;
    canonical: string;
    keywords: string;
    robots: string;
  };
  opengraph: {
    title: string;
    description: string;
    card: string;
    site_name: string;
    url: string;
    image: string;
  };
  twitter: {
    title: string;
    description: string;
    card: string;
    site_name: string;
    url: string;
    image: string;
  };
  jsonlt: { title: string; description: string; image: string };
}

export interface AuthorIF {
  name: string;
  description: string;
  image: Types.ObjectId | string;
  is_verified: boolean;
}

export interface RawFileIF {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface GenericQuery {
  limit: number;
  offset: number;
}
