import React, {useState, useEffect} from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import { Ionicons } from '@expo/vector-icons'; // icon 모음
import { AppLoading} from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import options from './assets/apollo';

export default function App() {
  // useState(false) = 기본값 로드 X
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  
  const preLoad = async() => {
    // Font 불러오기
    try{
      await Font.loadAsync({
        ...Ionicons.font
      })
      await Asset.loadAsync([require("./assets/logo.png")])

      // apollo 관련 
      // 캐쉬 생성
      const cache = new InMemoryCache();
      // asyncstorage를 이용해 persist생성
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      // apollo client가 될 캐쉬를 가진 client를 만듬
      const client = new ApolloClient({
        cache,
        ...options
      });
      setLoaded(true);
      setClient(client);
    }catch(e){
      console.log(e);
    }
  }

  /*
  ★ useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook 입니다.
   클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방합니다.
  */
  useEffect(() => {
    preLoad();
  }, []);
  return loaded && client ? (
    <ApolloProvider client = {client}>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </ApolloProvider>) : (
    <AppLoading/>
  );
}

