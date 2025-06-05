import NextImage,{ ImageProps } from "next/image";
import type { ImageLoaderProps } from "next/image";



const customLoader = ({ src }: ImageLoaderProps): string => {
  return src;
};

export default function Image(props: ImageProps) {
  return <NextImage {...props} loader={customLoader} unoptimized />;
}