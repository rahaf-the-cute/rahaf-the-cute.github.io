import React from 'react'
import ReactDOM from 'react-dom'
import Search from './components/Search';
import View from './views/View';
import { 
  useSearchParams,
  HashRouter,
  Routes,
  Route
  } from "react-router-dom";
import App from './views/App'
import '@picocss/pico'
import './css/bootstrap-grid.css'

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route>
          <Route path="search" element={<View />} />
          <Route
          path="/"
          element={
            <main style={{ padding: "1rem" }}>
              <h1 id="hero">Go ahead and search!</h1>
              <div className="row m-auto">
                <Search />
              </div>
            </main>
          }
        />
        </Route>
      </Route>
      <Route path="*"  element={
          <main style={{ padding: "1rem" }}>
            <p>404</p>
          </main>
        } />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
)