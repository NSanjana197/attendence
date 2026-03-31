import React, { useEffect, useState } from "react";

import {
    ActivityIndicator,
    FlatList,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";

import { useRouter } from "expo-router";

import { supabase } from "../src/lib/supabase";

type Academy = {

id:string;

name:string;

created_at?:string;

};

export default function Home(){

const router = useRouter();

const [academies,setAcademies] =
useState<Academy[]>([]);

const [loading,setLoading] =
useState(true);

useEffect(()=>{

loadAcademies();

},[]);

async function loadAcademies(){

setLoading(true);

const {data,error} =
await supabase
.from("academies")
.select("*");

if(error){

console.log(error.message);

setLoading(false);

return;

}

setAcademies(data || []);

setLoading(false);

}

function selectAcademy(academy:Academy){

router.push({

pathname:"/coach",

params:{
academyId:academy.id
}

});

}

async function logout(){

await supabase.auth.signOut();

router.replace("/login");

}

if(loading){

return(

<View style={styles.center}>

<ActivityIndicator size="large"/>

<Text>
Loading academies...
</Text>

</View>

);

}

return(

<SafeAreaView style={styles.container}>

<Text style={styles.title}>
Select Academy
</Text>

<FlatList

data={academies}

keyExtractor={(item)=>item.id}

renderItem={({item})=>(

<Pressable
style={styles.card}
onPress={()=>selectAcademy(item)}
>

<Text style={styles.text}>
{item.name}
</Text>

</Pressable>

)}

ListEmptyComponent={

<Text style={styles.empty}>
No academies found
</Text>

}

/>

<Pressable
style={styles.logout}
onPress={logout}
>

<Text style={styles.btn}>
Logout
</Text>

</Pressable>

</SafeAreaView>

);

}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:"#f8fafc"
},

title:{
fontSize:26,
fontWeight:"bold",
marginBottom:20,
textAlign:"center"
},

card:{
backgroundColor:"#0284c7",
padding:18,
borderRadius:12,
marginBottom:15
},

text:{
color:"white",
fontSize:18,
fontWeight:"600"
},

logout:{
backgroundColor:"#ef4444",
padding:15,
borderRadius:10,
alignItems:"center",
marginTop:10
},

btn:{
color:"white",
fontSize:18,
fontWeight:"bold"
},

center:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

empty:{
textAlign:"center",
marginTop:40,
color:"gray"
}

});