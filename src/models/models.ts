export interface QuoteProps {
    id: number;
    author: string;
    quote: string;
}

export interface QuotesArr {
    item: QuoteProps[];
}

export type GameProps = {
    answers: number[];
    step?: number;
    progress: number;
}

export interface GameStateProps {
    mode: string;
}
