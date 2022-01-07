import { useSearchParams } from "react-router-dom";
import Search from "../components/Search";
import useFetch from "../hooks/useFetch";
import Modal from "../components/Modal";
import "../App.css";
import { useState } from "react";

function View(){
    let [searchParams, setSearchParams] = useSearchParams();
    const tag = searchParams.get("tag");
    const page = searchParams.get("page") || 1;
    const [imageURL, setImageURL] = useState(null);
    const [modal, showModal] = useState(false);
    const [imageLoading, setLoaded] = useState(true)
    const { loading, error, value } = useFetch(
        `https://script.google.com/macros/s/AKfycbzQOgdsxPa-eow4rJ0FZNWeZ4JK1Rx3YDieGcyuVtTiiX5V535Y4OakCMgU7fzW3DVkNg/exec?type=list&tag=${tag}&page=${page}`,
        {},
        [tag, page]
      )
    return (
    <>
    <main>
        <h1 id="hero" style={{ padding: "1rem" }}>#{tag}</h1>
        {loading && (<div className="d-flex justify-content-center p-3">
                        <svg width="1.6em" height="1.6em" viewBox="0 0 24 24" id="rotate"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z" opacity=".5" fill="#744867"></path><path d="M20 12h2A10 10 0 0 0 12 2v2a8 8 0 0 1 8 8z" fill="#341436"></path></svg>
                    </div>)}
        <div className="row justify-items-center justify-content-center align-items-center">
            {value && value?.data.map((item, idx) => (
                <div key={idx} className="col-lg-4 col-md-6 col-12">
                <article className="card-image">
                    <div style={{textAlign: "center"}}>
                    <img src={"https://imagex.aratech.co/?url=" + encodeURIComponent(item.imagePrv.replace(/^http(s|)\:\/\//, "") ) }
                    onClick={()=> {setImageURL("https://http.rahaf.workers.dev/?" + encodeURIComponent(item.imageLink)); setLoaded(true); showModal(true)  }}
                    />
                    </div>
                    <footer><div className="d-flex"><span>{item.imageExt} - {item.imageInfo.size}</span></div></footer>
                </article>
            </div>
            ))}
            {open && <Modal url={imageURL} open={modal} close={showModal} setLoaded={setLoaded} imageLoading={imageLoading} />}
        </div>
    </main>
    </>
    )
}

export default View