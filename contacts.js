const fsp = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

const updateContactsList = async (contacts) =>
  await fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fsp.readFile(contactsPath);
  const result = JSON.parse(contacts);
  return result;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw new Error("The contact is not found");
  }

  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContactsList(contacts);

  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new Error("The contact is not found");
  }

  const contactToRemove = contacts[index];

  contacts.splice(index, 1);

  await updateContactsList(contacts);

  return contactToRemove;
};

module.exports = { listContacts, getContactById, addContact, removeContact };
