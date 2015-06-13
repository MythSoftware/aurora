package com.myth.aurora.boot;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.collect.ObjectArrays;
import com.google.common.util.concurrent.Service;
import com.google.common.util.concurrent.ServiceManager;
import com.google.common.util.concurrent.ServiceManager.Listener;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Module;

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

public class Guicer {
	private Logger log = LoggerFactory.getLogger(Guicer.class);

	private final ServiceManager manager;
	protected static Injector injector;

	public Guicer(Set<Service> services, Module... modules) {
		log.info("Starting {} service manager", Guicer.class.getName());

		manager = new ServiceManager(services);

		manager.addListener(new Listener() {
			@Override
			public void healthy() {}

			@Override
			public void stopped() {}

			@Override
			public void failure(Service service) {
				log.error("Service {} failed to start properly", service);
			}
		});

		// start services asynchronously and wait
		manager.startAsync().awaitHealthy();

		// initialize guice
		Module[] sm = services.toArray(new Module[services.size()]);
		Module[] combined = ObjectArrays.concat(sm, modules, Module.class);

		injector = Guice.createInjector(combined);
	}

	public void shutdown() {
		log.info("Stopping {} service manager", Guicer.class.getName());
		manager.stopAsync().awaitStopped();
	}

	public Injector injector() {
		return injector;
	}

	public <T> T getInstance(Class<T> type) {
		return injector.getInstance(type);
	}
}
