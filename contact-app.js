const fs = require("fs/promises");
const chalk = require("chalk");
const functions = require("./functions");
const { operators } = require("./operators");

(async () => {
  try {
    const directoryDatas = await fs.readdir(module.path).catch(() => {
      throw new Error("something went wrong in reading directory.");
    });

    if (!directoryDatas.includes("contacts.json"))
      await fs
        .writeFile(module.path + "/contacts.json", JSON.stringify([]))
        .catch(() => {
          throw new Error("something went wrong in creating contacts.json.");
        });

    const enteredCommandDatas = functions.getEnteredCommandDatas();

    switch (enteredCommandDatas.command) {
      case "add":
        await functions.addContact(
          enteredCommandDatas.datas.name,
          enteredCommandDatas.datas.phoneNumber,
          enteredCommandDatas.datas.description
        );
        break;
      case "get":
        const getDatas = { key: null, data: null };
        const getKeys = Object.keys(enteredCommandDatas.datas);

        getDatas.key = getKeys[0];
        getDatas.data = enteredCommandDatas.datas[getKeys[0]];

        await functions.getContact(getDatas);
        break;
      case "delete":
        const deleteDatas = { key: null, data: null };
        const deleteKeys = Object.keys(enteredCommandDatas.datas);

        deleteDatas.key = deleteKeys[0];
        deleteDatas.data = enteredCommandDatas.datas[deleteKeys[0]];

        await functions.deleteContact(deleteDatas);
        break;
      case "edit":
        await functions.editContact(
          enteredCommandDatas.datas.id,
          enteredCommandDatas.datas.name,
          enteredCommandDatas.datas.phoneNumber,
          enteredCommandDatas.datas.description
        );
        break;
      case "help":
        functions.displayCommands();
        break;

      default:
        console.log("wrong command.");
        console.log(
          chalk.bgBlueBright.blue(
            operators.find((value) => value.op === "help").description
          )
        );
        break;
    }
  } catch (error) {
    console.log(chalk.bgRedBright.red(error));
    process.exit(1);
  }
})();
