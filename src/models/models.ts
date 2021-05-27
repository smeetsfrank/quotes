export interface QuoteProps {
    id: number;
    author: string;
    quote: string;
    permalink?: string;
    correct?: boolean;
}

export interface Quotes {
    item: QuoteProps[];
}

export interface GameProps {
    answers: number[];
    step: number;
    progress: number;
}

export interface GameStateProps {
    mode: string;
}
