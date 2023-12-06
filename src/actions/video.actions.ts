'use server';

import { videoData } from "@/data";
import { VideoItem } from "@/types";

type VideoActionParams = {
  searchParams: { [key: string]: string },
  page: number;
  limit: number;
};

type VideosResponse = {
  data: VideoItem[],
  loaded: number;
  total: number
};

export async function getVideos(action?: Partial<VideoActionParams>): Promise<VideosResponse> {
  try {
    const page = action?.page ?? 1;
    const limit = action?.limit ?? 5;
    
    const data = await videoData;
    let filteredData = [...data];

    if (action?.searchParams?.q) {
      const { q } = action.searchParams;

      filteredData = data.filter((video) => {
        const videoTitle = video.title.toLowerCase();
        return videoTitle.includes(q.toLowerCase());
      });
    }

    if (action?.searchParams?.sortBy) {
      const { sortBy } = action.searchParams;

      filteredData = [...filteredData].sort((a, b) => {
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        } else if (sortBy === 'publish_date') {
          return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
        }

        return 0;
      });
    }

    const total = filteredData.length;
    const currentItems = page * limit;
    const loaded = currentItems > total ? total : currentItems; 

    return {
      data: filteredData.slice((page - 1) * limit, page * limit),
      loaded,
      total 
    };
  } catch (error: any) {
    throw new Error(`Failed to load videos: ${error.message}`);
  }
}

export async function getVideoSuggestions(query: string, limit: number = 5): Promise<VideoItem[]> {
  try {
    const data = await videoData;
    const suggestions = data.filter((video) => {
      const videoTitle = video.title.toLowerCase();
      return videoTitle.includes(query.toLowerCase());
    });

    return suggestions.slice(0, limit);
  } catch (error: any) {
    throw new Error(`Failed to get video suggestions: ${error.message}`);
  }
}
