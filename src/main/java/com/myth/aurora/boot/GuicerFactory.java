package com.myth.aurora.boot;

import java.util.Set;
import com.google.inject.Module;
import com.google.common.util.concurrent.Service;

public class GuicerFactory {
	private static final String ALREADY_INITIALIZED = "Guice Injector already initialized. Attempt to re-initialize probably due to a bug";
	private static Guicer GUICER;

	private GuicerFactory() {
	}

	public static void initialize(Set<Service> services, Module... modules) {
		if (GuicerFactory.GUICER != null)
			throw new RuntimeException(ALREADY_INITIALIZED);

		GuicerFactory.GUICER = new Guicer(services, modules);
	}

	public static Guicer guicer() {
		return GuicerFactory.GUICER;
	}
}

