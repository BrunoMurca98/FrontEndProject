import axios from "axios";
import { Game } from "../types/game";

const API_BASE_URL = "https://api.rawg.io/api";
const API_KEY = process.env.REACT_APP_RAWG_API_KEY;

export const searchGames = async (query: string): Promise<Game[]> => {
    const response = await axios.get(`${API_BASE_URL}/games`, {
        params: {
            search: query,
            key: "be6de3c659f848878a07e65041c5bfd7", // Include the API key here
        },
    });
    return response.data.results;
};
