/* eslint-disable camelcase */
import { Key } from 'react';

export interface DictionariesType {
  id: number;
  key: Key;
  id: number;
  name: string;
  version: string;
  status: string;
  updateTime: string;
  desc: string;
  creator: string;
}

export interface SchemaItem {
  is_parent_node: any;
  uuid: string;
  name: string;
  display_name: string;
  type: string;
  data?: any[];
  tagging_color: string;
  is_null: boolean;
  is_primary_key: boolean;
  post_process: number | null;
}

export interface DictionariesCreateParamsType {
  versionStatus: number;
  name: string;
  detail?: any[];
  projectId: number;
  note?: string;
}

export interface DictionariesEditParamsType {
  versionStatus: number;
  name: string;
  detail?: any[];
  projectId: number;
  note?: string;
  versionId?: number;
}

export interface Opt {
  name?: any;
  is_parent_node?: any;
  uuid: any;
  display_name?: any;
  is_edit?: any;
  type?: any;
  post_process?: any;
  tagging_color?: any;
  data?: any[] | undefined;
  is_null?: boolean | undefined;
  is_primary_key?: boolean | undefined;
}
