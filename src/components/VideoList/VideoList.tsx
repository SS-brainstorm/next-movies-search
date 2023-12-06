'use client';

import { getVideos } from "@/actions/video.actions";
import { VideoItem } from "@/types";
import { sleep } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import VideoListItem from "@/components/VideoListItem/VideoListItem";

type VideoListProps = {
  list: VideoItem[],
  total: number,
  loaded: number
}

let page = 1;

const VideoList: React.FC<VideoListProps> = ({ list, loaded, total }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(loaded);
  const [visibleItems, setVisibleItems] = useState(list);

  const sortValue = searchParams.get('sortBy') ?? '';
  const canLoadMore = loadedCount !== total;

  useEffect(() => {
    page = 1;
    setLoadedCount(loaded);
    setVisibleItems([...list]);
  }, [list]);

  const handleLoadMore = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      await sleep(1000);

      page += 1;
      const { data, loaded } = await getVideos({
        searchParams: Object.fromEntries(searchParams.entries()),
        page
      });
  
      setLoadedCount(prev => loaded);
      setVisibleItems(prevItems => [
        ...prevItems,
        ...data
      ]);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortChange = (event: FormEvent<HTMLSelectElement> ) => {
    const currentQuery = new URLSearchParams(Array.from(searchParams.entries()));
    const selectedValue = (event.target as HTMLSelectElement).value;

    if (selectedValue) {
      currentQuery.set('sortBy', selectedValue)
    } else {
      currentQuery.delete('sortBy');
    }

    const query = currentQuery.size > 0
      ? `?${currentQuery.toString()}`
      : '';

    router.push(pathname + query);
  }

  let content = (
    <p className="no-result">No videos found</p>
  );

  if (total > 0) {
    content = (
      <>
        <div className="list-wrapper__sort">
          <label className="sort">
            Sort:
            <select className="sort__field" name="sortBy" onChange={handleSortChange} defaultValue={sortValue}>
              <option value="">Default</option>
              <option value="title">Title</option>
              <option value="publish_date">Date</option>
            </select>
          </label>
        </div>
        <div className="list-wrapper__content">
          <ul className="movies">
            {visibleItems.map(video => (
              <VideoListItem key={video.id} item={video} />
            ))}
          </ul>
        </div>
        <div className="list-wrapper__pagination">
          <span className="list-wrapper__pagination-info">
            Showing {loadedCount} items of {total}
          </span>
          { 
            canLoadMore && (
              <button 
                onClick={handleLoadMore} 
                className="list-wrapper__pagination-button"
              >
                { isLoading ? 'Loading...' : 'Load more' }
              </button>
            )
          }
        </div>
      </>
    )
  }

  return (
    <div className="list-wrapper">
      {content}
    </div>
  )
}

export default VideoList;
