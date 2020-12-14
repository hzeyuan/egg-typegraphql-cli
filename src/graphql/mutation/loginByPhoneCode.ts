import { Context } from 'egg';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { LoginByPhoneCodeInput } from "../schema/LoginByPhoneCodeInput";
import { User } from '../schema/User';
@Resolver(of => User)
export class loginByPhoneCodeResolver {
    @Mutation(returns => User, { nullable: true })
    async loginbyphonecode(
        @Ctx() ctx: Context,
        @Arg('input') input: LoginByPhoneCodeInput,
    ): Promise<User | null> {
        // 需要编写的逻辑
        return null;
    }
}
