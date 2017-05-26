import { IEnvironment } from './environment.interface';

export const environment : IEnvironment = {
  production : true,
	apiUrl : `${window.location.protocol}//${window.location.hostname}`,
	logLevel : 'error'
};
