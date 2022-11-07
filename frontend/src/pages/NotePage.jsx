import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import {useParams, Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';



function NotePage() {
  let navigate = useNavigate();
  let params = useParams();
  let noteId = params.id;
  // gets the note that has the same id as the one in the url parameters
  let [note, setNote] = useState(null);


  
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');


  let getNote = async () => {
    // 
    if(noteId === 'new') return

    let response = await fetch(`/api/notes/${noteId}`)
    let data = await response.json()
    setNote(data)
  }


  let createNote = async () => {

    await fetch(`/api/notes/create`, {
      // specifies the method as PUT or Update
      method: 'POST',
      // specifies the content as a JSON data
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      //
      body: JSON.stringify(note) 
    })
  }


  let updateNote = async () => {

    await fetch(`/api/notes/${noteId}/update `, {
      // specifies the method as PUT or Update
      method: 'PUT',
      // specifies the content as a JSON data
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      //
      body: JSON.stringify({...note, 'updated': new Date()}) 
    })
  }


  let deleteNote = async () => {

    await fetch(`/api/notes/${noteId}/delete`, {
      'X-CSRFToken': csrftoken,

      method: 'DELETE',
      // specifies the content as a JSON data
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      //
      body: JSON.stringify({note}) 
    })

    // after api call to delete said note, go navigate back to home url
    navigate("/");
  }


  let handleSubmit = () => {
    if (noteId!=="new" && note.body===""){
        deleteNote()
    }else if(noteId!=="new"){
        updateNote()
    }
    else if(noteId==="new" && note===null){
        navigate('/')
        return
    }
    else if(noteId==="new" && note.body!==""){
        createNote()
    }
    
    navigate('/')
  }

  useEffect(() => {
    getNote();
  }, [noteId])


  // RENDERS A PAGE FOR A SINGLE NOTE
  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to={`/`} >
            <ArrowLeft onClick={handleSubmit}/>
          </Link>
        </h3>

        {noteId !== 'new' ? 
          (<button onClick={deleteNote}>Delete</button>) 
          : 
          (<button onClick={handleSubmit}>Done</button>)
          }
        
      </div>
        
      {/* onChange sets the state of note updating it on click */}
      <textarea value={note?.body} onChange={(e) => { setNote({...note, 'body': e.target.value}) }}>
        
      </textarea>  
      
    </div>
  )

}

export default NotePage