export type RecommendationsArray = {
    name: string;
    id: number;
    matchingTags: {
        count: number;
        tags: string[];
    };
}[];
