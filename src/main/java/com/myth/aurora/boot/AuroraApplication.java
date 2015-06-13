package com.myth.aurora.boot;


import javax.ws.rs.ext.Provider;
import javax.inject.Inject;

import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.jersey.server.ResourceConfig;
import org.jvnet.hk2.guice.bridge.api.GuiceBridge;
import org.jvnet.hk2.guice.bridge.api.GuiceIntoHK2Bridge;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
* Copyright (c) 2014 MYTH Technologies. All rights reserved.
*
* This software and all information contained therein is confidential and
* proprietary and shall not be duplicated, used, disclosed or disseminated
* in any way except as authorized by the applicable license agreement,
* without the express written permission of MYTH. All authorized
* reproductions must be marked with this language. EXCEPT AS SET FORTH IN
* THE APPLICABLE LICENSE AGREEMENT, TO THE EXTENT PERMITTED BY APPLICABLE
* LAW, MYTH PROVIDES THIS SOFTWARE WITHOUT WARRANTY OF ANY KIND, INCLUDING
* WITHOUT LIMITATION, ANY IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS
* FOR A PARTICULAR PURPOSE. IN NO EVENT WILL MYTH BE LIABLE TO THE END USER
* OR ANY THIRD PARTY FOR ANY LOSS OR DAMAGE, DIRECT OR INDIRECT, FROM THE
* USE OF THIS SOFTWARE, INCLUDING WITHOUT LIMITATION, LOST PROFITS,
* BUSINESS INTERRUPTION, GOODWILL, OR LOST DATA, EVEN IF MYTH IS EXPRESSLY
* ADVISED OF SUCH LOSS OR DAMAGE.
* Created by gregorylambert on 6/3/15.
*/

@Provider
public class AuroraApplication extends ResourceConfig {

	private static Logger logger = LoggerFactory.getLogger(AuroraApplication.class);

	@Inject
	public AuroraApplication(ServiceLocator serviceLocator) {
		logger.info("Registering injectables...");
		packages("com.myth.aurora.rest");
		GuiceBridge.getGuiceBridge().initializeGuiceBridge(serviceLocator);

		GuiceIntoHK2Bridge guiceBridge = serviceLocator.getService(GuiceIntoHK2Bridge.class);
		guiceBridge.bridgeGuiceInjector(Guicer.injector);

	}
}