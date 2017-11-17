import { Genre } from './genre';
import { Actor } from './actor';
export interface Movie {
    name: string;
    releaseDate: string;
    plot: string;
    coverLink: string;
    runtime: number;
    genre: Genre;
    actors: Actor[];
    video: string;
    id: string;
}

