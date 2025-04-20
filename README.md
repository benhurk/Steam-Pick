## Steam API

### IStoreQueryService/Query/v1

> [!NOTE]  
> **This endpoint is not officially documented, below is only what i tested and used in this project.** You can check and test everything i didn't document [here](https://steamapi.xpaw.me/#IStoreQueryService/Query).

```http
  GET https://api.steampowered.com/IStoreQueryService/Query/v1/`
```

Returns the Steam store data for up to 1000 apps per request.

| Param        | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `key`        | `string` | A Steam Web API Key. **Required** |
| `input_json` | `string` | An URI encoded json. **Required** |

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
    | `sort` | `number` | A sorting id. Tells the response how to sort the data.|
    | `filter` | `object` | An object with filter configuration.|

    **Known sorting ids**:

    -   1: Alphabetical order.
    -   2: Ascending appid.
    -   3: Descending appid.
    -   21: Descending percentage of positive reviews.

    **filter object**:
    | Property | Type | Description |
    | :---------- | :--------- | :------------------------------------------ |
    | `released_only` | `boolean` | Return only released apps.|
    | `coming_soon_only` | `boolean` | Return only coming soon apps. |
    | `type_filters` | `object` | Which app types to return.|
    | `tagids_must_match` | `object<tagids>` | Return only apps that contains the included "tagids". |
    | `tagids_exclude` | `number[]` | Don't return apps that contains the included tag ids. |
    | `global_top_n_sellers` | `number` | Return only apps in the top "n" most selled. |

-   **"context"**:
