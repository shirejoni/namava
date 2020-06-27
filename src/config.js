const pageItemsType = {
    Slider: "Slider",
    Advertisement: "Advertisement",
    PostGroup: "PostGroup",
    Latest: "Latest",
    Favorite: "Favorite",
    LatestEpisods: "LatestEpisods",
    ExclusiveDubs: "ExclusiveDubs",
    CategoryGroup: "CategoryGroup",
    BannerGroup: "BannerGroup",
};
export default {
    baseUrl: "http://localhost:8080/",
    pageItemsType,
    itemTypes: {
        PurchasableMovie: "PurchasableMovie",
        Series: "Series",
        Movie: "Movie",
    },
    dubsType: {
        "ExclusiveDubs": "ExclusiveDubs",
        "StudioDubs": "StudioDubs"
    },
    sections: {
        [pageItemsType.Slider]: {
            url: "api/v1.0/medias/sliders/{{SLIDER_ID}}",
        },
        [pageItemsType.PostGroup]: {
            url: "api/v1.0/post-groups/{{PAYLOAD_KEY}}/medias",
            pi: 1,
            ps: 20,
        },
        [pageItemsType.Latest]: {
            url: "api/v1.0/medias/latest",
            pi: 1,
            ps: 20,
        },
        [pageItemsType.LatestEpisods]: {
            url: "api/v1.0/medias/latest-episods",
            pi: 1,
            ps: 20,
        },
        [pageItemsType.CategoryGroup]: {
            url: "api/v1.0/category-groups/{{PAYLOAD_KEY}}/latest-medias",
            pi: 1,
            ps: 20,
        },
        [pageItemsType.ExclusiveDubs]: {
            url: "api/v1.0/medias/exclusive-dubs",
            pi: 1,
            ps: 20,
        },
        [pageItemsType.Advertisement]: {
            url:"api/v1.0/medias/commercials/{{PAYLOAD_KEY}}",
            pi: 1,
            ps: 20
        },
        [pageItemsType.BannerGroup]: {
            url:"api/v1.0/medias/banners/{{PAYLOAD_KEY}}",
            pi: 1,
            ps: 20
        },
        "BriefData": {
            url: "api/v1.0/medias/{{ID}}/brief-preview",
        },
        "Preview": {
            url: "api/v1.0/medias/{{PAYLOAD_KEY}}/preview",
        },
        "SinglePageMovie": {
            url: "api/v1.0/medias/{{PAYLOAD_KEY}}/single-movie"
        },
        "SinglePageSeries": {
            url: "api/v1.0/medias/{{PAYLOAD_KEY}}/single-series"
        },
        "SinglePageRelated": {
            url: "api/v1.0/medias/{{PAYLOAD_KEY}}/related",
            categoryId: undefined,
            pi: 1,
            ps: 20,
        },
        "Comments": {
            url: "api/v1.0/comments",
            mediaId: undefined,
            profileId: 0,
            pi: 1,
            ps: 10
        }
    },
    defaultImage: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDciIGhlaWdodD0iMTQ3IiB2aWV3Qm94PSIwIDAgMTQ3IDE0NyI+CiAgICA8ZyBpZD0iR3JvdXBfMTk4MyIgZGF0YS1uYW1lPSJHcm91cCAxOTgzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjc4IC0yMzEzKSI+CiAgICAgIDxwYXRoIGlkPSJTdWJ0cmFjdGlvbl8yIiBkYXRhLW5hbWU9IlN1YnRyYWN0aW9uIDIiIGQ9Ik0xODk5LjUsNjA0NWE3My4xNTQsNzMuMTU0LDAsMCwxLTQxLjA5NS0xMi41NTMsNzMuNzE5LDczLjcxOSwwLDAsMS0yNi42My0zMi4zMzgsNzMuNCw3My40LDAsMCwxLDYuNzc3LTY5LjcsNzMuNzE2LDczLjcxNiwwLDAsMSwzMi4zMzgtMjYuNjMsNzMuNCw3My40LDAsMCwxLDY5LjcsNi43NzcsNzMuNzE4LDczLjcxOCwwLDAsMSwyNi42MywzMi4zMzgsNzMuNCw3My40LDAsMCwxLTYuNzc3LDY5LjcsNzMuNzE3LDczLjcxNywwLDAsMS0zMi4zMzgsMjYuNjNBNzMuMDQzLDczLjA0MywwLDAsMSwxODk5LjUsNjA0NVptLS4yNjEtMzguNTg3YTcuNTUyLDcuNTUyLDAsMCwxLDMuNDc3Ljg1NGwyMi42NTUsMTEuODVhNy41LDcuNSwwLDAsMCwzLjQ4Mi44NjksNy42MjMsNy42MjMsMCwwLDAsNS43NTYtMi43LDcuMjUzLDcuMjUzLDAsMCwwLDEuNi02bC00LjMyNC0yNS4wOTRhNy4zOTQsNy4zOTQsMCwwLDEsMi4xNDUtNi41NzVsMTguMzMxLTE3Ljc3NGE3LjMyMSw3LjMyMSwwLDAsMCwxLjktNy42LDcuMzcyLDcuMzcyLDAsMCwwLTYuMDM2LTUuMDc0bC0yNS4zMzMtMy42NjRhNy40NTQsNy40NTQsMCwwLDEtNS42MjQtNC4wNjNsLTExLjMyNy0yMi44MzFhNy40MjYsNy40MjYsMCwwLDAtMi44NjctMy4xMDcsNy42MTcsNy42MTcsMCwwLDAtNy42NzQsMCw3LjQyOCw3LjQyOCwwLDAsMC0yLjg2NywzLjEwN2wtMTEuMzI4LDIyLjgzMWE3LjQ1Miw3LjQ1MiwwLDAsMS01LjYyMiw0LjA2M2wtMjUuMzM0LDMuNjY0YTcuNCw3LjQsMCwwLDAtNC4xMzksMTIuNjc3bDE4LjMzLDE3Ljc3NGE3LjQsNy40LDAsMCwxLDIuMTQ3LDYuNTc1bC00LjMyNSwyNS4wOTRhNy4yNTIsNy4yNTIsMCwwLDAsMS42MDUsNiw3LjYyNCw3LjYyNCwwLDAsMCw1Ljc1NiwyLjcsNy41MDksNy41MDksMCwwLDAsMy40ODMtLjg2OWwyMi42NTUtMTEuODVBNy41NDMsNy41NDMsMCwwLDEsMTg5OS4yNCw2MDA2LjQxM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNTQ4IC0zNTg1KSIgZmlsbD0iIzM0MzQzNCIvPgogICAgICA8ZyBpZD0iaWNfbWVudV9wcm9maWxlMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzI5Ljg4MSAyMzYzLjg5MikiPgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGVfMzY5IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAzNjkiIHdpZHRoPSIxNC44MDkiIGhlaWdodD0iMTQuODA5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMy43NzIgMTUuMjk0KSIgZmlsbD0ibm9uZSIvPgogICAgICAgIDxnIGlkPSJHcm91cF8xMjMzIiBkYXRhLW5hbWU9Ikdyb3VwIDEyMzMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiPgogICAgICAgICAgPHBhdGggaWQ9IlBhdGhfNDgwMSIgZGF0YS1uYW1lPSJQYXRoIDQ4MDEiIGQ9Ik0yODYuOTgzLDEzOTQuMzQ0YTI0LjY3OSwyNC42NzksMCwwLDAsMTkuODM2LTkuOTksNi40NjksNi40NjksMCwwLDAsMS02LjAyOSwxMy45NTUsMTMuOTU1LDAsMCwwLTguMjgzLTguMTgzLDQsNCwwLDAsMC0zLjY3My4zNjUsMTUuNDA3LDE1LjQwNywwLDAsMS0xNy43NjgsMCwzLjk4NCwzLjk4NCwwLDAsMC0zLjY0NS0uMzczLDEzLjk1LDEzLjk1LDAsMCwwLTguMjgzLDguMTE1LDYuNDY3LDYuNDY3LDAsMCwwLDEuMDg2LDYuMTQ3QTI1LjMsMjUuMywwLDAsMCwyODYuOTgzLDEzOTQuMzQ0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2NS44MTggLTEzNDguOTQ3KSIgZmlsbD0iIzM0MzQzNCIvPgogICAgICAgICAgPGVsbGlwc2UgaWQ9IkVsbGlwc2VfMTA5IiBkYXRhLW5hbWU9IkVsbGlwc2UgMTA5IiBjeD0iMTAuNTkxIiBjeT0iMTAuNTkxIiByeD0iMTAuNTkxIiByeT0iMTAuNTkxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC41NzUpIiBmaWxsPSIjMzQzNDM0Ii8+CiAgICAgICAgPC9nPgogICAgICA8L2c+CiAgICA8L2c+CiAgPC9zdmc+",

}
