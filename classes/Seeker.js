import axios from "axios";
import fs from 'fs';
export class Seeker {
  history = [];
  dbPath = './db/database.json';

  constructor() {}

  get paramsMapBox() {
    return {
      proximity: "ip",
      language: "es",
      access_token: process.env.MAPBOX_KEY,
    };
  }

  get paramsWeatherApi() {
    return {
      key: process.env.WEATHERAPI_KEY,
    };
  }

  async city(place = "") {
    try {
      // Petición HTTP.
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });
      const resp = await instance.get();
      return resp.data.features.map((place_name) => ({
        id: place_name.id,
        name: place_name.place_name,
        lng: place_name.center[0],
        lat: place_name.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async getWeather(lat, lng) {
    try {
      // axios get api
      const instance = axios.create({
        baseURL: `http://api.weatherapi.com/v1/current.json`,
        params: { ...this.paramsWeatherApi, q: lat + "," + lng },
      });
      // resp.data
      const resp = await instance.get();

      return {
        temperatura_normal: resp.data.current.temp_c,
        temperatura_farengeit: resp.data.current.temp_f,
      };
    } catch (error) {
      console.log(error);
    }
  }

  addHistory(place = '') {
    // Evitar duplicados
    if (this.history.includes(place.toLocaleLowerCase())) {
      return;
    }

    // Añadir al array
    this.history.unshift(place.toLocaleLowerCase());

    // grabar el historial en DB
    this.saveData();

  }

  saveData() {
    const payload = {
       history: this.history
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  readData() {

  }
}
