'use client';
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([]);
  const [filteredData, setFilteredData] = useState(posts);
  const [newsearchtext, setNewsearchtext] = useState('');
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setNewsearchtext(searchText.toLowerCase());
    const filteredResults = searchText === '' ? posts : posts.filter(item => {
      console.log(item.creator.username.toLowerCase().includes(newsearchtext))
       return ( item.prompt.toLowerCase().includes(newsearchtext) ||
      item.tag.toLowerCase().includes(newsearchtext) ||
      item.creator.username.toLowerCase().includes(newsearchtext))
      }
    );
    setFilteredData(filteredResults)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type="text" placeholder='Search for a tag or a username' value={searchText} onChange={handleSearchChange} className='search_input peer' />
      </form>
      <button className='black_btn' onClick={() => {
        console.log(newsearchtext)
      }}>chlo theek</button>
      <PromptCardList data={filteredData} handleTagClick={(tag) => { setSearchText(tag) }} />
    </section>
  )
}

export default Feed