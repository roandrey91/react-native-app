import React from 'react';
import { Home } from './app/views/Home.js';
import { Contact } from './app/views/Contact.js';
import { createStackNavigator } from 'react-navigation';

import { Video } from './app/views/Video.js';
import { VideoDetail } from './app/views/VideoDetail.js';
import { Register } from './app/views/Register.js';
import { Login } from './app/views/Login.js';

import { Quiz } from './app/views/Quiz.js';
import { Finish } from './app/views/QuizFinish.js';

import { About } from './app/views/About.js';

const MyRoutes = createStackNavigator({
  HomeRT: Home,
  ContactRT: Contact,
  LessonsRT: Video,
  VideoDetailRT: VideoDetail,
  RegisterRT: Register,
  LoginRT: Login,
  QuizRT: Quiz,
  FinishRT: Finish,
  AboutRT: About,
},
  {
    initialRouteName: 'HomeRT'
  }
);

export default class App extends React.Component {
  render() {
    return (
      <MyRoutes /> 
    );
  }
}


