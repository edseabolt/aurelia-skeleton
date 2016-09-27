import Promise from 'bluebird';
import {bootstrap} from 'aurelia-bootstrapper-webpack';

Promise.config({
	warnings: false
});

async function configuration(aurelia) {
	aurelia
		.use
		.standardConfiguration()
		.developmentLogging();

	await aurelia.start();
	aurelia.setRoot('app/app', document.body);
}

bootstrap(configuration);
