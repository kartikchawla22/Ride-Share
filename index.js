/**
 * @format
 */
import { Navigation } from "react-native-navigation";

import App from './App';

Navigation.registerComponent('Splash', () => App);
Navigation.events().registerAppLaunchedListener(() => {
    const options = {
        topBar: {
            visible: false,
            statusbar: { visible: false }
        }
    };
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'Splash'
                        }
                    }
                ],
                options: options
            }
        }
    });
});
