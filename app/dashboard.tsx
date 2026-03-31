import { Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

export default function Dashboard(){

const {coachId,academyId} =
useLocalSearchParams();

return(

<View>

<Text>
Dashboard
</Text>

<Text>
Academy : {academyId}
</Text>

<Text>
Coach : {coachId}
</Text>

</View>

);

}