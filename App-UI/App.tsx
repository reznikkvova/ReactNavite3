import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import UserContext from "./hooks/context/UserContext";
import Tickets from './models/tickets';
import React, { useState, useContext, useEffect } from 'react';
import Amplify, {Auth} from 'aws-amplify';
import Register from './models/register';
import Asset from './models/asset';
import Memo from './models/memo';
import Log from './models/log';
import { getAsset } from './remote/backend.api';
// import { withAuthenticator } from 'aws-amplify-react-native';
import config from './src/aws-exports.js'


Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

//export default withAuthenticator(App)
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const as = new Asset('asset', '', '', '', 'IO Device', '', '', '' , '', '', 'iOS', '','');
  const [asset, setAsset] = useState(as);
  const [tickets, setTickets] = useState<Tickets[] | null>(null);
  const [registers, setRegisters] = useState<Register[] | null>(null);
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const [memos, setMemos] = useState<Memo[] | null>(null);
  const me = new Memo('memo', '', '', '', '');
  const [memo, setMemo] = useState<Memo>(me);
  const [logs, setLogs] = useState<Log[] | null>(null);
  const [picked, setPicked] = useState('');
  const onScreenLoad = async () => {
    const res = await getAsset();
    setAssets(res);
    console.log(res);
  }

  useEffect(() => {
    onScreenLoad();
  }, [])
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <UserContext.Provider 
      value={{ tickets, 
              setTickets, 
              asset, setAsset, 
              authenticated, 
              setAuthenticated, 
              user, 
              setUser,
              memos,
              setMemos, 
              memo,
              setMemo,
              logs,
              setLogs,
              assets,
              setAssets, 
              role, 
              setRole,
              registers,
              setRegisters,
              picked,
              setPicked}}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </UserContext.Provider>
    );
  }
}
