import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPostsThunk } from '../../store/search';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector(state => state.posts);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchPostsThunk(searchTerm));
    };

    const handlePostClick = (postId) => {
        history.push(`/post/${postId}`);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Fumblr"
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {posts.map(post => (
                    <li key={post.id} onClick={() => handlePostClick(post.id)}>
                        {post.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
