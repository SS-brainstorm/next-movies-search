'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { VideoItem } from "@/types";
import { getVideoSuggestions } from "@/actions/video.actions";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchWrapperRef = useRef<HTMLFormElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchValue = searchParams.get('q') ?? undefined;

  const [suggestions, setSuggestions] = useState<VideoItem[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (searchWrapperRef.current && !searchWrapperRef.current.contains(target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleChange = async (term: string) => {
    if (term.length < 3) {
      setSuggestions([]);
    } else {
      const results = await getVideoSuggestions(term);
      setSuggestions(results);
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentQuery = new URLSearchParams(Array.from(searchParams.entries()));
    const formData = new FormData(event.target as HTMLFormElement);
    const searchQuery = formData.get('q');

    if (searchQuery) {
      currentQuery.set('q', searchQuery.toString());
    } else {
      currentQuery.delete('q');
    }

    const query = currentQuery.size > 0
      ? `?${currentQuery.toString()}`
      : '';

    setSuggestions([]);
    router.push(pathname + query);
  }

  const handleSuggestionSelect = (text: string) => {
    const input = searchRef.current as HTMLInputElement;
    input.value = text;
    setSuggestions([]);
    input.form?.submit();
  }

  return (
    <form onSubmit={handleSubmit} className='search' ref={searchWrapperRef}>
      <div className='search__wrapper'>
        <input 
          ref={searchRef}
          placeholder="Search video..."
          className='search__field'
          type="text" 
          name="q" 
          autoComplete='off' 
          onChange={(event) => handleChange(event.target.value)}
          defaultValue={searchValue}
        />
        {
          suggestions.length 
            ? (
              <ul className='search__suggestions'>
                {suggestions.map(item => (
                  <li key={item.id} className='search__suggestion'>
                    <button type="button" onClick={() => handleSuggestionSelect(item.title)}>{item.title}</button>
                  </li>
                ))}
              </ul>
            )
            : null
        }
      </div>
    </form>
  )
}
