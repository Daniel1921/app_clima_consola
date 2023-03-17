// import { readInput } from "./helpers/inquirer"
//const { readInput } = require('./helpers/inquirer');
import { Seeker } from "./classes/Seeker.js";
import { inquirerMenu, pause, readInput, list } from "./helpers/inquirer.js";
import * as dotenv from "dotenv";
dotenv.config();

const main = async () => {
  const searches = new Seeker();
  let opt;

  
  searches.readData();
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Mostrar Mensaje:
        const place = await readInput("Ciudad: ");
        //Listar lugares apartir de un api
        const places = await searches.city(place);
        const id = await list(places);
        if(id === '0') {
          continue;
        }
        const placeSelected = places.find((l) => l.id === id);
        // guardar en la BD
        searches.addHistory(placeSelected.name);
        //get clima apartir de un api
        const weather = await searches.getWeather(placeSelected.lat, placeSelected.lng);
        // Mostrar los Resultados:
        console.clear();
        console.log("\n Información de la ciudad:\n ".green);
        console.log("Ciudad: ", placeSelected.name);
        console.log("Latitutd: ", placeSelected.lat);
        console.log("Longitud: ", placeSelected.lng);
        console.log("Temperatura ");
        console.log("Normal: ", weather.temperatura_normal);
        console.log("Fahrenheit: ", weather.temperatura_farengeit);
        break;

        case 2: 
          searches.getHistoryCapitalized().forEach( (place, i) => {
           const idx = `${i + 1}`.green;
           console.log(`${idx} ${place}`);
          })
        
         break;

    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
