package com.myth.aurora.service;

import javax.inject.Singleton;

import org.glassfish.hk2.api.InterceptionService;
import org.glassfish.hk2.utilities.binding.AbstractBinder;

import com.myth.aurora.init.PersonService;
import com.myth.aurora.rest.PersonResource;

/**
 * Interception service binding for HK2
 */
public class RestInterceptorBinder extends AbstractBinder {
	@Override
	protected void configure() {
		bind(PersonResource.class).in(Singleton.class);
		bind(PersonServiceImpl.class).to(PersonService.class);
		bind(RestInterceptorService.class).to(InterceptionService.class).in(Singleton.class);
	}
}