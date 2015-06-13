package com.myth.aurora.rest;

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

import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.base.Throwables;

@Provider
public class ResourceExceptionMapper implements ExceptionMapper<Throwable> {
	private static final Logger log = LoggerFactory.getLogger(ResourceExceptionMapper.class);

	@Override
	public Response toResponse(Throwable t) {
		Throwable root = Throwables.getRootCause(t);
		String message = t.getLocalizedMessage();

		// Jersey API NFE
		if (t instanceof NotFoundException || t instanceof IllegalArgumentException) {
			log.error(message, root);
			return getMessage(Status.NOT_FOUND, message);
		} else if (t instanceof NullPointerException) {
			log.error(message, root);
			return getMessage(Status.NOT_FOUND, message);
		} else if (t instanceof IllegalArgumentException) {
			log.error(message, root);
			return getMessage(Status.BAD_REQUEST, message);
		}  else if (t instanceof Exception) {
			ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
			mapper.disable(SerializationFeature.WRITE_EMPTY_JSON_ARRAYS);
			mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
			ObjectNode data = mapper.createObjectNode();
			Status status = Status.BAD_REQUEST;

			/*
			 * The following is to support the Hero error response structure
			 * data: { error: { code: {code}, message: {message} } }
			 */
			if (!data.path("error").path("code").isMissingNode()) {
				status = Status.fromStatusCode(data.get("error").get("code").asInt());
			} else if (!data.path("code").isMissingNode()) {
				status = Status.fromStatusCode(data.path("code").asInt());
			}

			if (!data.path("error").path("message").isMissingNode()) {
				message = data.get("error").get("message").asText();
			} else if (!data.path("message").isMissingNode()) {
				message = data.get("message").asText();
			}

			log.error(message, root);
			return getMessage(status, message, data);
		}

		log.error(message, root);
		return getMessage(Status.INTERNAL_SERVER_ERROR, message);
	}

	private Response getMessage(Status status, String message) {
		return getMessage(status, message, null);
	}

	private Response getMessage(Status status, String message, ObjectNode data) {
		int code = status.getStatusCode();
		return Response.status(status).entity("").build();
	}
}
