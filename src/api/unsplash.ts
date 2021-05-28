import axios from 'axios';
import { FetchedBackground } from '../models/models';

// eslint-disable-next-line import/prefer-default-export
export async function fetchImage(url: string): Promise<string | boolean | undefined> {
  try {
    const response = await axios.get<FetchedBackground>(url);
    const { data } = response;
    return data.urls?.regular;
  } catch (err) {
    /* Added this check because we know the API has a rate limit
         of 50 successfull calls an hour. */
    if (err.response.status === 403) {
      alert('Exceeded demo API rate limit');
      return false;
    }
    const errorMessage = err.response.data;
    throw new Error(`Error: ${errorMessage}`);
  }
}
