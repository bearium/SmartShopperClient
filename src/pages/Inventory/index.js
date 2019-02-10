import React, { Component } from 'react';
import {
  Button,
  Container,
  Header,
  Segment,
  Table,
} from 'semantic-ui-react';
import firebase from 'firebase';
import Swal from 'sweetalert2'
import solace from 'solclientjs';

class inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      inventory: [],
    };
    this.maketable = this.maketable.bind(this);
    this.orderButton = this.orderButton.bind(this);
    this.makeNotification = this.makeNotification.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('/token').on('value', (snapshot) => {
      this.setState({
        token: [snapshot.val().Token],
      });
    });

    firebase.database().ref('/inventory').on('value', (snapshot) => {
      this.setState({
        inventory: snapshot.val(),
      });
      if (snapshot.val().Errors.error !== '') {
        this.makeNotification(snapshot.val().Errors.error);
      }
    });
  }

  maketable(item) {
    if (!item.hasOwnProperty("error")) {
      return (
          <Table.Row>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.cost}</Table.Cell>
            <Table.Cell >{item.stock}</Table.Cell>
            <Table.Cell >
              <Button onClick={this.orderButton}>Order</Button>
            </Table.Cell>
          </Table.Row>
      );
    }
    return null;
  }

  orderButton(){
    var session = window.session;
    var messageText = "testinf 123";
    var message = solace.SolclientFactory.createMessage();
    message.setDestination(solace.SolclientFactory.createTopicDestination("reserve"));
    message.setBinaryAttachment(messageText);
    message.setDeliveryMode(solace.MessageDeliveryModeType.DIRECT);
    console.log(session);
    if (session !== null) {
      try {
        session.send(message);
        console.log("Message published.");
      } catch (error) {
        console.log(error.toString());
      }
    } else {
      console.log("Cannot publish because not connected to Solace message router.");
    }
  }



  makeNotification(error) {
    console.log("start request");
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'key=AAAAepQznBg:APA91bF0RrH9IZm-J5r1XnQaBYmeeokQ7h6rW1gV_GiWWUyzTC5ShddjE5BqOiG7kcMPD-rwZW61-1YqzZ_8GiBBdSM3q24yyeK0nUZiN2DWn5GgiPvpD2tgpPBzyeuw2qCe_oV5cIs_',
      },
      body: JSON.stringify({
        notification: {
          title: 'GreenHouse management System',
          body: error,
        },
        to: this.props.token,
      }),
    });
    console.log('made Request');
    firebase.database().ref('/users/TFSInAIyjZasPfyanDjsveMmdRH2/greenHouses/-LO6EC8taWQp_X6WGnS1/Errors').update(
      {
        error: '',
      },
    );
  }


  render() {
    return (
      <>
        <Segment vertical>
          <Container text style={{ textAlign: 'center', marginTop: '20px' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Inventory
            </Header>
            <Table celled structured>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2'>Cost</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2'>Stock</Table.HeaderCell>
                  <Table.HeaderCell colSpan='3'>Order</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  Object.values(this.state.inventory).map(this.maketable)
                }
              </Table.Body>
            </Table>
          </Container>
        </Segment>
      </>
    );
  }
}

export default inventory;
