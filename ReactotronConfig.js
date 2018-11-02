import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron
  .configure() // controls connection & communication settings
  .use(reactotronRedux()) // uses redux
  .connect(); // let's connect!

export default reactotron;
