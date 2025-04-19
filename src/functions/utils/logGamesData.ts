import SteamSpyDataRes from '@/types/TSteamSpy';

export default function logGamesData(
    completedGamesData: SteamSpyDataRes,
    droppedGamesData: SteamSpyDataRes,
    unplayedGamesData: SteamSpyDataRes,
    searchTag?: string
) {
    const completedLog = completedGamesData
        .filter((game) =>
            Object.keys(game.tags).some((tag) => tag === searchTag)
        )
        .map((game) => {
            return { name: game.name, tags: Object.keys(game.tags) };
        });

    const droppedLog = droppedGamesData
        .filter((game) =>
            Object.keys(game.tags).some((tag) => tag === searchTag)
        )
        .map((game) => {
            return { name: game.name, tags: Object.keys(game.tags) };
        });

    const unplayedLog = unplayedGamesData
        .filter((game) =>
            Object.keys(game.tags).some((tag) => tag === searchTag)
        )
        .map((game) => {
            return { name: game.name, tags: Object.keys(game.tags) };
        });

    console.log('Completed Data:', completedLog);
    console.log('Dropped Data:', droppedLog);
    console.log('Unplayed Data:', unplayedLog);
}
