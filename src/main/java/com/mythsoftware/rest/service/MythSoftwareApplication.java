package com.mythsoftware.rest.service;

import com.mythsoftware.rest.resource.UserResource;

import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

/** Registers REST resource classes. This is required for RestEasy applications
 *  running outside of Jboss
 *
 */
public class MythSoftwareApplication extends Application {

    private HashSet<Object> singletons = new HashSet<Object>();

    public MythSoftwareApplication() {
        singletons.add(new UserResource());
    }

    @Override
    public Set<Class<?>> getClasses() {
        HashSet<Class<?>> set = new HashSet<Class<?>>();
        return set;
    }

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }
}
