export interface GiphyImage {
  fixed_height: { url: string };
}

export interface GiphyGif {
  title: string;
  images: GiphyImage;
}
