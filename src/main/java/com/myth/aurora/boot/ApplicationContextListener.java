package com.myth.aurora.boot;

import java.util.Arrays;
import java.util.EnumSet;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.json.spi.JsonProvider;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.google.common.util.concurrent.Service;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Module;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;
import com.myth.aurora.init.AuroraModule;

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

public class ApplicationContextListener extends GuiceServletContextListener {
	private Logger log = LoggerFactory.getLogger(ApplicationContextListener.class);

	private static Injector INJECTOR;
	private static List<Module> MODULES = Lists.newArrayList();

	public ApplicationContextListener() {
//		HashSet<Service> services = Sets.newHashSet();
//		services.add(new MongoServiceModule());
//
//		Module[] modules = new Module[] { new ServletModule(), new AuroraModule() };
//		MODULES.addAll(Arrays.asList(modules));
	}

	public static Injector getInjectorInstance() {
		return INJECTOR;
	}

	public static List<Module> getAllModules() {
		return MODULES;
	}

	public static Module[] getAllModulesAsArray() {
		return (Module[]) MODULES.toArray(new Module[MODULES.size()]);
	}

	public static void createInjectorInstance(ServletContext srvCtx) {
		MODULES.add(new ServletModule());
//		MODULES.add(new AuroraModule());
		INJECTOR = Guice.createInjector(MODULES);
	}

	public static void finalizeInjectorInstance() {
		INJECTOR = null;
	}

	@Override
	protected Injector getInjector() {
		return getInjectorInstance();
	}

	@Override
	public void contextInitialized(ServletContextEvent servletContextEvent) {
		createInjectorInstance(servletContextEvent.getServletContext());
		super.contextInitialized(servletContextEvent);
	}

	@Override
	public void contextDestroyed(ServletContextEvent servletContextEvent) {
		try {
			log.info("Destroying application context");

			super.contextDestroyed(servletContextEvent);
		} finally {
			finalizeInjectorInstance(); // force GC.
		}
	}
}
