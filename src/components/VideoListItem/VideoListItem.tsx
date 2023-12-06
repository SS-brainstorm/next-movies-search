import { VideoItem } from "@/types";
import { toTime } from "@/utils";
import Image from "next/image";

type VideoListItemProps = {
  item: VideoItem
}

const VideoListItem = ({ item }: VideoListItemProps) => {
  const { title, thumbnail, duration, publish_date, id } = item;

  const date = new Intl.DateTimeFormat('en-US').format(publish_date);
  const time = toTime(duration);

  return (
    <li className="movies__item video-item">
      <div className="video-item__image">
        <Image 
          src={thumbnail} 
          width={300} 
          height={180} 
          alt={title} 
          unoptimized />
      </div>
      <div className="video-item__content">
        <h2 className="video-item__title">{title}</h2>
        <div className="vide-item__meta">
          <span>{time}</span>
          <span>{date}</span>
        </div>
      </div>
    </li>
  )
}

export default VideoListItem;