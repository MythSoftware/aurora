package com.myth.aurora.boot;

import javax.net.ssl.SSLSocketFactory;
import java.util.ArrayList;

import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.util.concurrent.AbstractService;
import com.google.inject.Binder;
import com.google.inject.Module;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.DB;
import com.mongodb.ServerAddress;

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


public class MongoServiceModule extends AbstractService implements Module {
	private final Logger log = LoggerFactory.getLogger(MongoServiceModule.class);

	private static final String MONGODB_HOST_PROP = "mongodb.host";
	private static final String MONGODB_SSL_PROP = "mongodb.ssl";
	private static final String MONGODB_USERNAME_PROP = "mongodb.username";
	private static final String MONGODB_PASSWORD_PROP = "mongodb.password";
	private static final String MONGODB_ADMIN_DB = "admin";

	private MongoClient mongoClient;

	@Override
	public void configure(Binder binder) {
		binder.bind(MongoClient.class).toInstance(mongoClient);
	}

	@Override
	protected void doStart() {
		init();

		if (mongoClient != null)
			notifyStarted();
	}

	@Override
	protected void doStop() {
		log.info("Shutting down mongo db connection..");
		if (mongoClient != null)
			mongoClient.close();

		notifyStopped();
	}

	private void init() {
		try {
			Configuration config = new PropertiesConfiguration("aurora.properties");

			boolean ssl = config.getBoolean(MONGODB_SSL_PROP, false);

			/* Apache Commons' getString won't pull in a comma-delimited list, so we need to pull it in as an array
			and then reconstitute it for the uri */
			String[] hostArray = config.getStringArray(MONGODB_HOST_PROP);

			ArrayList<ServerAddress> addr = new ArrayList<>();
			for (String host : hostArray) {
				addr.add(new ServerAddress(host));
			}

			log.info("Initializing mongo db connection with replica set: {}", addr.toString());
			if (ssl) {
				MongoClientOptions opts = new MongoClientOptions.Builder().socketFactory(SSLSocketFactory.getDefault())
						.build();
				mongoClient = new MongoClient(addr, opts);
			} else {
				mongoClient = new MongoClient(addr);
			}

			String username = config.getString(MONGODB_USERNAME_PROP);
			String password = config.getString(MONGODB_PASSWORD_PROP);
			if (!username.isEmpty() && !password.isEmpty()) {
				log.info("Authenticating mongo user");
				DB adminDb = mongoClient.getDB(MONGODB_ADMIN_DB);
				if (!adminDb.authenticate(username, password.toCharArray())) {
					throw new RuntimeException("Failed to authenticate mongo user");
				}
			}
		} catch (Exception e) {
			throw new RuntimeException("Unable to initialize mongo data store", e);
		}
	}
}
