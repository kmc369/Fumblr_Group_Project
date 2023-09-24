const SEARCH_TEXT_POST = "/search"

export const SearchTextPost = (user) => {
    return {
        type: SEARCH_TEXT_POST,
        payload: user
    }
}

export const searchUserTextPosts = (user) => async(dispatch) =>{
    const response = await fetch(`/api/search/${user}`, {method: "GET"})
    if(response.ok){
        const data = await response.json()
        dispatch(SearchTextPost(data))
        return data
    }
    else{
        return "no user found"
    }
}