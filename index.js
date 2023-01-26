const contactsRepository = require("./contacts");
const yargs = require("yargs");

run();

async function run() {
  try {
    const arguments = process.argv;
    const { argv } = yargs(arguments);

    invokeAction(argv);
  } catch (error) {
    console.log(error);
  }
}

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list": {
      const allContacts = await contactsRepository.listContacts();
      console.table(allContacts);
      break;
    }
    case "get": {
      const contact = await contactsRepository.getContactById(id.toString());
      console.log(contact);
      break;
    }
    case "add": {
      const createdContact = await contactsRepository.addContact({
        name,
        email,
        phone,
      });
      console.log(createdContact);
      break;
    }
    case "remove": {
      const removedContact = await contactsRepository.removeContact(
        id.toString()
      );
      console.log(removedContact);
      break;
    }
    default: {
      console.warn("Unknown action type!");
    }
  }
}
