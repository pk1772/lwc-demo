public without sharing class OpenAICallout {
    public class OpenAICalloutException extends Exception {
    }
    @AuraEnabled
    public static String getEncodedSpeech(String txt) {
        try {
            //Construct Http request body
            Map<String, Object> reqBody = new Map<String, Object>();
            reqBody.put('model', '{!$Credential.CustomOpenAI.model}');
            reqBody.put('text', txt);
            //Prepare the request
            Http http = new Http();
            HttpRequest req = new HttpRequest();
            //Set endpoint from Named Credential
            req.setEndpoint('callout:OpenAITextToSpeech');
            req.setMethod('POST');
            //Serialize the request body into JSON string
            req.setBody(JSON.serialize(reqBody));
            //Capture response
            HTTPResponse response = http.send(req);
            //If OK
            if (response.getStatusCode() == 200) {
                //Get the Blob response and return base64Encoded string to client
                Blob responseBody = response.getBodyAsBlob();
                return EncodingUtil.base64Encode(responseBody);
            } else {
                //TO DO: Log Error
                System.debug(
                    'response.getStatusCode(): ' +
                        response.getStatusCode() +
                        '\t' +
                        'response.getBody(): ' +
                        response.getBody()
                );
                throw new OpenAICalloutException(
                    'Oops! Something went wrong!' +
                        '\n' +
                        'Reach out to the support with the following ' +
                        '\n' +
                        'Code: ' +
                        response.getStatusCode() +
                        '\n' +
                        'Message: ' +
                        response.getBody()
                );
            }
        } catch (Exception e) {
            throw new OpenAICalloutException(e.getMessage());
        }
    }
}
