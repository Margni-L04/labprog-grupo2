import { registerRootComponent } from 'expo';
import Home from './src/screens/Home';
import Juego from './src/screens/Juego';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

//registerRootComponent(Home);
registerRootComponent(Juego);