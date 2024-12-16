import { currentUser } from "@clerk/nextjs/server";
import { User } from "@/server/models";
import { UserSchemaType } from "@/types/user";

export async function getAuthenticatedUser(): Promise<UserSchemaType> {
    const clerkUser = await currentUser();

    //console.log("clerkUser", clerkUser);

    if (!clerkUser) {
        throw new Error('You are not authenticated');
    }

    const user = await (await User).findOne({ clerkId: clerkUser.id }).lean();

    if (!user) {
        const newUser = await (await User).create({
            clerkId: clerkUser.id,
            email: clerkUser.emailAddresses[0].emailAddress,
            name: clerkUser.fullName
        });
        return newUser.toObject();
    }

    return user;
}