export interface Match {
    text: string;
    html: string;
    score: number;
    path: string;
}

export interface SearchResponse {
    matches: Match[];
}
