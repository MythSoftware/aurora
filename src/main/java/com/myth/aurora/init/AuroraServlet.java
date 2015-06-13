package com.myth.aurora.init;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;
import com.google.inject.Guice;
import com.google.inject.Inject;
import com.google.inject.Injector;
import com.google.inject.Module;
import com.myth.aurora.boot.ApplicationContextListener;
import com.myth.aurora.rest.PersonResource;
import com.myth.aurora.rest.ResourceExceptionMapper;
import com.myth.aurora.service.RestInterceptorBinder;

import org.glassfish.hk2.utilities.ServiceLocatorUtilities;
import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.jersey.server.ResourceConfig;
import org.jvnet.hk2.guice.bridge.api.GuiceBridge;
import org.jvnet.hk2.guice.bridge.api.GuiceIntoHK2Bridge;

import org.jvnet.hk2.guice.bridge.api.HK2IntoGuiceBridge;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AuroraServlet extends ResourceConfig {
	private static Logger logger = LoggerFactory.getLogger(AuroraServlet.class);

	private ServiceLocator serviceLocator;

	public AuroraServlet() {
//		packages(true,"com.myth.aurora.rest");
		register(PersonResource.class);
		register(ResourceExceptionMapper.class);
		serviceLocator = ServiceLocatorUtilities.createAndPopulateServiceLocator();
		register(new RestInterceptorBinder());
		registerProviders();
	}

	@Inject
	public AuroraServlet(ServiceLocator serviceLocator) {

		register(new RestInterceptorBinder());
		registerProviders();
		packages(true,"com.myth.aurora.rest");
		createBiDirectionalGuiceBridge(serviceLocator, ApplicationContextListener.getAllModulesAsArray());
		GuiceBridge.getGuiceBridge().initializeGuiceBridge(serviceLocator);
		GuiceIntoHK2Bridge guiceBridge = serviceLocator.getService(GuiceIntoHK2Bridge.class);
		guiceBridge.bridgeGuiceInjector(Guice.createInjector(new AuroraModule()));
	}

	private void registerProviders() {
		ObjectMapper mapper = new ObjectMapper();
		mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		JacksonJaxbJsonProvider provider = new JacksonJaxbJsonProvider();
		provider.setMapper(mapper);
		register(provider);
	}

	public Injector createBiDirectionalGuiceBridge(ServiceLocator serviceLocator, Module... applicationModules)
	{
		Module[] allModules = new Module[applicationModules.length + 1];

		allModules[0] = new HK2IntoGuiceBridge(serviceLocator);
		for (int lcv = 0; lcv < applicationModules.length; lcv++)
		{
			allModules[lcv + 1] = applicationModules[lcv];
		}

		Injector injector = ApplicationContextListener.getInjectorInstance();
		GuiceBridge.getGuiceBridge().initializeGuiceBridge(serviceLocator);
		GuiceIntoHK2Bridge g2h = serviceLocator.getService(GuiceIntoHK2Bridge.class);
		g2h.bridgeGuiceInjector(injector);

		return injector;
	}
}