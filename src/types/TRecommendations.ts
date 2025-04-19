export type TRecommendations = {
    name: string;
    id: number;
    matchingTags: {
        count: number;
        tags: string[];
    };
}[];
