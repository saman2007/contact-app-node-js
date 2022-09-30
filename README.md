# contact-app-node-js
this is a simple contact app written in `node js`. in this app, you can create, read, update and delete contacts. all the datas of your contacts will be stored in `contacts.json`.

## how does this app work?
this app works by using `process.argv` and you can do CRUD by passing arguments when you want to run the app.

## how to use this app?
to see all the commands of this app, you can go to the directory of the project and run `node contact-app help` or you can see the commands below.

## commands
* add a contact: if you want to add a contact to your contacts, youe should write this command: `node contact-app add name=<person name> phone=<phone number> description=<optional, description>`
* get a contact: if you want to get a contact datas, you should write this command: `node contact-app get id=<optional, contact id> name=<optional, name> phoneNumber=<optional, phone number>`(one of the optional arguments is neccesary)
* edit a contact: if you want to edit a contact, youe should write this command: `node contact-app edit id=<contact id> name=<optional, new name> phone=<optional, new phone number> description=<optional, description>`(one or more of optional arguments are neccesary)
* delete a contact: if you want to delete a contact, you should write this command: `node contact-app delete id=<optional, contact id> name=<optional, name> phoneNumber=<optional, phone number>`(one of the optional arguments is neccesary)
* help: if you want to see all commands, you should write this command: `node contact-app help`
