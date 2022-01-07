import { Link } from "react-router-dom"
import {useFloating, shift, size} from '@floating-ui/react-dom';
import {useState, useEffect} from 'react'
import useFetch from "./../hooks/useFetch"

function Search(){
    const [text, setText] = useState(null)
    const [showSearch, setShowSearch] = useState(false)
    const [sizeData, setSizeData] = useState(null)
    const { loading, error, value } = useFetch(
    `https://script.google.com/macros/s/AKfycbzQOgdsxPa-eow4rJ0FZNWeZ4JK1Rx3YDieGcyuVtTiiX5V535Y4OakCMgU7fzW3DVkNg/exec?type=search&word=${text}`,
    {},
    [text]
  )
    const {x, y, reference, floating, strategy, update} = useFloating({
        placement: 'bottom-start',
        middleware: [shift(),
            size({apply: setSizeData})
        ],
    });
    useEffect(()=>{
        document.onclick = (e) => {
            if (!e.target.className.includes('list-search')) {
                showSearch(false);
            }
        }
    }, [document])
    return (
    <>
        <form onSubmit={(e)=> e.preventDefault()} id="search" className="d-flex row justify-content-center input-group">
            <div className="col-lg-4 col">
                <input className="list-search" ref={reference} onInput={({target})=> {setText(target.value); setShowSearch(true); update()}} type="text" placeholder="search..." />
                {(text && showSearch) && (<div id="list" ref={floating}
                style={{
                position: strategy,
                top: y ?? '',
                left: x ?? '',
                overflowX: "hidden",
                maxWidth: sizeData?.reference.width,
                maxHeight: "12.4em"
                }}>
                <ul className="list-search">
                    {loading && <div className="d-flex justify-content-center p-3">
                                    <svg width="1.6em" height="1.6em" viewBox="0 0 24 24" id="rotate"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z" opacity=".5" fill="#744867"></path><path d="M20 12h2A10 10 0 0 0 12 2v2a8 8 0 0 1 8 8z" fill="#341436"></path></svg>
                                </div>}
                     {value && value?.data.filter((e)=> e.toLowerCase().includes(text.replaceAll(" ", "_").toLowerCase())).slice(0,6).map((el, i)=> <Link key={i} to={`/search?tag=${el}`} ><li onClick={()=> {setText(el); setShowSearch(false)}} className="list-search">{el.replaceAll("_", " ")}</li></Link>) }
                </ul>
                </div>)}
            </div>
            <button className="search-btn" hidden type="button">
            <svg width="1em" height="1em" viewBox="0 0 32 32"><path d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9z" fill="currentColor"></path></svg>
            </button>
        </form>
    </>
    )
}
export default Search