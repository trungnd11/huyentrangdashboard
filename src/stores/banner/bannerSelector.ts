interface BannersType  {
  id: string,
  img: string,
  content: string,
  title: string
}

interface ArrBannersType {
  loading: boolean,
  banners: BannersType[]
}


export const getBannerStore = (state: { banners: ArrBannersType }) => state.banners;