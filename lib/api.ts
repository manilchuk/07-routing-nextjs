import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const notehubApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await notehubApi.get(
    '/notes',
    {
      params,
    }
  );

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await notehubApi.get(`/notes/${id}`);

  return response.data;
};

export const createNote = async (newNote: CreateNotePayload): Promise<Note> => {
  const response: AxiosResponse<Note> = await notehubApi.post(
    '/notes',
    newNote
  );

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await notehubApi.delete(`/notes/${id}`);

  return response.data;
};
