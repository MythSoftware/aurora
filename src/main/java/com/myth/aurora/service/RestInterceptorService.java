package com.myth.aurora.service;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.List;

import org.aopalliance.intercept.ConstructorInterceptor;
import org.aopalliance.intercept.MethodInterceptor;
import org.glassfish.hk2.api.Filter;
import org.glassfish.hk2.api.InterceptionService;
import org.glassfish.hk2.utilities.BuilderHelper;

import com.google.common.collect.Lists;

public class RestInterceptorService implements InterceptionService {
	@Override
	public List<ConstructorInterceptor> getConstructorInterceptors(Constructor<?> arg0) {
		return Lists.newArrayList();
	}

	@Override
	public Filter getDescriptorFilter() {
		return BuilderHelper.allFilter();
	}

	@Override
	public List<MethodInterceptor> getMethodInterceptors(Method method) {
		List<MethodInterceptor> ret = Lists.newArrayList();

		return ret;
	}
}
