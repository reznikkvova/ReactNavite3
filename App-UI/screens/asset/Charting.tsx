import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Dimensions, View, Text, ScrollView } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import MyPieChart from "./MyPieChart";
import { styles } from "../../styles";
import Asset from "../../models/asset";
import { getAsset } from "../../remote/backend.api";
import UserContext from "../../hooks/context/UserContext";

export const ChartScreen: React.FC<unknown>= () => {
  const { setAssets } = useContext(UserContext)

  const [data, setData] = useState<Asset[]>();
  const handle = async() =>  {
     setData(await getAsset() as Asset[]);
  }
  const onScreenLoad = async () => {
    const res = await getAsset();
    setAssets(res);
    console.log(res);
  }
  useEffect(() => {
    onScreenLoad();
  }, [])
// const screenwidth = ;
// const screenheight = Dimensions.get('window').height;


return (
  
    <>
    <ScrollView>
      <View>
      <Text style={styles.title}>Device Group</Text>
      <MyPieChart  category='deviceGroup'/>
      {/* <MyPieChart  category='make'/> */}
      <Text style={styles.title}>Type of OS</Text>
      <MyPieChart  category='typeOS'/>
      </View>
    </ScrollView>
    </>  
);
    }
