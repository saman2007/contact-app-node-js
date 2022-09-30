const fs = require("fs/promises");
const chalk = require("chalk");
const { operators } = require("./operators");

const displayNotCompleteError = () => {
  console.log(chalk.bgRedBright.red("you didnt enter necessary datas"));
  console.log(
    chalk.bgBlueBright.blue(
      operators.find((value) => value.op === "help").description
    )
  );
  process.exit(1);
};

const displayNotFoundError = () => {
  console.log(chalk.bgRedBright.red("not found!"));
  process.exit(1);
};

const displayCommands = () => {
  operators.forEach((command, index) => {
    console.log(
      chalk.bgBlueBright.blue(
        `${index + 1}- ${command.op}: ${command.description}`
      )
    );
    console.log("");
  });
};

const getEnteredCommandDatas = () => {
  const args = process.argv;
  const commandDetails = { command: args[2] || null, datas: {} };

  args.splice(0, 3);

  args.forEach((data) => {
    const splitedData = data.split("=");
    commandDetails.datas[splitedData[0]] = splitedData[1];
  });

  return commandDetails;
};

const getAllContacts = async () => {
  try {
    const contacts = await fs
      .readFile(module.path + "/contacts.json")
      .catch(() => {
        throw new Error("an error occured in reading contacts.json");
      });

    return JSON.parse(contacts);
  } catch (error) {
    console.log(chalk.bgRedBright.red(error));
    process.exit(1);
  }
};

const updateContacts = async (newContacts) => {
  try {
    await fs
      .writeFile(module.path + "/contacts.json", JSON.stringify(newContacts))
      .catch(() => {
        throw new Error("failed to update contacts.json");
      });
  } catch (error) {
    console.log(chalk.bgRedBright.red(error));
    process.exit(1);
  }
};

const addContact = async (name, phoneNumber, description) => {
  if (!name && !phoneNumber) {
    displayNotCompleteError();
  }

  let hasError = false;
  if (name.trim === "") {
    hasError = true;
    console.log(chalk.bgRedBright.red(error));
  }
  if (
    !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
      phoneNumber
    )
  ) {
    hasError = true;
    console.log(
      chalk.bgRedBright.red("please enter a correct and valid phone number!")
    );
  }
  if (hasError) process.exit(1);

  const contacts = await getAllContacts();

  const existContact = contacts.find(
    (value) => value.name === name || value.phoneNumber === phoneNumber
  );

  if (existContact) {
    if (
      existContact.phoneNumber === phoneNumber &&
      existContact.name === name
    ) {
      console.log(
        chalk.bgRedBright.red(
          "a contact exists with your entered phone number and name. please enter unique phone number and name."
        )
      );
    } else if (existContact.phoneNumber === phoneNumber) {
      console.log(
        chalk.bgRedBright.red(
          "a contact exists with your entered phone number. please enter unique phone number."
        )
      );
    } else if (existContact.name === name) {
      console.log(
        chalk.bgRedBright.red(
          "a contact exists with your entered name. please enter unique name."
        )
      );
    }

    process.exit(1);
  }

  contacts.push({
    id:
      contacts.length === 0
        ? 1
        : Math.max(...contacts.map((data) => data.id)) + 1,
    name,
    phoneNumber,
    description: description || null,
  });

  await updateContacts(contacts);

  console.log(
    chalk.bgGreenBright.green(
      "added your contact successfuly! ",
      "contact id: ",
      +contacts[contacts.length - 1].id
    )
  );
};

const getContact = async (datas) => {
  if (!datas || datas.key === "description" || (!datas.key && !datas.data)) {
    displayNotCompleteError();
  }

  const contacts = await getAllContacts();
  const specificContact = contacts.find(
    (value) => value[datas.key] == datas.data
  );

  if (specificContact) {
    for (const key in specificContact) {
      console.log(`${key}: ${specificContact[key]}`);
    }
  } else {
    displayNotFoundError();
  }
};

const deleteContact = async (datas) => {
  if (!datas || datas.key === "description" || (!datas.key && !datas.data)) {
    displayNotCompleteError();
  }

  const contacts = await getAllContacts();

  const specificContactIndex = contacts.findIndex(
    (value) => value[datas.key] == datas.data
  );

  if (specificContactIndex !== -1) {
    contacts.splice(specificContactIndex, 1);
    await updateContacts(contacts);
    console.log(chalk.bgGreenBright.bgGreen("removed successfuly!"));
  } else {
    displayNotFoundError();
  }
};

const editContact = async (id, name, phoneNumber, description) => {
  if (!id) {
    displayNotCompleteError();
  }

  const contacts = await getAllContacts();
  const specificContactIndex = contacts.findIndex(
    (contact) => contact.id === +id
  );

  if (specificContactIndex !== -1) {
    try {
      const specificContact = contacts[specificContactIndex];
      const notUniqueProps = [];
      if (name) {
        const isUnique = contacts.findIndex((data) => data.name === name);
        if (isUnique !== -1) notUniqueProps.push("name");
        else specificContact.name = name;
      }
      if (phoneNumber) {
        const isUnique = contacts.findIndex(
          (data) => data.phoneNumber === phoneNumber
        );
        if (isUnique !== -1) notUniqueProps.push("phoneNumber");
        else specificContact.phoneNumber = phoneNumber;
      }
      if (notUniqueProps.length !== 0) {
        throw notUniqueProps;
      }
      if (description) {
        specificContact.description = description;
      }
      await updateContacts(contacts);
      console.log(chalk.bgGreenBright.green("edited successfuly!"));
    } catch (error) {
      console.log(
        chalk.bgRedBright.red(
          "there are contacts with the same ",
          error.join(", "),
          ". enter unique datas please."
        )
      );
      process.exit(1);
    }
  } else {
    displayNotFoundError();
  }
};

module.exports = {
  displayCommands,
  getEnteredCommandDatas,
  addContact,
  getContact,
  deleteContact,
  editContact,
};
