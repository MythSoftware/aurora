package com.mythsoftware.rest.service;

import com.mythsoftware.rest.model.User;
import com.mythsoftware.rest.util.PropertyReader;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

/** Listener class that responds to Spring startup
 *
 */
@Transactional
@Component
@Repository
public class StartContextEventHandler<ContextRefreshedEvent> implements ApplicationListener {
    private static final Logger logger = LoggerFactory.getLogger(StartContextEventHandler.class);

    @PersistenceContext(type = PersistenceContextType.TRANSACTION)
    private EntityManager em;

    @Override
    public void onApplicationEvent(ApplicationEvent applicationEvent) {
        logger.trace("app event " + applicationEvent.getSource());

        boolean loadData = PropertyReader.getBoolean("loadSampleData");

        if (loadData) {
            int numberOfSampleRows = PropertyReader.getInt("numberOfSampleRows", 100);
            logger.info("Loading {} sample rows of data ", numberOfSampleRows);

            try {

                ClassLoader classLoader = getClass().getClassLoader();
                File file = new File(classLoader.getResource("users.csv").getFile());

                List<String> linesFromFile = FileUtils.readLines(file, "UTF-8");


                List<String> lines = linesFromFile.stream().limit(numberOfSampleRows).collect(Collectors.toList());

                for (String line : lines) {
                    String[] tokens = line.split(",");

                    User user = new User(tokens[0], tokens[1],tokens[2],tokens[3],tokens[4],tokens[5]);
                    em.persist(user);
                }

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
