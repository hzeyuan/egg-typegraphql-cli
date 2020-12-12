import { Field, Int, ObjectType,InputType,registerEnumType } from 'type-graphql';

@InputType()
export class FrequentRegisterCheckConfigInput {
    @Field(type => Boolean)
    enabled?: Boolean;
    @Field(type => Int)
    limit?: number;
    @Field(type => Int)
    timeInterval?: number;
}