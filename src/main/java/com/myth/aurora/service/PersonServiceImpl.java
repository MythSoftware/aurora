package com.myth.aurora.service;

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
* Created by gregorylambert on 6/5/15.
*/

import java.util.Calendar;
import java.util.UUID;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.myth.aurora.Constants;
import com.myth.aurora.init.PersonService;

public class PersonServiceImpl implements Constants, PersonService {

	@Override
	public JsonNode getAll() {
		ObjectNode payload = new ObjectMapper().createObjectNode();

		payload.put("method", "get");
		payload.put("ping", "pong");
		payload.put("timestamp", Calendar.getInstance().getTimeInMillis());

		return payload;
	}

	@Override
	public JsonNode get(String id) {
		return new ObjectMapper().createObjectNode().with("DefaultPerson").put("_id", UUID.randomUUID().toString());
	}

	@Override
	public JsonNode get(String id, String subresource) {
		return new ObjectMapper().createObjectNode().with("subResource")
		.put("resourse", "sub")
		.put("schema", "type")
		.put("_id", UUID.randomUUID().toString());
	}

	@Override
	public JsonNode create(JsonNode payload) {

		if (payload == null) {
			payload = new ObjectMapper().createObjectNode();

			((ObjectNode)payload).put("method", "post");
			((ObjectNode)payload).put("ping", "pong");
			((ObjectNode)payload).put("timestamp", Calendar.getInstance().getTimeInMillis());
		}
		// do some real work and return payload
		return payload;
	}

	@Override
	public JsonNode update(String id, JsonNode payload) throws Exception {
		// do some work and return updated payload
		return payload;
	}

	@Override
	public JsonNode delete( String id ) throws Exception {
		return new ObjectMapper().createObjectNode().put(id, "DELETED");
	}
}
