import React from 'react';
import Asset from '../../models/asset';
import Log from '../../models/log';
import Memo from '../../models/memo';
import Register from '../../models/register';
import Tickets from '../../models/tickets';
import { getAsset } from '../../remote/backend.api';

const UserContext = React.createContext({
    user: '',
    setUser: (u:string) => {},
    role: '',
    setRole: (r:string) => {},
    authenticated: false,
    setAuthenticated: (auth:boolean) => {},
    asset: {} as Asset,
    setAsset: (r:Asset) => {},
    memo: {} as Memo,
    setMemo: (r:Memo) => {},
    assets: [] as Asset[] | null,
    setLogs: (r:Array<Log>) => {},
    logs: [] as Log[] | null,
    setMemos: (r:Array<Memo>) => {},
    memos: [] as Memo[] | null,
    setAssets: (value:Array<Asset> | null) => {},
    tickets: [] as Tickets[] | null,
    setTickets: (value:Array<Tickets> | null) => {},
    registers: [] as Register[] | null,
    setRegisters: (value:Array<Register> | null) => {},
    picked: '',
    setPicked: (p: string) => {},
  });

  export default UserContext;