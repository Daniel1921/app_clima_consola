import inquirer from "inquirer";
import colors from "colors";

// const inquirer = require('require');
// require('colors');

const options = [
  {
    type: "list",
    name: "opcion",
    message: "¿ Que actividad desea escoger ? ",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar una Ciudad.`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial.`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir.`,
      },
    ],
  },
];

const pausaMode = [
  {
    type: "input",
    name: "pause",
    message: `Presione el ${"Enter".green} para continuar`,
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================================".green);
  console.log("Seleccione una opción".white);
  console.log("==========================================\n".green);

  const { opcion } = await inquirer.prompt(options);
  return opcion;
};

const pause = async () => {
  console.log("\n");
  await inquirer.prompt(pausaMode);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "No se ha ingresado ningun valor!";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const list = async ( data = []) => {
  const choices = data.map((choice, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: choice.id,
      name: `${idx} ${choice.name}`,
    };
  });



  choices.unshift({
    value: "0",
    name: "0. ".green + " Cancelar",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Seleccione Lugar: ",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);

  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showListTasks = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.completeIn ? true : false,
    };
  });

  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(questions);

  return ids;
};

//module.exports = {inquirerMenu, pause, readInput, listTaskForDelete, confirm, showListTasks}

export {
  inquirerMenu,
  pause,
  readInput,
  list,
  confirm,
  showListTasks,
};
