import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet,} from 'react-native';
import { createStackNavigator} from 'react-navigation-stack'
import {Card} from 'react-native-elements'


export default class ReceiverDetailsScreen extends Component{
    constructor(){
        super(props);
        this.state ={
            userId: firebase.auth().currentUser.email,
            receiverId: this.props.navigation.getParam('details')["user_id"],
            requestId: this.props.navigation.getParam('details')["request_id"],
            bookName: this.props.navigation.getParam('details')["book_name"],
            reason_for_requesting: this.props.navigation.getParam('details')["reason_to_request"],
            receiverName: '',
            receiverContact : '',
            receiverAddress : '',
            receiverRequestDocId : ''
        }
        
    }

    getReceiverDetails(){
        db.collection('users').where('email_id', '==',this.state.receiverId).get().then(snapshot =>{
            snapshot.forEach(doc =>{
                this.setState({
                    receiverName: doc.data().firstName,
                    receiverContact: doc.data().contact,
                    receiverAddress: doc.data().address
                })
            })
        })
    }

    updateBookStatus(){
        db.collection('all-donations').add({
            book_name: this.state.bookName,
            request_id: this.state.requestId,
            requested_by: this.state.receiverName,
            donoe_id: this.userId,
            request_status: "Donor Interested"
        })
    }

    addNotification =() =>{
        var message = this.state.userName +" is willing to donate the book"
        db.collection("allNotifications").add({
            book_name:  this.state.bookName,
            userIf: this.state.receiverId,
            donorId: this.state.userId,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            notification_staus: 'unread',
            message: message
        })
    }
    render(){
        return(
            <View>
                <View>
                <Card title={"Book Information"}
                titleStyle ={{fontSize:20}}> </Card>
                <Card> <Text>Name: {this.state.bookName} </Text></Card>
                <Card><Text>Reason for requesting: {this.state.reason_for_requesting}</Text> </Card> 
                </View>

                <View>
                    <Card title={"Receiver Information"}> </Card>
                    <Card> <Text>Name:{this.state.receiverName}  </Text> </Card>
                    <Card> <Text> Contact:{this.state.receiverContact} </Text> </Card>
                    <Card> <Text> Address:{this.state.receiverAddress} </Text> </Card>
                 </View>
                
                <View>
                <TouchableOpacity style = {styles.button}
                onPress={()=>{
                    this.updateBookStatus()
                    this.addNotification()
                    this.props.navigation.navigate('MyDonations')
                }}
                > <Text> Willing to Give </Text> </TouchableOpacity>
                    
                </View>
             </View>

        )
    }
}

const styles = StyleSheet.create({
    button:{
        width:200,
        height:50,
        justifyContent:'center',
        alignItems : 'center',
        borderRadius: 10,
        backgroundColor: 'orange',
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         },
        elevation : 16
      }

});

