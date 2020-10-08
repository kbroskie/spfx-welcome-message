import * as React from 'react';
import styles from './WelcomeMessage.module.scss';
import { IWelcomeMessageProps } from './IWelcomeMessageProps';

// Import the action and store file, set into its respective objects.
import * as WelcomeMessageAction from '../action/WelcomeMessageAction';
import WelcomeMessageStore from '../store/WelcomeMessageStore';

// Interface to hold the state variables.
export interface WelcomeMessageState_Interface {
  currentContext: any;
  userFirstName: string;
  currentTimeOfDay: string;
  randomFact: string;
}


export default class WelcomeMessage extends React.Component<IWelcomeMessageProps, WelcomeMessageState_Interface> {

  constructor (props: Readonly<IWelcomeMessageProps>) {
    super (props);

    // Initialize the state variables.
    this.state = {
      userFirstName: '',
      currentContext: this.props.currentContext,
      currentTimeOfDay: this.props.currentTimeOfDay,
      randomFact: ''
    };
  }

  /**
   * Load the data after the initial page load.
   */
  public componentDidMount () {
    try {
      /**
       * Invoke the actions to get the current logged in user's data and a random fact.
       * 
       * @param currentContext
       */
      WelcomeMessageAction.getUserData (this.state.currentContext);
      WelcomeMessageAction.getRandomFact (this.state.currentContext);

      // Define the Listener method for loading the data.
      WelcomeMessageStore.on ('userData', this.setUserGreetingData.bind (this));
      WelcomeMessageStore.on ('randomFact', this.setRandomFactData.bind (this));
    } catch (e) {
      console.log ('componentWillMount', e);
    }
  }

  /**
   * Event listener method that gets invoked to set the user data that is emitted from store.
   * Stores the user's first name and a string containing the current time of day in the state variables.
   */
  public setUserGreetingData = () => {    
    try {
      this.setState ({ 
        userFirstName: WelcomeMessageStore.userDataArray[4].Value,
        currentTimeOfDay: this.getCurrentTimeOfDay ()
      });
    } catch (e) {
      console.log ('setUserGreetingData', e);
    }  
  }

  /**
   * Event listener method that gets invoked to set the user data that is emitted from store.
   * Stores the user's first name and a string containing the current time of day in the state variables.
   */
  public setRandomFactData = () => {  
    console.log (WelcomeMessageStore.randomFactArray['text']);
    try {
      this.setState ({ randomFact: WelcomeMessageStore.randomFactArray['text'] });
    } catch (e) {
      console.log ('setUserGreetingData', e);
    }  
  }

  /**
   * Determine the current time of day greeting.
   * 
   * @returns A string containing morning, afternoon or evening.
   */
  private getCurrentTimeOfDay (): string {
    let date = new Date ();

    let currentTimeOfDay = '';
    let currentHours = date.getHours ();

    if (currentHours < 12) {
      currentTimeOfDay = 'morning';
    } else if (currentHours < 17) {
      currentTimeOfDay = 'afternoon';
    } else if (currentHours >= 17) {
      currentTimeOfDay = 'evening';
    }

    return currentTimeOfDay;
  }

  public render (): React.ReactElement<IWelcomeMessageProps> {
    const siteUrl = this.state.currentContext.pageContext.site.absoluteUrl;

    const imagePath = '/SiteAssets/skully.jpg';
console.log (siteUrl);
    return (
      <div className={styles.welcomeMessage}>
        <div className={styles.box}>
          <span className={styles.greeting}>
            <span>{ this.state.currentTimeOfDay.length ? 'Good ' + this.state.currentTimeOfDay : 'Hello' }</span>
            <span>{ this.state.userFirstName.length ? ' ' + this.state.userFirstName : '' }</span>
            <span>!</span>
          </span>
          { this.state.randomFact ? <span className={styles.randomFact}><span className={styles.label}>Did you know? </span> {this.state.randomFact} </span> : '' }
        </div>
        <img src={`${siteUrl}${imagePath}`} alt="Skully" height="110px"></img>
      </div>
    );
  }
}