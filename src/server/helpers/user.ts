import { UserSchemaType } from "@/types/user";
import { User } from "@/server/models";

export async function createUser(data: UserSchemaType) {
    await (await User).create(data);
}