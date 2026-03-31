import React, { useEffect, useState } from "react";

import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";

import { supabase } from "../src/lib/supabase";

type Coach={

id:string;

academy_id:string;

user_id:string;

};

export default function Coach(){

const router = useRouter();

const { academyId } =
useLocalSearchParams();

const [coaches,setCoaches] =
useState<Coach[]>([]);

const [loading,setLoading] =
useState(true);

useEffect(()=>{

loadCoaches();

},[]);

async function loadCoaches(){

const {data,error} =
await supabase
.from("coaches")
.select("*")
.eq("academy_id",academyId);

if(error){

console.log(error.message);

setLoading(false);

return;

}

setCoaches(data || []);

setLoading(false);

}

function selectCoach(coach:Coach){

router.push({

pathname:"/dashboard",

params:{
coachId:coach.id,
academyId:academyId
}

});

}

if(loading){

return(

<View style={styles.center}>

<ActivityIndicator size="large"/>

<Text>Loading coaches...</Text>

</View>

);

}

return(

<View style={styles.container}>

<Text style={styles.title}>
Select Coach
</Text>

<FlatList

data={coaches}

keyExtractor={(item)=>item.id}

renderItem={({item})=>(

<Pressable
style={styles.card}
onPress={()=>selectCoach(item)}
>

<Text style={styles.text}>
Coach ID : {item.id}
</Text>

</Pressable>

)}

/>

</View>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
padding:20
},

title:{
fontSize:24,
fontWeight:"bold",
marginBottom:20,
textAlign:"center"
},

card:{
backgroundColor:"#0284c7",
padding:18,
borderRadius:10,
marginBottom:15
},

text:{
color:"white",
fontSize:18
},

center:{
flex:1,
justifyContent:"center",
alignItems:"center"
}

});