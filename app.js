const { program } = require('commander');
const contacts = require('./db');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'get':
      const allContacts = await contacts.listContacts();
      return allContacts;
    case 'getById':
      const contact = await contacts.getContactById(id);
      return contact;
    case 'add':
      const newContact = await contacts.addContact({ name, email, phone });
      return newContact;
    case 'remove':
      const deleteContact = await contacts.removeContact(id);
      return deleteContact;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();
invokeAction(options);
