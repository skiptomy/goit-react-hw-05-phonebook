/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import shortid from 'shortid';
import ContactForm from '../ContactForm/ContactForm';
import Alert from '../Alert/Alert';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import styles from './App.module.css';

import titleSlideAnimation from '../../transitions/titleSlideAnimation.module.css';
import popAnimation from '../../transitions/pop.module.css';
import alertAnimation from '../../transitions/alertAnimation.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    titleAnimation: false,
    alert: {
      isShow: false,
      message: '',
    },
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
    this.setState({ titleAnimation: true });
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  isExistContact = name => {
    const { contacts } = this.state;
    return contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
  };

  saveContact = ({ name, number }) => {
    if (this.isExistContact(name)) {
      this.setState({
        alert: {
          isShow: true,
          message: `Contact with ${name} already exist!`,
        },
      });

      setTimeout(() => {
        this.setState({
          alert: {
            isShow: false,
            message: `Contact with ${name} already exist!`,
          },
        });
      }, 2000);

      return;
    }

    const checkLength = string => string.length < 1;

    if (checkLength(`${name}`) || checkLength(`${number}`)) {
      alert('Please, fill in all required entry fields');
      return;
    }

    const contact = {
      name,
      number,
      id: shortid.generate(),
    };

    this.setState(state => ({
      contacts: state.contacts.concat(contact),
    }));
  };

  handleFilterChange = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  handleRemove = id => {
    this.setState(state => {
      const contacts = state.contacts.filter(contact => contact.id !== id);
      const filter = contacts.length > 1 ? state.filter : '';
      return { contacts, filter };
    });
  };

  applyFilter() {
    return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()));
  }

  render() {
    const visibleContacts = this.applyFilter();
    const { contacts, titleAnimation, alert } = this.state;

    return (
      <div className={styles.container}>
        <CSSTransition in={titleAnimation} timeout={500} classNames={titleSlideAnimation}>
          <h1>Phonebook</h1>
        </CSSTransition>

        <ContactForm saveContact={this.saveContact} />

        <h2>Contacts</h2>
        <CSSTransition in={contacts.length > 1} timeout={250} classNames={popAnimation} unmountOnExit>
          <Filter filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        </CSSTransition>

        {visibleContacts.length > 0 && <ContactList contacts={visibleContacts} handleRemove={this.handleRemove} />}
        <CSSTransition in={alert.isShow} timeout={250} classNames={alertAnimation} unmountOnExit>
          <Alert message={alert.message} />
        </CSSTransition>
      </div>
    );
  }
}

export default App;
