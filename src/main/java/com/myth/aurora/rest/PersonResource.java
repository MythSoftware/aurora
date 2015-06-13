package com.myth.aurora.rest;

import com.fasterxml.jackson.databind.JsonNode;

import com.myth.aurora.Constants;
import com.myth.aurora.init.PersonService;
//import com.sun.jersey.api.container.httpserver.HttpServerFactory;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.node.ObjectNode;

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

@Path("/persons")

public class PersonResource implements Constants {
	private final static Logger log = LoggerFactory.getLogger(PersonResource.class);

	private PersonService personService;

	@Inject
	public PersonResource( PersonService personService) {
		this.personService = personService;
	}

	@GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPersons() {
		JsonNode payload = personService.getAll();
		return Response.ok(payload.toString()).build();
    }

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getPerson(@PathParam(PARAM_ID) String id) throws Exception {
		log.debug("*** [EXTERNAL]: GET PERSON ({}) ***", id);

		JsonNode person = personService.get(id);

		return Response.ok(person.toString()).build();
	}

	@GET
	@Path("{id}/{resource}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getPersonSubresource(@PathParam(PARAM_ID) String id, @PathParam("resource") String resource) throws
			Exception {
		log.debug("*** [EXTERNAL]: GET PERSON SUBRESOURCES ({}) ***", id);

		JsonNode resources = personService.get(id, resource);

		return Response.ok(resources.toString()).build();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createPerson(JsonNode personData) throws Exception {
		log.debug("*** [EXTERNAL]: CREATE PERSON ***");

		JsonNode person = personService.create(personData);

		return Response.status(Response.Status.CREATED).entity(person).build();
	}

	@POST
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updatePerson(@PathParam(PARAM_ID) String id, JsonNode personData) throws Exception {
		log.debug("*** [EXTERNAL]: UPDATE PERSON ({}) ***", id);
		JsonNode person;

		JsonNode response = personService.update(id, personData);
		return Response.ok(response).build();
	}

	@DELETE
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") String id) throws Exception {
		log.debug("*** [SETTINGS RESOURCE API]: DELETE USERNAME GENERATION POLICY CALLED ***");
		JsonNode deleted = personService.delete(id);

		return Response.ok(deleted.toString()).build();
	}
}
