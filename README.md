## How does it work?

### Game weight logic

| Playtime | Points |
| :------- | :----- |
| ≤ 10h    | 0      |
| 10~20h   | 1      |
| 20~50h   | 2      |
| 50~100h  | 3      |
| > 100h   | 4      |

| Best achievement global % | Total achievements | Points |
| :------------------------ | :----------------- | :----- |
| ≥ 25%                     | < 50%              | 0      |
| < 25%                     | < 50%              | 1      |
| ≥ 25%                     | ≥ 50%              | 1      |
| < 25%                     | ≥ 50%              | 2      |
| < 25%                     | 100%               | 3      |

> Achievements with 100% global completion don't count.

## Steam API

### IStoreQueryService/Query/v1

> [!NOTE]  
> **This endpoint is not officially documented, below is only what i tested and know how it works.** You can check and test everything i didn't document [here](https://steamapi.xpaw.me/#IStoreQueryService/Query).

```http
  GET https://api.steampowered.com/IStoreQueryService/Query/v1/?key=&input_json=
```

Returns the Steam store data for up to 1000 apps per request.

| Param        | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `key`        | `string` | A Steam Web API Key. **Required** |
| `input_json` | `string` | URI encoded json. **Required**    |

#### input_json:

```json
{
    "query": {},
    "context": {},
    "data_request": {}
}
```

-   **"query"**:
    | Property | Type | Description |
    | :---------- | :--------- | :------------------------------------------ |
    | `start` | `number` | From which item the response begins, used as pagination. |
    | `count` | `number` | Max of items to return (default: 10, max: 1000). |
    | `sort` | `number` | An id for sorting. Tells the response how to sort the data.|
    | `filter` | `object` | An object with filter configuration.|

    **Known sorting ids**:

    -   **1** - Alphabetical order.
    -   **2** - Ascending appid.
    -   **3** - Descending appid.
    -   **21** - Descending percentage of positive reviews.

    **filter**:
    | Property | Type | Description |
    | :---------- | :--------- | :------------------------------------------ |
    | `released_only` | `boolean` | Return only released apps.|
    | `coming_soon_only` | `boolean` | Return only coming soon apps. |
    | `type_filters` | `object` | Which app types to return.|
    | `tagids_must_match` | `object[]` | Return only apps that contains the specified tag ids. |
    | `tagids_exclude` | `number[]` | Don't return apps that contains the specified tag ids. |
    | `global_top_n_sellers` | `number` | Return only apps in the top "n" most selled. |

    **type_filters**:

    -   "include_apps" `boolean`
    -   "include_packages" `boolean`
    -   "include_bundles" `boolean`
    -   "include_games" `boolean`
    -   "include_demos" `boolean`
    -   "include_mods" `boolean`
    -   "include_dlc" `boolean`
    -   "include_software" `boolean`
    -   "include_video" `boolean`
    -   "include_hardware" `boolean`
    -   "include_series" `boolean`
    -   "include_music" `boolean`

    **tagids_must_match**:

    To specify the tag ids you must pass in objects with the property `tagids` which is either a string or number array. However, each `tagids` can only include 1 tag, to specify multiple tags you need to pass in multiple objects.

    ```json
    "tagids_must_match": [{"tagids": ["1628"]}, {"tagids": ["1664"]}]
    ```

-   **"context"**:
    | Property | Type | Description |
    | :---------- | :--------- | :------------------------------------------ |
    | `elanguage` | `number` | An id for the language of the store data. Defaults to 0 (english). |
    | `country_code` | `string` | e.g. 'US', 'FR', 'DE', 'BR'. Which country to pull data from. **Required**|

    > [!NOTE]  
    > When testing `country_code` the data looked the same no matter what code i passed, so i'm not sure what it does, but **if you don't include it, no data will be returned**. My guess is that it just won't return data from apps banned or not released in X country.
