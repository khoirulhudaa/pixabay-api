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
    amount: 15,
    type: 'photo',  
    // photo, illustration, vector, all
    apiKey: '25687773-88986de890621f4246729e578',
    baseURL: 'https://pixabay.com/api'
  }

  componentDidMount = () => {
    Axios.get(`${this.state.baseURL}/?key=${this.state.apiKey}&q=${this.state.search}&image_type=${this.state.type}&per_page=${this.state.amount}&safesearch=true`)
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
    setTimeout(() => {
      Axios.get(`${this.state.baseURL}/?key=${this.state.apiKey}&q=${this.state.search}&image_type=${this.state.type}&per_page=${this.state.amount}&safesearch=true`)
      .then(res => {
        this.setState({
          images: res.data.hits
        })
      })
      console.log(this.state)
    }, 200)
  }

  setSearch = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
    setTimeout(() => {
      Axios.get(`${this.state.baseURL}/?key=${this.state.apiKey}&q=${this.state.search}&image_type=${this.state.type}&per_page=${this.state.amount}&safesearch=true`)
      .then(res => {
        this.setState({
          images: res.data.hits
        })
      })
      console.log(this.state)
    }, 200)
    console.log(this.state)
  }
  
  getTypeAndAmount = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    setTimeout(() => {
      Axios.get(`${this.state.baseURL}/?key=${this.state.apiKey}&q=${this.state.search}&image_type=${this.state.type}&per_page=${this.state.amount}&safesearch=true`)
      .then(res => {
        this.setState({
          images: res.data.hits
        })
      })
      console.log(this.state)
    }, 200)

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
            <div className="navigation">
              <div class="dropdown">
                <select onChange={e => this.getTypeAndAmount(e)} name="type" value={this.state.type}>
                  <option value="all">All</option>
                  <option value="photo">Photo</option>
                  <option value="vector">Vector</option>
                  <option value="illustration">illustration</option>
                </select>
              </div>
              <div class="dropdown">
                <select onChange={e => this.getTypeAndAmount(e)} name="amount" value={this.state.amount}>
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                  <option value={35}>35</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
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