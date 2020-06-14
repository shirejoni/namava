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
    sections: {
        [pageItemsType.Slider]: {
            url: "api/v1.0/medias/sliders/{{SLIDER_ID}}",
        },
        [pageItemsType.PostGroup]: {
            url: "api/v1.0/post-groups/{{PAYLOAD_KEY}}/medias",
            pi: 1,
            ps: 20,
        }
    }
}
