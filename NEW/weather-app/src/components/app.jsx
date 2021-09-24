import React, {Component} from 'react'
import moment from 'moment'
import axios from 'axios'
import NProgress from 'react-nprogress'

import ModalAlert from './modal'

import 'react-nprogress/nprogress.css'
import 'unnamed'
import '../assets/styles/main.css'
import logo from '../assets/img/logo.svg'

import Icon from './icon'

export default class App extends Component {
    
    state = {
        errorText: undefined,
        City: '',
        day: '',
        temperature: '',
        summary: '',
        icon: 'clearNight'
    }

    maker = 'http://smakosh.com'

    closeModal = () => {
        this.setState(() => ({errorText: undefined}))
    }

    Convert = temp => `${((temp - 32) * 5/9).toFixed(0)} °C`

    GetWeather = City => {

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        const geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${City}`
        return axios.get(proxyUrl + geocodeURL)
        .then((response) => {
            if(response.data.status === 'ZERO_RESULTS') {
                throw new Error('Unable to find that City')
            }

            const lat = response.data.results[0].geometry.location.lat 
            const lng = response.data.results[0].geometry.location.lng

            const dataCity = {City}
            const json = JSON.stringify(dataCity)
            localStorage.setItem('dataCity', json)

            const weatherURL = `https://api.darksky.net/forecast/${process.env.REACT_APP_FORCAST_API_KEY}/${lat},${lng}`
            return axios.get(proxyUrl + weatherURL)
        }).then((response) => {
            
            const day = moment.unix(response.data.currently.time).format("dddd");
            const temperature = this.Convert(response.data.currently.temperature)
            const summary = response.data.currently.summary
            let icon = response.data.currently.icon

            if(icon === 'clear-day') icon = 'clearDay'
            else if(icon === 'clear-night') icon = 'clearNight'
            else if(icon === 'partly-cloudy-day') icon = 'partlyCloudyDay'
            else if(icon === 'partly-cloudy-night') icon = 'partlyCloudyNight'

            this.setState({
                City,
                day,
                temperature,
                summary,
                icon
            })
        }).catch((e) => {
            if(e.code === 'ENOTFOUND') {
                return this.setState({ errorText: 'unable to connect to API servers' })
            }
            else {
                return this.setState({ errorText: `Couldn't find that city, try something else` })
            }
        })
    }

    componentWillMount() {
        try {

            const json = localStorage.getItem('dataCity')
            const dataCity = JSON.parse(json)
            const CityLocal = dataCity.City

            if (CityLocal) {
                NProgress.start()
                this.GetWeather(CityLocal)
                NProgress.done()
            }
        } catch(e) {
            console.log('LocalStorage is empty')
        }
    }

    onSubmit = (e) => {
        
        e.preventDefault()
        NProgress.start()
        const FormCity = e.target.elements.city.value
        if(!FormCity) {
            this.setState(() => ({ errorText: 'Please enter the name of a city!' }))
            NProgress.done()
        } else {
            this.GetWeather(FormCity)
            NProgress.done()
        }
    }

    eraseState = () => {
        this.setState({
            City: '',
            day: '',
            temperature: '',
            summary: '',
            icon: 'clearNight'
        })
    }
    render() {
        return (
            <div className={`container-full app ${this.state.icon}`}>
                <div className="valigned">
                    <div className="container center-text">
                        <div className={`card left-text ${this.state.icon}-clear`}>
                        { this.state.City.length === 0 ?
                            <div>
                                <header className="center-text">
                                <img src={logo} className="App-logo" alt="logo" />
                                <h2>Enter the name of a city down bellow</h2>
                                </header>
                                
                                <div className="row">
                                    <div className="column xlarge-2 large-1 hide-tablet-down"></div>
                                    <div className="column xlarge-8 large-10 small-12">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="input-field">
                                                <span className="weather-icon"></span>
                                                <input type="text" name="city" placeholder="Ex: London..." autoComplete="off"/>
                                            </div>
                                            <div className="center-text">
                                                <button type="submit" className="btn">
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="column xlarge-2 large-1 hide-tablet-down"></div>
                                </div>
                            </div>
                            : null
                            }
                            { this.state.City.length > 0 ?
                                <div className="result">
                                    <div className="row">
                                        <div className="column xlarge-6 large-6 medium-12 small-12 center-text">
                                            <Icon
                                                icon={this.state.icon}
                                            />
                                            <h1>{this.state.temperature}</h1>
                                        </div>
                                        <div className="column xlarge-6 large-6 medium-12 small-12">
                                            <h1 className="city">{this.state.City}</h1>
                                            <h2>Today is {this.state.day} & The weather is {this.state.summary}</h2>
                                        </div>
                                        <button 
                                            type="button" 
                                            className="btn custom"
                                            onClick={this.eraseState}
                                        >
                                            Try again
                                        </button>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                        <div className="center-text maker">
                            <h4>
                                Made with <i className="fa fa-heartbeat"></i> By <a href={this.maker} target="_blank">Smakosh</a>
                            </h4>
                        </div>
                    </div>
                </div>
                <ModalAlert
                    errorText={this.state.errorText}
                    closeModal={this.closeModal}
                />
            </div>
        )
    }
}
