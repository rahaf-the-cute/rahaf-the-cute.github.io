import { Link } from "react-router-dom"
import ReactDOM from 'react-dom'
function Navbar(){
    return (
        <>
        <ul>
            <li id="brand"><Link style={{cursor: "pointer"}} to="/"><strong>Rule34</strong></Link></li>
        </ul>
        <ul>
            <li><Link to="fuck">About</Link></li>
            <li><a href="#">Link</a></li>
            <li><a href="#">Link</a></li>
        </ul>
    </>)
}
export default () => ReactDOM.createPortal( <Navbar /> ,  document.getElementById('nav'))