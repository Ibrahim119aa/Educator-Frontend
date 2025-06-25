/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import { ReactElement } from "react";

//   <CarouselItem className="md:basis-1/2 lg:basis-1/3"><img src="https://c4.wallpaperflare.com/wallpaper/553/854/434/1920x1080-px-digital-art-fantasy-art-landscape-long-hair-ryky-trees-wind-anime-death-note-hd-art-wallpaper-preview.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." /></CarouselItem>
const CarouselCode = ({children}:{children:ReactElement[]}) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {Array.from({ length: 1 }).map((_, index) => (
          <CarouselItem key={index} className="">
            {children}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute max-md:top-full left-[calc(50%-50px)] md:left-1" />
      <CarouselNext className="absolute max-md:top-full right-[calc(50%-50px)] md:right-1" />
    </Carousel>
  );
}


export default CarouselCode;