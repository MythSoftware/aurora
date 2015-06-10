package com.mythsoftware.rest.service;

import com.mythsoftware.rest.model.User;

import java.util.List;

/**
  */
public interface UserService {

    /** Finds a user by id.
     *
     * @param id the unique user id
     * @return if found, a User object, else null if user not found.
     */
    User findUserById(long id);

    /** Gets all users
     *
     * @return a list of users.
     */
    List<User> getUsers();
}
