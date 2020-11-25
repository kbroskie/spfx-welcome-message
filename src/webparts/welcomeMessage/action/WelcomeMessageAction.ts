import { Dispatcher } from 'simplr-flux';
import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';

/**
 * Load the external data.
 * 
 * @param currentContext
 */
const getUserData = async (currentContext: any) => {
    debugger;

    const headers = new Headers ();
    headers.append ('Accept', 'application/json;odata=nometadata');

    const httpClientOptions: IHttpClientOptions = {
        headers: headers,
        method: "GET",
        mode: "cors"
    };

    const apiUrl = 'https://millersvilleuniversity.sharepoint.com/_api/SP.UserProfiles.PeopleManager/GetMyProperties/UserProfileProperties/';

    try {
        // Get the current user's profile data.
        currentContext.httpClient.get (apiUrl,
            HttpClient.configurations.v1, httpClientOptions)
            .then ( (res: HttpClientResponse) => {
                res.json ().then ( (responseJson: any) => {    
                    let dispatchObj = { type: "userData", value: responseJson };
                    Dispatcher.dispatch (dispatchObj);
                });
            }).catch (
                (err: any): void => {
                    console.log (err);
    
                    // Dispatch a null object so that an error is emitted by the store.
                    Dispatcher.dispatch (null);
                }
            );   
    } catch (e) {
        console.log ('getUserData', e);
    }
};

export { getUserData };

/**
 * Load the external data.
 * 
 * @param currentContext
 */
const getRandomFact = async (currentContext: any) => {
    debugger;

    const headers = new Headers ();

    const httpClientOptions: IHttpClientOptions = {
        headers: headers,
        method: "GET",
        mode: "cors"
    };

    const apiUrl = 'https://www.millersville.edu/data/feeds/randomFact.json';

    try {
        // Get a random fact.
        currentContext.httpClient.get (apiUrl,
            HttpClient.configurations.v1, httpClientOptions)
            .then ( (res: HttpClientResponse) => {
                res.json ().then ( (responseJson: any) => {    
                    let dispatchObj = { type: "randomFact", value: responseJson };
                    Dispatcher.dispatch (dispatchObj);
                });
            }).catch (
                (err: any): void => {
                    console.log (err);
    
                    // Dispatch a null object so that an error is emitted by the store.
                    Dispatcher.dispatch (null);
                }
            );   
    } catch (e) {
        console.log ('getRandomFact', e);
    }
};

export { getRandomFact };