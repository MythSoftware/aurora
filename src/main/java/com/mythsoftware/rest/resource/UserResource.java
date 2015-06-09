package com.mythsoftware.rest.resource;

import com.mythsoftware.rest.model.User;
import com.mythsoftware.rest.service.UserService;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.ArrayList;
import java.util.List;

/**
 */
@Named
@Path("/")
public class UserResource {

    @Inject
    private UserService userService;

    @GET
    @Path("/userById/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser() {
        User user = new User();
        user.setFirstName("Joe");
        user.setLastName("blow");

        return Response.ok(user).build();
    }

    // find users by search
    @GET
    @Path("/jsonMediaList")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUsers() {
        List<User> users = new ArrayList<>();

        users.add(new User("Joe", "Blow"));
        users.add(new User("Steve", "Blow"));
        users.add(new User("Nancy", "Queen"));
        users.add(new User("Sally", "Sup"));

        return Response.ok(users).build();
    }

    @GET
    @Path("/jsonById/{id}")
    public Response getUserById(@PathParam("id") String id) {
        return Response.status(200).entity("getUserById is called, id : " + id).build();
    }

    @GET
    @Path("/jsonSearch/{firstName}/{lastName}")
    public Response getUserByName(@PathParam("firstName") String firstName,
                                  @PathParam("lastName") String lastName) {
        return Response.status(200).entity("getUserByName is called, first " + firstName + ", last " + lastName).build();

    }

    // Create users
    @POST
    @Path("/jsonPost/createUser")
    public Response saveBook(@FormParam("firstName") String firstName) {
        System.out.println("User from page: " + firstName);
        return Response.ok(firstName).build();
    }

    @GET
    @Path("/searchParameters1")
    public Response findUsersByCriteria(
            @QueryParam("limit") int limit,
            @QueryParam("sort") String sort) {

        return Response.status(200).entity("search parameters sort " + sort + ", limit " + limit).build();
    }

    @GET
    @Path("/searchParametersDefault")
    public Response findUsersByCriteriaDefault(
            @DefaultValue("10") @QueryParam("limit") int limit,
            @QueryParam("sort") String sort) {

        return Response.status(200).entity("search parameters sort " + sort + ", limit " + limit).build();
    }


    @GET
    @Path("/searchParameters2")
    public Response findUsersByCriteria2(
            @QueryParam("limit") int limit,
            @QueryParam("sort") List<String> sort) {

        return Response.status(200).entity("search parameters sort " + sort + ", limit " + limit).build();
    }

    @GET
    @Path("/searchParameters3")
    public Response findUsersByCriteria3(@Context UriInfo uriInfo) {

        // getFirst is a short cut to get the first item in the list with the given key
        String limitStr = uriInfo.getQueryParameters().getFirst("limit");
        int limit = Integer.parseInt(limitStr);

        List<String> sort = uriInfo.getQueryParameters().get("sort");


        List<User> users = new ArrayList<>();


     //   users.sort(bothNamesLastFirst);

        return Response.status(200).entity("search parameters sort " + sort + ", limit " + limit).build();
    }



  //  private static Comparator<User> lastName =  (u1, u2) -> u1.getLastName().compareTo(u2.getLastName());

   // private static Comparator<User> firstName =  (u1, u2) -> u1.getFirstName().compareTo(u2.getFirstName());

  //  private static Comparator<User> bothNamesLastFirst = lastName.thenComparing(firstName);


}
