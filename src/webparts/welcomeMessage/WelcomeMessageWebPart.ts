import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'WelcomeMessageWebPartStrings';
import WelcomeMessage from './components/WelcomeMessage';
import { IWelcomeMessageProps } from './components/IWelcomeMessageProps';

export interface IWelcomeMessageWebPartProps {
  currentContext: any;
  currentTimeOfDay: string;
}

export default class WelcomeMessageWebPart extends BaseClientSideWebPart<IWelcomeMessageWebPartProps> {

  public render (): void {
    const element: React.ReactElement<IWelcomeMessageProps> = React.createElement (
      WelcomeMessage,
      {
        currentContext: this.context,
        currentTimeOfDay: ''
      }
    );

    ReactDom.render (element, this.domElement);
  }

  protected onDispose (): void {
    ReactDom.unmountComponentAtNode (this.domElement);
  }

  protected get dataVersion (): Version {
    return Version.parse ('1.0');
  }

  protected getPropertyPaneConfiguration (): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
          ]
        }
      ]
    };
  }
}
