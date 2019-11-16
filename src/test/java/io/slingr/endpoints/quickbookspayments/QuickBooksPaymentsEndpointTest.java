package io.slingr.endpoints.quickbookspayments;

import io.slingr.endpoints.utils.tests.EndpointTests;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

@Ignore("For dev purposes only")
public class QuickBooksPaymentsEndpointTest {

    private static EndpointTests test;
    private static QuickBooksPaymentsEndpoint endpoint;

    @BeforeClass
    public static void init() throws Exception {
        test = EndpointTests.start(new io.slingr.endpoints.quickbookspayments.Runner(), "test.properties");
        endpoint = (QuickBooksPaymentsEndpoint) test.getEndpoint();
    }


    @Test
    public void testRequest() {

    }

}
