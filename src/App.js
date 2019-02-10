import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import firebase from 'firebase';
import ResponsiveContainer from './layouts/ResponsiveContainer';
import HomepageLayout from './pages/Home';
import Inventory from './pages/Inventory';
import solace from "solclientjs"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Token: '',
    };
    this.subscribe = this.subscribe.bind(this);
  }
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBubBsFMONE-WohDsvGgG6Kg-m3-HC9shU",
      authDomain: "smartshopper-cc2c0.firebaseapp.com",
      databaseURL: "https://smartshopper-cc2c0.firebaseio.com",
      projectId: "smartshopper-cc2c0",
      storageBucket: "smartshopper-cc2c0.appspot.com",
      messagingSenderId: "925667531658"
    });
    const messaging = firebase.messaging();
    messaging.requestPermission()
      .then((response) => {
        console.log('request granted');
        return messaging.getToken().then((token) => {
          firebase.database().ref('/token').update(
            {
              Token: token,
            },
          );
          this.setState({
            Token: token,
          });
          return token;
        });
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });


    var factoryProps = new solace.SolclientFactoryProperties();
    factoryProps.profile = solace.SolclientFactoryProfiles.version10;
    solace.SolclientFactory.init(factoryProps);
    console.log(factoryProps);

    var session = solace.SolclientFactory.createSession({
        url: "ws://mr4b11zr8tp.messaging.mymaas.net:80",
        vpnName: "msgvpn-4b11zr8sv",
        userName: "solace-cloud-client",
        password: "1r2sp03d0v7i9d9amhn8l94mf8",
    });
    try {
      session.connect();
    } catch (error) {
      console.log(error);
    }
    window.session = session;


    session.on(solace.SessionEventCode.UP_NOTICE, function (sessionEvent) {
      console.log('=== Successfully connected and ready to subscribe. ===');
      session.subscribe();
    });

    window.setTimeout(this.subscribe, 10000)

  }

  subscribe(){
    try {
      window.session.subscribe(
          solace.SolclientFactory.createTopic("reserve"),
          true,
          "reserve",
          10000
      );
      console.log("it worked")
    } catch (error) {
      console.log(error.toString());
    }
    /*...SNIP...*/


    window.session.on(solace.SessionEventCode.MESSAGE, function (message) {
      console.log('Received message: "' + message.getBinaryAttachment() + '", details:\n' + message.dump());
    });
  }


  render() {
    return (
      <BrowserRouter>
        <ResponsiveContainer>
          <Switch>
            <Route exact path="/" component={HomepageLayout} />
            <Route path="/inventory" render={() => <Inventory token={this.state.Token} />} />
          </Switch>
        </ResponsiveContainer>
      </BrowserRouter>
    );
  }
}

export default App;
