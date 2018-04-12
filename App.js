import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList, // Please, use FlatList Component
  ScrollView,
  ActivityIndicator
} from 'react-native'

export default class App extends Component {  
  constructor(props){
    super(props);
    this.state = {
        images: [],
        isLoading: false,
    }
  }
  
  componentDidMount() {
    this.executeQuery()
  }
  
  executeQuery = () => {
    this.setState({ isLoading: true });
    fetch('https://www.instagram.com/zerotoonelabs/?__a=1')
      .then(response => response.json())
      .then(json => this.handleResponse(json))
      .catch((error) =>
        this.setState({
          isLoading: false,
        })
      ); 
  };

  handleResponse = json => {
    const images = json.graphql.user.edge_owner_to_timeline_media.edges.map(
      edge => edge.node
    );
    this.setState({ isLoading: false, images });
  };
  
  renderItems = () => {
    return this.state.images.map((item) => {
      return (
        <Image style={{ height: 100, width: 200 }} source={{ uri: item.display_url }}/>
      )
    })
  }
  
  render() {
    
    if (this.state.isLoading) {
      return <ActivityIndicator isLoading={this.state.isLoading}  
               size={'large'} 
               style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}/>
    } else {
        return (
         <ScrollView>
            {this.renderItems()}
         </ScrollView>
        )
    }
  }
}

