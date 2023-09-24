import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useSelector } from 'react-redux';
import {useParams } from 'react-router-dom'
import * as NoteActions from '../../store/note'



import "./NoteForm.css"


function NoteForm(){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
   
    const {post_id} = useParams()
    const post_id_int = parseInt(post_id, 10);
    const [content,setContent] = useState("")
    const [postComments,setPostComments] = useState({})


    const handleSubmit = async (e)=>{
    e.preventDefault();
    
  
    const new_note = {
        content:content,
        user_id:sessionUser.id,
        post_id:post_id_int
    

    }
    // console.log(new_note)

    await dispatch(NoteActions.createNoteThunk(new_note))
    setContent("")
   

}

    useEffect(()=>{
        async function fetchData() {
            const getCommentsOfPost = await dispatch(NoteActions.getCommentsOfPostThunk(post_id))
       
        setPostComments(getCommentsOfPost); 
      }
      fetchData();
    }, [dispatch, post_id]);

    const values= Object.values(postComments)
    if(Object.values(postComments).length===0 ){
      
        return null
      }

    






    return (
        <>
            <form onSubmit={handleSubmit}>
            
            <div className="noteTextBox">
       
            <div className="input-container"> 
            <label>
            <input
            placeholder="Have something to say?"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
        
            />
            <button type="submit">Reply</button>
            </label>
            </div>
           
        

            <div className="comments-container">
            {values.map((comment,index)=>(
                <div key={index} id={`item${index}`}>
           
                {comment.content}
            </div>
            
            
            ))}
            </div>
            </div>
            </form>
        
        
        
        
        
        
        </>
    )

}

export default NoteForm