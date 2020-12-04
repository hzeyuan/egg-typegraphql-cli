import * as path from "path";
import { ApolloServer } from "apollo-server-koa";
import { Application } from "egg";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";

export interface GraphQLConfig {
    router: string;
    graphiql: boolean;
}

export default class GraphQL {
    private readonly app: Application;
    private graphqlSchema: GraphQLSchema;
    private config: GraphQLConfig;

    constructor(app: Application) {
        this.app = app;
        this.config = app.config.graphql;
    }

    getResolvers(): [string] {
        return [path.resolve(this.app.baseDir, 'app/graphql/**/*.ts')];
    }

    async init() {

        this.graphqlSchema = await buildSchema({
            resolvers: this.getResolvers(),
            dateScalarMode: "timestamp"
        });

        const server = new ApolloServer({
            schema: this.graphqlSchema,
            tracing: false,
            context: ({ ctx }) => ctx,   // 将 egg 的 context 作为 Resolver 传递的上下文
            playground: {
                settings: {
                    "request.credentials": "include"
                }
            } as any,
            introspection: true
        });
        server.applyMiddleware({
            app: this.app,
            path: this.config.router,
            cors: false
        });
        this.app.logger.info("graphql server init");
    }

    get schema(): GraphQLSchema {
        return this.graphqlSchema;
    }
}