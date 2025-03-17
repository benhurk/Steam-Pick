type ResponseData = {
    access_token: string;
    expires_in: number;
    token_type: string;
};

export default async function getIgdbToken() {
    const res = await fetch(
        `
        https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_ID}&client_secret=${process.env.IGDB_SECRET}&grant_type=client_credentials`,
        { method: 'POST' }
    );

    const data: ResponseData = await res.json();

    return data.access_token;
}
