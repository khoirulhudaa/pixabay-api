import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import bg from './images/bg.jpg';
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class App extends Component {

  state = {
    search: 'Food',
    images: [],
    apiKey: '25687773-88986de890621f4246729e578',
    baseURL: 'https://pixabay.com/api'
  }

  componentDidMount = () => {
    Axios.get(`${this.state.baseURL}/?key=${this.state.apiKey}&q=${this.state.search}&image_type=photo&per_page=15&safesearch=true`)
      .then(res =>{
        this.setState({
          images: res.data.hits
        })
      })
      setTimeout(() => {
        console.log(this.state.images)
      }, 1000)
  }

  getImages = (e) => {
    e.preventDefault()
    Axios.get(`${this.state.baseURL}/?key=${this.state.apiKey}&q=${this.state.search}&image_type=photo&per_page=15`)
    .then(res => {
      this.setState({
        images: res.data.hits
      })
    })
    .then(console.log('images:', this.state.images))
  }

  setSearch = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
    Axios.get(`${this.state.baseURL}/?key=${this.state.apiKey}&q=${this.state.search}&image_type=photo&per_page=15`)
    .then(res => {
      this.setState({
        images: res.data.hits
      })
    })
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
      <section className='hero'>
          <img src={bg}alt="background-hero" />
          <div className='title'>
            <h1>Integrasi pixabay API.</h1>
            <p>Melakukan integrasi API dari pixabay. Mengambil data public yang sudah disediakan oleh pihak ketiga secara gratis. Menghasilkan banyak gambar yang secara bebas untuk didownload</p>
            <form onSubmit={this.getImages}>
              <input type="text" name="search" value={this.state.search} onChange={e => this.setSearch(e)} className='search-input' />
            </form>
          </div>
      </section>
      
      <section className='section2'>
        {
          this.state.images.length ? (
            this.state.images.map(data => (
              <div className="card">
              <img src={data.largeImageURL} className="card-img-top" alt={data.tags} />
              <div className="card-body">
                <h5 className="card-title"><FontAwesomeIcon icon={faDownload} /> {data.downloads}</h5>
                <h5 className="card-title"><FontAwesomeIcon icon={faEye} /> {data.views}</h5>
              </div>
            </div>
          ))
          ):
          <h2 className="sorry">Maaf...gambar tidak tersedia</h2>
        }
      </section>

      <footer className="footer">
        <small>Copyright.2022 - Integrasi API (portofolio)</small>
      </footer>
      </div>
    )
  }
}