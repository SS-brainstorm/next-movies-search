import { VideoItem } from "@/types"

const data: VideoItem[] = [
  {
    id: '1',
    title: 'Fantastic video',
    thumbnail: 'https://placehold.co/300x180',
    publish_date: new Date(),
    duration: 70,
  },
  {
    id: '2',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    thumbnail: 'https://placehold.co/300x180',
    publish_date: new Date(),
    duration: 30,
  },
  {
    id: '3',
    title: 'Game of Thrones',
    thumbnail: 'https://placehold.co/300x180',
    publish_date: new Date(),
    duration: 450,
  },
  {
    id: '4',
    title: 'Harry Potter and the Chamber of Secrets',
    thumbnail: 'https://placehold.co/300x180',
    publish_date: new Date(),
    duration: 100,
  },
  {
    id: '5',
    title: 'Harry Potter and the Prisoner of Azkaban',
    thumbnail: 'https://placehold.co/300x180',
    publish_date: new Date(),
    duration: 120,
  },
  {
    id: '6',
    title: 'Harry Potter and the Goblet of Fire',
    thumbnail: 'https://placehold.co/300x180',
    publish_date: new Date(),
    duration: 130,
  },
  {
    id: '7',
    title: 'Harry Potter and the Order of Phoenix',
    thumbnail: 'https://placehold.co/300x180',
    publish_date: new Date(),
    duration: 120,
  },
  {
    id: '8',
    title: 'Harry Potter and the Half-Blood Prince',
    thumbnail: 'https://placehold.co/300x180',
    publish_date: new Date(),
    duration: 125,
  },
  {
    id: '9',
    title: 'Harry Potter and the Deathly Hallows - Part 1',
    thumbnail: 'https://placehold.co/300x180',
    publish_date: new Date(),
    duration: 150,
  },
  {
    id: '10',
    title: 'Harry Potter and the Deathly Hallows - Part 2',
    thumbnail: 'https://placehold.co/300x180',
    publish_date: new Date(),
    duration: 90,
  }
];

export const videoData = new Promise<VideoItem[]>((resolve) => {
  setTimeout(() => {
    resolve(data);
  }, 100);
})