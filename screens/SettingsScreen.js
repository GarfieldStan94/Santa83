import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';

  export default class SettingsScreen extends Component{

    constructor(){
        super();
        this.state ={
            emailId: '',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            docId: ''
        }
    }

    componentDidMount(){
        this.getUserDetails();
    }

    getUserDetails(){
        var user = firebase.auth().currentUser;
        var email = user.email;

        

        db.collection('users').where('email_id','==',email).get().then(snapshot =>{
            snapshot.forEach(doc => {
                var data = doc.data();

            })
            this.setState({
                emailId   : data.email_id,
                firstName : data.first_name,
                lastName  : data.last_name,
                address   : data.address,
                contact   : data.contact,
                docId     : doc.id
              })
            


        })
    }

    updateUserDetails(){
          db.collection('users').doc(this.state.docId).update({
            "firstName": this.state.firstName,
            "last_name" : this.state.lastName,
            "address"   : this.state.address,
            "contact"   : this.state.contact

          })

          Alert.alert("Info has been updated");
    }

      render(){
          return(
              <View>
                  <Text> Settings </Text> 
                  <View>
                  <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          value={this.state.firstName}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          value={this.state.lastName}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          value={this.state.contact}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          value={this.state.address}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          value={this.state.emailId}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TouchableOpacity style= {styles.button}
        onPress ={()=>{
          this.updateUserDetails()
        }}>
            
            <Text style= {styles.buttonText}> Save</Text>
         </TouchableOpacity>
                      
                      

                    </View> 
                  
             </View> 
               
          );
      }
  }

  const styles = StyleSheet.create({
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
      },
      buttonText:{
        fontSize:25,
        fontWeight:"bold",
        color:"#fff"
      }

  })