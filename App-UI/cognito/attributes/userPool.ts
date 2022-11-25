import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_TA9eSqumg',
  ClientId: '21qq0ogcvbqgojg4vfnmufskpe'
};

export default new CognitoUserPool(poolData);