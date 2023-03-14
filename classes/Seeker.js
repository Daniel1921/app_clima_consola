import axios from "axios";
export class Seeker {
  historial = ["Tegucigalpa", "Madrid", "San jospe"];

  constructor() {}

  get paramsMapBox() {
    return {
      proximity: "ip",
      language: "es",
      access_token:
        process.env.MAPBOX_KEY,
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
      console.log(resp.data);

      return [];
    } catch (error) {
      return [];
    }
  }
}
