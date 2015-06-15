package com.mythsoftware.rest.service;

import com.mythsoftware.rest.model.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Named;
import javax.persistence.*;
import java.util.List;

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
    public User findUserById(long id) {
        User user = null;
        try {
            Query query = em.createQuery("select u from User u where u.id = :id");
            query.setParameter("id", id);
            user = (User) query.getSingleResult();
        } catch(javax.persistence.NoResultException e) {
            // user will be null on Exception.
        }
        return user;
    }

    @Override
    public List<User> getUsers() {
        TypedQuery<User> query = em.createQuery("select u from User u", User.class);
        return query.getResultList();
    }
}
