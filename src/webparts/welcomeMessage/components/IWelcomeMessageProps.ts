import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IWelcomeMessageProps {
  currentContext: WebPartContext;
  currentTimeOfDay: string;
}