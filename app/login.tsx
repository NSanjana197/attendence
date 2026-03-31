import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import { supabase } from "../src/lib/supabase";

export default function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const router = useRouter();

const handleLogin = async ()=>{

if(!email || !password){

alert("Enter email and password");
return;

}

const { data, error } =
await supabase.auth.signInWithPassword({

email:email.trim(),
password:password.trim()

});

if(error){

alert(error.message);
return;

}

router.replace("/dashboard");

};

const handleSignup = async ()=>{

if(!email || !password){

alert("Enter email and password");
return;

}

if(password.length < 6){

alert("Password must be minimum 6 characters");
return;

}

const { data, error } =
await supabase.auth.signUp({

email: email.trim(),
password: password.trim()

});

if(error){

alert(error.message);
return;

}

if(!data.user){

alert("Signup failed");
return;

}

/* create profile */

const { error:profileError } =
await supabase
.from("profiles")
.insert([

{
id:data.user.id,
role:"student"
}

]);

if(profileError){

alert(profileError.message);
return;

}

alert("Account created. Now login.");

};

return(

<View style={styles.container}>

<Text style={styles.title}>
Attendance App
</Text>

<TextInput
style={styles.input}
placeholder="Email"
value={email}
onChangeText={setEmail}
/>

<TextInput
style={styles.input}
placeholder="Password"
secureTextEntry
value={password}
onChangeText={setPassword}
/>

<Pressable
style={styles.button}
onPress={handleLogin}
>

<Text style={styles.buttonText}>
Login
</Text>

</Pressable>

<Pressable
style={[styles.button,{backgroundColor:"green"}]}
onPress={handleSignup}
>

<Text style={styles.buttonText}>
Create Account
</Text>

</Pressable>

</View>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:'center',
padding:20
},

title:{
fontSize:26,
textAlign:'center',
marginBottom:30,
fontWeight:'bold'
},

input:{
borderWidth:1,
padding:12,
marginBottom:15,
borderRadius:8
},

button:{
backgroundColor:'#0284c7',
padding:15,
borderRadius:8,
marginTop:10,
alignItems:'center'
},

buttonText:{
color:'white',
fontSize:18,
fontWeight:'bold'
}

});