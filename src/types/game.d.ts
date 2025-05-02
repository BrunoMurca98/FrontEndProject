export interface Game {
    id: number;
    name: string;
    background_image: string;
    released: string;
    rating: number; // Original rating from the API
    userRating?: number; // New property for the user's rating
    isPlatinum?: boolean; // New property for the platinum status
    isStoryCompleted?: boolean; // New property for story completion status
    platforms: { platform: { id: number; name: string } }[];
    genres: { id: number; name: string }[]; // Add this line for genres
}