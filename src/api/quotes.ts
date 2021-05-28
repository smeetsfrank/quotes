import axios from 'axios';
import { QuoteProps } from '../models/models';

export async function fetchRandomQuote(url: string): Promise<QuoteProps> {
  try {
    const response = await axios.get<QuoteProps>(url);
    const { data } = response;
    return data;
  } catch (err) {
    throw new Error('Error');
  }
}

export async function fetchPopularQuotes(url: string): Promise<QuoteProps> {
  try {
    const response = await axios.get<QuoteProps>(url);
    const { data } = response;
    return data;
  } catch (err) {
    throw new Error('Error');
  }
}
