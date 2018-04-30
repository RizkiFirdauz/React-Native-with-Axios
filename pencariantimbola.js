import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import { Container, Content, Card, CardItem, 
         Thumbnail, Text, Button, Icon, Left,
         Body, Header, Title, Input, Form, Item,List, 
         Label, Footer, FooterTab, ListItem, Right } from 'native-base';
import axios from 'axios';        

class App extends Component {
    constructor(){
        super();
        this.state = {football:[],team:''};
    }

    find(){
      var x = this.state.team;
      var url='https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t='+x;
        axios.get(url).then((ambilData)=>{
          console.log(ambilData.data);
            this.setState({
              football: ambilData.data.player
            })
        })
    }

  render() {
      const data = this.state.football.map(
          (item,index)=>{
              var name   = item.strPlayer;
              var posisi = item.strPosition;
              var foto   = item.strThumb;
              return( 
                <Card avatar key={index}>
                  <CardItem header>
                    <Left>
                      <Thumbnail 
                        source={{uri:foto}}/>
                      <Body>
                        <Text> {name} </Text>
                        <Text note> {posisi} </Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image source={{uri:foto}} 
                      style={{height: 400, width: null, flex: 1}}/>
                  </CardItem>
                  <CardItem footer>
                    <Left><Button transparent>
                      <Icon active name="thumbs-up" />
                      <Text> 12 Like </Text>
                    </Button></Left>
                    <Body><Button transparent>
                      <Icon active name="chatbubbles" />
                        <Text> 4 Comment </Text>
                    </Button></Body>
                    <Right><Button transparent>
                      <Icon active name="share" />
                      <Text> Share </Text>
                    </Button></Right>
                  </CardItem>
                </Card>
              )
          }
        )

    return (
      <Container>
        <Header searchBar rounded>
          <Left>
            <Button transparent><Icon name='menu' /></Button>
          </Left>
          <Body><Title>Football World Team</Title></Body>
          <Right>
            <Button transparent><Icon name='home' /></Button>
          </Right>
        </Header>
        <Item>
            <Input placeholder="Search Team..." onChangeText={(x)=>{this.setState({team:x})}} style={{width:100}} />
            <Button transparent onPress={()=>this.find()}><Icon name="search"/></Button>
          </Item>
        <ScrollView>
        {data}
        </ScrollView>
        <Footer><FooterTab>
          <Button vertical active><Icon name="apps" />
            <Text> Apps </Text></Button>
          <Button vertical><Icon name="camera" />
            <Text> Camera </Text></Button>
          <Button vertical><Icon active name="navigate" />
            <Text> Navigate </Text></Button>
          <Button vertical><Icon name="person" />
            <Text> Contact </Text></Button>
        </FooterTab></Footer>
      </Container>
    )
  }
}

export default App;