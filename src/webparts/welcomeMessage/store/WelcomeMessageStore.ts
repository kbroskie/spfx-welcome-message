import { Dispatcher } from 'simplr-flux';
import { EventEmitter } from 'events';

/**
 * Store class that dispatches the data, based on the response.
 */
export class WelcomeMessageStore extends EventEmitter {
    public userDataArray = [];
    public randomFactArray = [];

    public dataStore = (response: any) => {
        //debugger;

        if (response.action) {
            switch (response.action.type) {
                case "userData": {
                    this.userDataArray = response.action.value.value;
                    this.emit ('userData');

                    break;
                }

                case "randomFact": {
                    this.randomFactArray = response.action.value;
                    this.emit ('randomFact');
                    break;
                }
            }
        } else {
            this.emit ('errorLoadingData');
        }
    }
}

/**
 * Initialize an object for the store class
 * Register the dispatcher and export the object.
 */
const objWelcomeMessageStore = new WelcomeMessageStore;
// Dispatcher code
Dispatcher.register (objWelcomeMessageStore.dataStore.bind (objWelcomeMessageStore));

export default objWelcomeMessageStore;