/**
 * Created by Jic on 19-Jul-17.
 */
import {StackNavigator} from 'react-navigation';
import home from '../Components/Home';
import detail from '../Components/Detail';
import watch from '../Components/Watch';

const AppRouter = StackNavigator(
    {
        Home: {
            screen: home,
            navigationOptions: ({navigation}) => ({header: null})
        },
        Detail: {
            screen: detail,
            navigationOptions: ({navigation}) => ({header: null})
        },
        Watch: {
            screen: watch,
            navigationOptions: ({navigation}) => ({header: null})
        }
    }
);

export default AppRouter;