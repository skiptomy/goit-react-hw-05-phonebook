import React from 'react';
import propTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ContactItem from '../ContactItem/ContactItem';
import styles from './ContactList.module.css';
import slideAnimation from '../../transitions/slide.module.css';

const ContactList = ({ contacts, handleRemove }) => (
  <TransitionGroup component="ul" className={styles.contactList}>
    {contacts.map(contact => (
      <CSSTransition key={contact.id} timeout={250} classNames={slideAnimation}>
        <li className={styles.contactItem}>
          <ContactItem contact={contact} handleRemove={() => handleRemove(contact.id)} />
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  ).isRequired,
  handleRemove: propTypes.func.isRequired,
};

export default ContactList;
