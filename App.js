import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // icon 모음
import { AppLoading} from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

export default function App() {
  // useState(false) = 기본값 로드 X
  const [loaded, setLoaded] = useState(false);
  
  const preLoad = async() => {
    // Font 불러오기
    try{
      await Font.loadAsync({
        ...Ionicons.font
      })
      await Asset.loadAsync([require("./assets/logo.png")])
      setLoaded(true);
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    preLoad();
  }, []);
  return loaded ? <View>
  <Text>Open up App.js to start working on your app!</Text>
  </View> : <AppLoading/>
}

