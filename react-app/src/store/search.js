// actions
export const SEARCH_POSTS = 'SEARCH_POSTS';

//thunk

export const searchPostsThunk = (searchTerm) => async dispatch => {
    try {
        const response = await fetch(`/api/search/${searchTerm}`);
        const data = await response.json();
        dispatch({ type: SEARCH_POSTS, payload: { posts: data.posts, error: null } });
    } catch (error) {
        dispatch({ type: SEARCH_POSTS, payload: { posts: [], error: error.message } });
    }
};

// reducer

const initialState = {
    posts: [],
    error: null,
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_POSTS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default searchReducer;
