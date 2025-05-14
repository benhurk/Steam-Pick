/* eslint-disable @typescript-eslint/no-explicit-any */

export type UserSummariesRes = {
    response: {
        players: {
            steamid: string;
            communityvisibilitystate: number;
            profilestate: number;
            personaname: string;
            profileurl: string;
            avatar: string;
            avatarmedium: string;
            avatarfull: string;
            avatarhash: string;
            lastlogoff: number;
            personastate: number;
            realname: string;
            primaryclanid: string;
            timecreated: number;
            personastateflags: number;
            loccountrycode: string;
            locstatecode: string;
        }[];
    };
};

export type OwnedGamesRes = {
    response: {
        game_count: number;
        games: {
            appid: number;
            has_community_visible_stats: boolean;
            img_icon_url: string;
            name: string;
            playtime_deck_forever: number;
            playtime_disconnected: number;
            playtime_forever: number;
            playtime_linux_forever: number;
            playtime_mac_forever: number;
            playtime_windows_forever: number;
            rtime_last_played: number;
        }[];
    };
};

export type GetTopAchievementsForGamesRes = {
    response: {
        games: {
            appid: number;
            total_achievements: number;
            achievements?: {
                statid: number;
                bit: number;
                name: string;
                desc: string;
                icon: string;
                icon_gray: string;
                hidden: boolean;
                player_percent_unlocked: string;
            }[];
        }[];
    };
};

export type AppDetailsRes = {
    [appId: string]: {
        success: boolean;
        data: {
            type: string;
            name: string;
            steam_appid: number;
            required_age: number;
            is_free: boolean;
            dlc: number[];
            detailed_description: string;
            about_the_game: string;
            short_description: string;
            supported_languages: string;
            header_image: string;
            capsule_image: string;
            capsule_imagev5: string;
            website: string | null;
            pc_requirements: {
                minimum: string;
                recommended?: string;
            };
            mac_requirements: {
                minimum: string;
                recommended?: string;
            };
            linux_requirements: {
                minimum: string;
                recommended?: string;
            }[];
            developers: string[];
            publishers: string[];
            price_overview: {
                currency: string;
                initial: number;
                final: number;
                discount_percent: number;
                initial_formatted: string;
                final_formatted: string;
            };
            packages: number[];
            package_groups: {
                name: string;
                title: string;
                description: string;
                selection_text: string;
                save_text: string;
                display_type: number;
                is_recurring_subscription: string;
                subs: {
                    packageid: number;
                    percent_savings_text: string;
                    percent_savings: number;
                    option_text: string;
                    option_description: string;
                    can_get_free_license: string;
                    is_free_license: boolean;
                    price_in_cents_with_discount: number;
                }[];
            }[];
            platforms: {
                windows: boolean;
                mac: boolean;
                linux: boolean;
            };
            metacritic: {
                score: number;
                url: string;
            };
            categories: {
                id: number;
                description: string;
            }[];
            genres: {
                id: string;
                description: string;
            }[];
            screenshots: {
                id: number;
                path_thumbnail: string;
                path_full: string;
            }[];
            recommendations: {
                total: number;
            };
            achievements: {
                total: number;
                highlighted: {
                    name: string;
                    path: string;
                }[];
            };
            release_date: {
                coming_soon: boolean;
                date: string;
            };
            support_info: {
                url: string;
                email: string;
            };
            background: string;
            background_raw: string;
            content_descriptors: {
                ids: number[];
                notes: string | null;
            };
            ratings: any | null;
        };
    };
};

export type QueryRes = {
    response: {
        metadata: {
            total_matching_records: number;
            start: number;
            count: number;
        };
        ids: {
            appid: number;
        }[];
        store_items: {
            item_type: number;
            id: number;
            success: number;
            visible: boolean;
            name: string;
            store_url_path: string;
            appid: number;
            type: number;
            is_free: boolean;
            tagids: number[];
            categories: {
                supported_player_categoryids: number[];
            };
            reviews: {
                summary_filtered: {
                    review_count: number;
                    percent_positive: number;
                    review_score: number;
                    review_score_label: string;
                };
            };
            tags: {
                tagid: number;
                weight: number;
            }[];
        }[];
    };
};
