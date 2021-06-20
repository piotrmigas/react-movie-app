import axios from "axios";
import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL,
} from "./config";

const defaultConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

// Types

export type Movie = {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  budget: number;
  runtime: number;
  revenue: number;
};

export type Movies = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Cast = {
  id: string;
  character: string;
  name: string;
  profile_path: string;
};

export type Actor = {
  profile_path: string;
  name: string;
  biography: string;
};

export type Crew = {
  job: string;
  name: string;
  credit_id: number;
};

export type Credits = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export default {
  fetchMovies: async (searchTerm: string, page: number): Promise<Movies> => {
    const endpoint: string = searchTerm
      ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
      : `${POPULAR_BASE_URL}&page=${page}`;
    const { data } = await axios(endpoint);
    return data;
  },
  fetchMovie: async (movieId: string): Promise<Movie> => {
    const endpoint: string = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    const { data } = await axios(endpoint);
    return data;
  },
  fetchCredits: async (movieId: string): Promise<Credits> => {
    const creditsEndpoint: string = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const { data } = await axios(creditsEndpoint);
    return data;
  },
  fetchActor: async (actorId: string): Promise<Actor> => {
    const endpoint: string = `${API_URL}person/${actorId}?api_key=${API_KEY}`;
    const { data } = await axios(endpoint);
    return data;
  },
  getRequestToken: async () => {
    const { data } = await axios(REQUEST_TOKEN_URL);
    return data.request_token;
  },
  authenticate: async (requestToken: string, username: string, password: string) => {
    const bodyData = {
      username,
      password,
      request_token: requestToken,
    };
    const res = await axios.post(LOGIN_URL, bodyData);

    if (res.status === 200) {
      const { data } = await axios.post(SESSION_ID_URL, {
        request_token: requestToken,
      });
      return data;
    }
  },
  rateMovie: async (sessionId: string, movieId: number, value: string) => {
    const endpoint = `${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;
    const { data } = await axios.post(endpoint, {
      value,
    });

    return data;
  },
};
