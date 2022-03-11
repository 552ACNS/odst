import { Field, ObjectType } from "@nestjs/graphql";
import { Incident } from "@prisma/client";

@ObjectType()
export class IncidentGQL implements Incident {
    @Field(() => String, { nullable: true })
    id: string;

    @Field(() => Date)
    openDate: Date;

    @Field(() => Date)
    closeDate: Date;

    @Field(() => Date)
    reportedDate: Date;

    @Field(() => Boolean)
    selfReported: boolean;
}
