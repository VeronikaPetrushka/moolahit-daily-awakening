import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MDArouteimports from './MDAresources/MDAconstants/MDArouteimports';

type RootStackParamList = {
  MDAsplash: undefined;
  MDAintro: undefined;
  MDAchallenge: undefined;
  MDAchallengeslog: undefined;
  MDAlevels: undefined;
};

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {

  return (
      <NavigationContainer>
          <Stack.Navigator
            initialRouteName={"MDAsplash"}
            screenOptions={{
              headerShown: false
            }}
          >    
              <Stack.Screen 
                    name="MDAsplash" 
                    component={MDArouteimports.MDAsplashroute} 
              />
              <Stack.Screen 
                    name="MDAintro" 
                    component={MDArouteimports.MDAintroroute} 
              />
              <Stack.Screen 
                    name="MDAchallenge" 
                    component={MDArouteimports.MDAchallengeroute} 
              />
              <Stack.Screen 
                    name="MDAchallengeslog" 
                    component={MDArouteimports.MDAchallengeslogroute} 
              />
              <Stack.Screen 
                    name="MDAlevels" 
                    component={MDArouteimports.MDAlevelsroute} 
              />
          </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
