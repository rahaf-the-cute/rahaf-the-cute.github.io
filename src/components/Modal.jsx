import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import mime from "licia/mime"

function Modal({url, open, close, setLoaded, imageLoading, mimeType}){
        return (
        <dialog open={open}>
        <article>
          <header>
            <span onClick={()=>{close(!open)}} aria-label="Close" className="close"></span>
            Preview
          </header>
          {imageLoading && <div className="d-flex justify-content-center p-3">
                        <svg width="1.6em" height="1.6em" viewBox="0 0 24 24" id="rotate"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z" opacity=".5" fill="#744867"></path><path d="M20 12h2A10 10 0 0 0 12 2v2a8 8 0 0 1 8 8z" fill="#341436"></path></svg>
          </div>}
            {open && (mime(mimeType).includes('video/') ? <video controls={true} onLoadedMetadata={()=>setLoaded(false)} src={url}></video> : <img onLoad={()=>setLoaded(false)} src={url} />)}
        </article>
      </dialog>
            )
}
export default Modal