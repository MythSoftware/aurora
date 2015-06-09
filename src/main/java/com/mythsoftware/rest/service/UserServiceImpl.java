package com.mythsoftware.rest.service;

import com.mythsoftware.rest.model.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;

/**
 *
 */
@Named
@Repository
@Transactional
public class UserServiceImpl implements UserService {

    @PersistenceContext(type = PersistenceContextType.TRANSACTION)
    private EntityManager em;


    @Override
    public String createHelloMessage(String name) {
        Object obj = em.getDelegate();
        System.out.println("delegate " + name);
        System.out.println("delegate class " + obj);

        User user = new User();
        user.setFirstName("joe");
        user.setLastName("blow");

        em.persist(user);

        System.out.println("User id " + user.getId());

        return name;
    }
}
