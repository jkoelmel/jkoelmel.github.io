
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.Set;

import static spark.Spark.*;
class SparkServer {

    public static String processRoute(Request req, Response res) {
        Set<String> params = req.queryParams();
        for (String param : params) {
            // possible for query param to be an array
            System.out.println(param + " : " + req.queryParamsValues(param)[0]);
        }
        // do stuff with a mapped version http://javadoc.io/doc/com.sparkjava/spark-core/2.8.0
        // http://sparkjava.com/documentation#query-maps
        // print the id query value
        System.out.println(req.queryMap().get("id").value());
        return "done!";
    }

    public static void main(String[] args) {
        port(7777);
        // calling get will make your app start listening for the GET path with the /hello endpoint
        get("/hello", new Route() {
            public Object handle(Request req, Response res) throws Exception {
                return "goodbye foo bar!";
            }
        });

    }
}
