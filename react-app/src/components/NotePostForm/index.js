import React, { useState } from "react";
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




return (
    <>
        <form onSubmit={handleSubmit}>
        
        <div className="noteTextBox">
    
        <label>
        <input
        placeholder="Have something to say?"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
       
        />
        
      
  
        <button type="submit">Reply</button>
        </label>
        </div>
        

        
        </form>
    
    
    
    
    
    
    </>
)

}

export default NoteForm