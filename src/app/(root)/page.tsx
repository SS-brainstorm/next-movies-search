import SearchBar from '@/components/SearchBar/SearchBar';
import VideoList from '@/components/VideoList/VideoList';
import Logo from '@/components/Logo/Logo';
import { getVideos } from '@/actions/video.actions';

type HomeProps = {
  params: { [key: string]: string },
  searchParams: { [key: string]: string }
}

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: HomeProps) {
  const { data, loaded, total } = await getVideos({ searchParams });

  return (
    <main className='wrapper'>
      <div className='wrapper__inner'>
        <Logo />
        <SearchBar />
        <VideoList 
          list={data} 
          loaded={loaded} 
          total={total} 
        />
      </div>
    </main>
  )
}
