package com.mythsoftware.rest.util;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.configuration.reloading.FileChangedReloadingStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 */
public class PropertyReader {

    private final static Logger logger = LoggerFactory.getLogger(PropertyReader.class);
    private static PropertiesConfiguration config;
    private static String propertiesFile = "system.properties";
    private static FileChangedReloadingStrategy strategy = new FileChangedReloadingStrategy();

    static {
        try {
            config = new PropertiesConfiguration(propertiesFile);
            config.setReloadingStrategy(strategy);
            logger.debug("Configuration loaded");
        } catch (ConfigurationException e) {
            logger.error("System.properties could not be read", e.getMessage());
        }
    }

    public static Boolean getBoolean(String key) {
        return config.getBoolean(key);
    }

    public static int getInt(String key, int defaultValue) {
        return config.getInt(key, defaultValue);
    }

}

