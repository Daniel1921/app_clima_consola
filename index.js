// import { readInput } from "./helpers/inquirer"
//const { readInput } = require('./helpers/inquirer');
import { Seeker } from './classes/Seeker.js';
import { inquirerMenu, pause, readInput }  from './helpers/inquirer.js';
import * as dotenv from 'dotenv';
dotenv.config();

const main = async() => {
    const searches =  new Seeker();
    let opt;

    do {

        opt= await inquirerMenu();
        console.log({opt});
        switch(opt) {
            case 1:
                // Mostrar Mensaje: 
                const lugar = await readInput('Ciudad: ')
                await searches.city( lugar );
                // Mostrar los Resultados: 
                console.log('\n Información de la ciudad:\n '.green);
                console.log('Ciudad: ', );
                console.log('Latitutd: ', );
                console.log('Longitud: ', );
                console.log('Temperatura: ', );
                console.log('Mínima: ', );
                console.log('Máxima', ); 
            break;
        }

        if (opt !==0 ) await pause();

    }while (opt  !== 0)
    
}

main();