const operators = [
  {
    op: "add",
    description:
      "if you want to add a contact to your contacts, youe should write this command: node contact-app add name=<person name> phone=<phone number> description=<optional, description>",
  },
  {
    op: "edit",
    description:
      "if you want to edit a contact, youe should write this command: node contact-app edit id=<contact id> name=<optional, new name> phone=<optional, new phone number> description=<optional, description>",
  },
  {
    op: "delete",
    description:
      "if you want to delete a contact, you should write this command: node contact-app id=<optional, contact id> name=<optional, name> phoneNumber=<optional, phone number>",
  },
  {
    op: "get",
    description:
      "if you want to get a contact datas, you should write this command: node contact-app get id=<optional, contact id> name=<optional, name> phoneNumber=<optional, phone number>",
  },
  {
    op: "help",
    description:
      "if you want to see all commands, you should write this command: node contact-app help",
  },
];

module.exports.operators = operators;
