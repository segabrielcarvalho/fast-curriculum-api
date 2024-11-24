import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as GQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

@Module({
   imports: [
      GQLModule.forRoot<ApolloDriverConfig>({
         driver: ApolloDriver,
         autoSchemaFile: join(process.cwd(), 'src/modules/graphql/schema.gql'),
         sortSchema: true,
         playground: false,
         plugins: [
            ApolloServerPluginLandingPageLocalDefault({
               footer: false,
            }),
         ],
         context: ({ req, res }) => ({ req, res }),
         introspection: true,
      }),
   ],
})
export class GraphQLModule {}
