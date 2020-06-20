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
        }
    }
}
