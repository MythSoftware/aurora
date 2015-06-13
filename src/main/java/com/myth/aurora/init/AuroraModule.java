package com.myth.aurora.init;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.myth.aurora.Constants;
import com.google.inject.AbstractModule;

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

public class AuroraModule extends AbstractModule implements Constants {
	private Logger logger = LoggerFactory.getLogger(AuroraModule.class);

	@Override
	protected void configure() {
		logger.debug("CONFIGURING VIA MODULE");
	}

}
